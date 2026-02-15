import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import OpenAI from 'npm:openai@4.77.0';
import pdfParse from 'npm:pdf-parse@1.1.1';

const openai = new OpenAI({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
});

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Clone request before reading body
    const reqClone = req.clone();
    const { contractId, fileUrl, documentType, readingStyle } = await reqClone.json();

    console.log('Starting analysis for contract:', contractId);
    console.log('File URL:', fileUrl);
    console.log('Document type:', documentType);
    console.log('Reading style:', readingStyle);

    // Add a small delay to ensure file is ready
    await new Promise(resolve => setTimeout(resolve, 2000));

    const systemPrompt = `You are Complyly, an automated document understanding tool.
Your role is to explain document wording in plain language to support understanding.

You must NOT:
- provide legal, financial, tax, immigration, regulatory, medical, or professional advice
- determine enforceability, legality, validity, compliance, or legal rights/obligations
- claim certainty where jurisdiction-specific interpretation is required

You MUST:
- describe what the text says and how it is structured
- highlight wording patterns that people commonly review carefully, using neutral language
- express uncertainty when needed (e.g., "This depends on local law or context.")
- follow the output schema exactly
- output JSON only (no markdown, no commentary)`;

    const analysisPrompt = `Analyze the following ${documentType} document and create a comprehensive user-facing report.

Create a structured explanation that:
1. Summarizes the document's purpose in one sentence
2. Explains how the document is organized
3. Details what each party needs to do
4. Identifies financial considerations
5. Highlights timing and deadlines
6. Points out wording that readers often review carefully (with attention levels: low/medium/high)
7. Anticipates common questions readers have

Reading style: ${readingStyle === 'structured' ? 'Professional analytical mode with detailed cross-references' : 'Plain language mode focused on clarity'}

Rules for attention levels:
- HIGH: large payments/variable fees, termination penalties/long lock-in, liability limits/indemnities, automatic renewals, short notice periods, unilateral change rights
- MEDIUM: unclear definitions, conditions depending on external events, multiple sections covering same topic
- LOW: general descriptions, headings, non-committal text

Remember: Do not give advice or legal conclusions. Describe what the text says and highlight wording patterns neutrally.`;

    console.log('Calling OpenAI with prompt for file:', fileUrl);
    console.log('Using reading style:', readingStyle);

    // Fetch the file content
    console.log('Fetching file from URL...');
    const fileResponse = await fetch(fileUrl);
    if (!fileResponse.ok) {
      throw new Error(`Failed to fetch file: ${fileResponse.statusText}`);
    }
    const fileBuffer = await fileResponse.arrayBuffer();

    console.log('Parsing PDF...');
    const buffer = new Uint8Array(fileBuffer);
    const pdfData = await pdfParse(buffer);
    const pdfText = pdfData.text;

    console.log('PDF parsed successfully, sending to OpenAI...');

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: [
            { type: "text", text: analysisPrompt },
            { type: "text", text: `\n\nDocument content:\n\n${pdfText}` }
          ]
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "document_analysis",
          strict: true,
          schema: {
            type: "object",
            properties: {
              report_title: { type: "string" },
              one_sentence_purpose: { type: "string" },
              document_overview: {
                type: "array",
                items: { type: "string" }
              },
              how_its_organised: {
                type: "array",
                items: { type: "string" }
              },
              responsibilities_user: {
                type: "array",
                items: { type: "string" }
              },
              responsibilities_other_party: {
                type: "array",
                items: { type: "string" }
              },
              financial_considerations: {
                type: "array",
                items: { type: "string" }
              },
              timing_and_deadlines: {
                type: "array",
                items: { type: "string" }
              },
              important_wording_attention_points: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    attention_level: { 
                      type: "string",
                      enum: ["low", "medium", "high"]
                    },
                    why_it_matters_in_plain_language: { type: "string" },
                    related_quote_snippets: {
                      type: "array",
                      items: { type: "string" }
                    }
                  },
                  required: ["title", "attention_level", "why_it_matters_in_plain_language", "related_quote_snippets"],
                  additionalProperties: false
                }
              },
              questions_readers_often_ask: {
                type: "array",
                items: { type: "string" }
              },
              plain_english_summary: {
                type: "array",
                items: { type: "string" }
              },
              boundary_statement: { type: "string" }
            },
            required: ["report_title", "one_sentence_purpose", "document_overview", "how_its_organised", "responsibilities_user", "responsibilities_other_party", "financial_considerations", "timing_and_deadlines", "important_wording_attention_points", "questions_readers_often_ask", "plain_english_summary", "boundary_statement"],
            additionalProperties: false
          }
        }
      }
    });

    const result = JSON.parse(response.choices[0].message.content);

    console.log('OpenAI analysis completed successfully');

    await base44.entities.Contract.update(contractId, {
      status: "completed",
      analysis_data: result
    });

    console.log('Contract updated to completed status');

    return Response.json({ success: true, result });
  } catch (error) {
    console.error('Analysis failed with error:', error);
    console.error('Error details:', error.message);
    console.error('Stack trace:', error.stack);

    let contractId;
    try {
      const body = await req.clone().json();
      contractId = body.contractId;
    } catch (e) {
      console.error('Could not extract contractId from request:', e);
    }

    if (contractId) {
      try {
        const base44 = createClientFromRequest(req);
        await base44.asServiceRole.entities.Contract.update(contractId, {
          status: "failed"
        });
        console.log('Contract updated to failed status');
      } catch (updateError) {
        console.error('Failed to update contract status:', updateError);
      }
    }

    return Response.json({ 
      error: error.message,
      details: error.stack 
    }, { status: 500 });
  }
});