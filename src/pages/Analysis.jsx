import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, FileText, Loader2, ArrowLeft, Clock, Download, ChevronRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { createPageUrl } from "../utils";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function Analysis() {
  const [searchParams] = useSearchParams();
  const contractId = searchParams.get("id");
  const [activeSection, setActiveSection] = useState("overview");

  const { data: contract, isLoading } = useQuery({
    queryKey: ["contract", contractId],
    queryFn: async () => {
      const currentUser = await base44.auth.me();
      const doc = await base44.entities.Contract.get(contractId);
      if (doc.created_by !== currentUser.email) {
        throw new Error("Unauthorized");
      }
      return doc;
    },
    enabled: !!contractId,
    refetchInterval: (data) => data?.status === "analyzing" ? 3000 : false
  });

  if (!contractId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <p className="text-gray-600">No document ID provided</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <p className="text-gray-600">Document not found</p>
      </div>
    );
  }

  const analysisData = contract.analysis_data || {};
  const sections = [
    { id: "overview", label: "Overview", icon: FileText },
    { id: "sections", label: "Key Sections", icon: FileText },
    { id: "definitions", label: "Definitions", icon: FileText },
    { id: "responsibilities", label: "Responsibilities", icon: FileText },
    { id: "conditions", label: "Conditions", icon: FileText },
    { id: "timeline", label: "Timeline", icon: Clock },
    { id: "notes", label: "Interpretation Notes", icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to={createPageUrl("Home")} className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">
              Complyly™
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to={createPageUrl("Dashboard")}>
              <Button variant="outline">Dashboard</Button>
            </Link>
            <Link to={createPageUrl("Upload")}>
              <Button className="bg-blue-600 hover:bg-blue-700">New Analysis</Button>
            </Link>
          </div>
        </div>
      </nav>

      {contract.status === "analyzing" && (
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Analyzing Document Structure...</h2>
            <p className="text-gray-600 text-lg">
              Mapping definitions, responsibilities, and conditional logic. This usually takes 2-4 minutes.
            </p>
          </motion.div>
        </div>
      )}

      {contract.status === "failed" && (
        <div className="max-w-4xl mx-auto px-6 py-20">
          <Card className="border-2 border-slate-300">
            <CardContent className="pt-8 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-slate-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Analysis Could Not Complete</h2>
              <p className="text-gray-600 mb-8">
                The document could not be processed. Please try uploading again.
              </p>
              <Link to={createPageUrl("Upload")}>
                <Button className="bg-blue-600 hover:bg-blue-700">Upload Again</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}

      {contract.status === "completed" && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link to={createPageUrl("Dashboard")} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="flex gap-6">
            {/* Sidebar Navigation */}
            <div className="w-64 flex-shrink-0">
              <Card className="sticky top-24">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-gray-500 uppercase">Navigation</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                          activeSection === section.id
                            ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                            : "text-gray-600 hover:bg-slate-50"
                        }`}
                      >
                        <section.icon className="w-4 h-4" />
                        <span className="font-medium">{section.label}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <Card className="mb-6">
                <CardHeader className="border-b bg-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-slate-100 text-slate-700 border-slate-300">
                          {contract.document_type}
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                          {contract.reading_style === "plain" ? "Plain Explanation" : "Structured Analysis"}
                        </Badge>
                      </div>
                      <h1 className="text-3xl font-bold mb-2">{contract.contract_name}</h1>
                      <p className="text-sm text-gray-600">
                        Analyzed on {format(new Date(contract.created_date), "MMMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Download className="w-4 h-4" />
                      Export Report
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              {/* Overview Section */}
              {activeSection === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Document Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {analysisData.document_overview || "Overview not available"}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Key Sections */}
              {activeSection === "sections" && (
                <motion.div
                  key="sections"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Sections</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analysisData.key_sections?.map((section, index) => (
                          <div key={index} className="p-4 bg-slate-50 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">{section.title}</h3>
                            <p className="text-gray-700">{section.description}</p>
                          </div>
                        )) || <p className="text-gray-500">No sections data available</p>}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Definitions */}
              {activeSection === "definitions" && (
                <motion.div
                  key="definitions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Definition Relationships</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analysisData.definitions?.map((def, index) => (
                          <div key={index} className="p-4 border border-slate-200 rounded-lg">
                            <div className="font-semibold text-blue-700 mb-2">{def.term}</div>
                            <p className="text-gray-700 mb-2">{def.definition}</p>
                            {def.references && (
                              <p className="text-sm text-gray-500">Referenced in: {def.references}</p>
                            )}
                          </div>
                        )) || <p className="text-gray-500">No definitions data available</p>}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Responsibilities */}
              {activeSection === "responsibilities" && (
                <motion.div
                  key="responsibilities"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Responsibility Mapping</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analysisData.responsibilities?.map((resp, index) => (
                          <div key={index} className="p-4 bg-slate-50 rounded-lg">
                            <div className="flex items-start gap-3 mb-2">
                              <Badge className="bg-blue-100 text-blue-700">{resp.party}</Badge>
                              {resp.section && <span className="text-sm text-gray-500">{resp.section}</span>}
                            </div>
                            <p className="text-gray-700">{resp.obligation}</p>
                          </div>
                        )) || <p className="text-gray-500">No responsibilities data available</p>}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Conditions */}
              {activeSection === "conditions" && (
                <motion.div
                  key="conditions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Conditional Logic</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analysisData.conditions?.map((cond, index) => (
                          <div key={index} className="p-4 border border-slate-200 rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="font-semibold text-slate-700">IF:</span>
                              <span className="text-gray-700">{cond.trigger}</span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                              <span className="font-semibold text-slate-700">THEN:</span>
                              <span className="text-gray-700">{cond.consequence}</span>
                            </div>
                            {cond.section && (
                              <p className="text-sm text-gray-500 mt-2">Section: {cond.section}</p>
                            )}
                          </div>
                        )) || <p className="text-gray-500">No conditional logic data available</p>}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Timeline */}
              {activeSection === "timeline" && (
                <motion.div
                  key="timeline"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Time Dependencies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analysisData.timeline?.map((item, index) => (
                          <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                            <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-gray-900 mb-1">{item.item}</p>
                              <p className="text-sm text-gray-600">{item.timeframe}</p>
                            </div>
                          </div>
                        )) || <p className="text-gray-500">No timeline data available</p>}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Interpretation Notes */}
              {activeSection === "notes" && (
                <motion.div
                  key="notes"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Interpretation Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analysisData.interpretation_notes?.map((note, index) => (
                          <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h3 className="font-semibold text-blue-900 mb-2">{note.topic}</h3>
                            <p className="text-gray-700 mb-2">{note.note}</p>
                            {note.section && (
                              <p className="text-sm text-blue-600">Section: {note.section}</p>
                            )}
                          </div>
                        )) || <p className="text-gray-500">No interpretation notes available</p>}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Original Document */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Original Document</CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href={contract.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    <FileText className="w-5 h-5" />
                    View Original Document
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}