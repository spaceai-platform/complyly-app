import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, AlertTriangle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { createPageUrl } from "../utils";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";

export default function ComparisonResult() {
  const [searchParams] = useSearchParams();
  const docAId = searchParams.get("a");
  const docBId = searchParams.get("b");

  const { data: documentA } = useQuery({
    queryKey: ["contract", docAId],
    queryFn: () => base44.entities.Contract.get(docAId),
    enabled: !!docAId
  });

  const { data: documentB } = useQuery({
    queryKey: ["contract", docBId],
    queryFn: () => base44.entities.Contract.get(docBId),
    enabled: !!docBId
  });

  const getAttentionBadge = (level) => {
    const colors = {
      high: "bg-red-100 text-red-700 border-red-200",
      medium: "bg-amber-100 text-amber-700 border-amber-200",
      low: "bg-gray-100 text-gray-700 border-gray-200"
    };
    return <Badge variant="outline" className={colors[level]}>{level}</Badge>;
  };

  const comparisonThemes = [
    {
      theme: "Flexibility",
      attention_level: "medium",
      document_a_notes: ["Notice period is 30 days", "Changes require written consent"],
      document_b_notes: ["Notice period is 60 days", "Changes can be unilateral with 14 days notice"]
    },
    {
      theme: "Cost Exposure",
      attention_level: "high",
      document_a_notes: ["Fixed monthly payment of £1,200", "Service charge capped at £150"],
      document_b_notes: ["Base payment £1,100", "Service charge variable, no cap mentioned"]
    },
    {
      theme: "Responsibilities",
      attention_level: "medium",
      document_a_notes: ["Maintenance is landlord's responsibility", "Tenant handles minor repairs"],
      document_b_notes: ["All maintenance is tenant's responsibility", "Landlord handles structural only"]
    },
    {
      theme: "Termination",
      attention_level: "high",
      document_a_notes: ["Early termination fee: 2 months rent", "Break clause at 6 months"],
      document_b_notes: ["Early termination fee: entire remaining term", "No break clause"]
    }
  ];

  if (!documentA || !documentB) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading comparison...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to={createPageUrl("CompareDocuments")} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <Link to={createPageUrl("Home")}>
            <span className="text-2xl font-bold text-blue-600">Complyly™</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Document Comparison</h1>
          <div className="flex gap-4 items-center text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium text-blue-600">Document A:</span>
              <span>{documentA.contract_name}</span>
            </div>
            <span className="text-gray-400">vs</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-purple-600">Document B:</span>
              <span>{documentB.contract_name}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 mb-6">
          <Link to={createPageUrl("Analysis") + `?id=${documentA.id}`}>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Open Document A
            </Button>
          </Link>
          <Link to={createPageUrl("Analysis") + `?id=${documentB.id}`}>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Open Document B
            </Button>
          </Link>
        </div>

        {/* Comparison Cards */}
        <div className="space-y-6">
          {comparisonThemes.map((comparison, index) => (
            <Card key={index}>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{comparison.theme}</CardTitle>
                  {getAttentionBadge(comparison.attention_level)}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-blue-600 mb-3">Document A</h3>
                    <ul className="space-y-2">
                      {comparison.document_a_notes.map((note, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-600 mb-3">Document B</h3>
                    <ul className="space-y-2">
                      {comparison.document_b_notes.map((note, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-purple-600 mt-1">•</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Questions to Consider */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Questions to consider before choosing</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                "How important is flexibility to change or exit early?",
                "Can you accommodate the cost differences and potential variable charges?",
                "Who is better positioned to handle maintenance responsibilities?",
                "What are the implications if you need to terminate early?"
              ].map((question, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Boundary Statement */}
        <div className="mt-8 p-4 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-600 text-center">
          This explanation is automated and informational. It supports understanding only and does not replace professional judgement where required.
        </div>
      </div>
    </div>
  );
}