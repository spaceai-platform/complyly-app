import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, AlertTriangle, Lock, CheckCircle } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { createPageUrl } from "../utils";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

export default function PreviewInsight() {
  const [searchParams] = useSearchParams();
  const contractId = searchParams.get("id");
  const navigate = useNavigate();

  const { data: contract, isLoading } = useQuery({
    queryKey: ["contract", contractId],
    queryFn: () => base44.entities.Contract.get(contractId),
    enabled: !!contractId,
    refetchInterval: (data) => {
      return data?.status === "analyzing" ? 3000 : false;
    }
  });

  const getCategoryLabel = (type) => {
    const labels = {
      personal: "Renting a place",
      employment: "Starting a job",
      financial: "Borrowing money",
      policy: "Signing terms online",
      business: "Business agreement",
      technical: "Technical document",
      other: "Other document"
    };
    return labels[type] || type;
  };

  const getAttentionBadge = (level) => {
    const config = {
      high: { color: "bg-red-100 text-red-700 border-red-200", label: "High attention" },
      medium: { color: "bg-amber-100 text-amber-700 border-amber-200", label: "Medium attention" },
      low: { color: "bg-gray-100 text-gray-700 border-gray-200", label: "Low attention" }
    };
    const badge = config[level] || config.medium;
    return <Badge variant="outline" className={badge.color}>{badge.label}</Badge>;
  };

  if (isLoading || !contract) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (contract.status === "analyzing") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Analyzing your document</h2>
          <p className="text-gray-600">This usually takes 30-60 seconds</p>
        </div>
      </div>
    );
  }

  if (contract.status === "failed") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Analysis failed</h2>
          <p className="text-gray-600 mb-6">Please try uploading again</p>
          <Link to={createPageUrl("Upload")}>
            <Button>Try again</Button>
          </Link>
        </div>
      </div>
    );
  }

  const analysisData = contract.analysis_data || {};
  const attentionPoints = analysisData.important_wording_attention_points || [];
  const previewPoints = attentionPoints.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to={createPageUrl("Dashboard")} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <Link to={createPageUrl("Home")}>
            <span className="text-2xl font-bold text-blue-600">Complyly™</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Category Badge */}
          <div className="mb-6">
            <Badge className="bg-blue-100 text-blue-700 text-sm">
              Reviewing: {getCategoryLabel(contract.document_type)}
            </Badge>
          </div>

          {/* Recognition */}
          <Card className="mb-6 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Document recognized
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                <span className="font-semibold">Document appears to describe:</span> {analysisData.report_title || contract.contract_name}
              </p>
              {analysisData.one_sentence_purpose && (
                <p className="text-gray-600 mt-2">{analysisData.one_sentence_purpose}</p>
              )}
            </CardContent>
          </Card>

          {/* Preview Cards */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Key wording attention areas (preview)</h2>
            <div className="space-y-4">
              {previewPoints.length > 0 ? previewPoints.map((point, index) => (
                <Card key={index} className="border-2">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg flex-1">{point.title}</h3>
                      {getAttentionBadge(point.attention_level)}
                    </div>
                    <p className="text-gray-700 mb-3">{point.why_it_matters_in_plain_language}</p>
                    {point.related_quote_snippets && point.related_quote_snippets.length > 0 && (
                      <div className="bg-gray-50 border-l-4 border-blue-600 p-3 text-sm text-gray-600 italic">
                        "{point.related_quote_snippets[0]}"
                      </div>
                    )}
                  </CardContent>
                </Card>
              )) : (
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-600">Preview is being generated...</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Category Framing */}
          <Card className="mb-8 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <FileText className="w-8 h-8 text-blue-600 mb-2" />
              <p className="text-gray-700">
                {contract.document_type === "personal" && "For rental agreements, timing, deposits, and termination wording are typically the most reviewed areas."}
                {contract.document_type === "employment" && "For employment terms, notice periods, responsibilities, and post-employment restrictions are typically the most reviewed areas."}
                {contract.document_type === "financial" && "For financial agreements, interest rates, repayment terms, and default consequences are typically the most reviewed areas."}
                {contract.document_type === "policy" && "For terms of service, data usage, liability limits, and change rights are typically the most reviewed areas."}
                {contract.document_type === "business" && "For business agreements, deliverables, payment terms, and liability clauses are typically the most reviewed areas."}
                {!["personal", "employment", "financial", "policy", "business"].includes(contract.document_type) && "The full explanation breaks down all sections, responsibilities, and wording patterns in this document."}
              </p>
            </CardContent>
          </Card>

          {/* Unlock CTA */}
          <Card className="border-2 border-blue-600 bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-8 text-center">
              <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">See the complete explanation</h2>
              <p className="text-gray-600 mb-6">
                Get full breakdown of all sections, responsibilities, timing, and wording patterns
              </p>
              <div className="mb-6">
                <div className="text-3xl font-bold text-blue-600 mb-1">£4.99</div>
                <div className="text-sm text-gray-500">One document • One payment • Instant access</div>
              </div>
              <Link to={createPageUrl("Analysis") + `?id=${contract.id}`}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                  Continue to full explanation
                </Button>
              </Link>
              <p className="text-xs text-gray-500 mt-4">
                Payment processed securely via Stripe
              </p>
            </CardContent>
          </Card>

          {/* Boundary Statement */}
          <div className="mt-8 p-4 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-600 text-center">
            This explanation is automated and informational. It supports understanding only and does not replace professional judgement where required.
          </div>
        </motion.div>
      </div>
    </div>
  );
}