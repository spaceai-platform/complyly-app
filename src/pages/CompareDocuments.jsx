import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, GitCompare } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { createPageUrl } from "../utils";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";

export default function CompareDocuments() {
  const [searchParams] = useSearchParams();
  const preselectedId = searchParams.get("id");
  const navigate = useNavigate();

  const [documentA, setDocumentA] = useState(preselectedId || "");
  const [documentB, setDocumentB] = useState("");

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => base44.auth.me()
  });

  const { data: documents = [] } = useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      const currentUser = await base44.auth.me();
      return base44.entities.Contract.filter(
        { created_by: currentUser.email, status: "completed" },
        "-updated_date"
      );
    },
    enabled: !!user
  });

  const handleCompare = () => {
    if (documentA && documentB) {
      navigate(createPageUrl("ComparisonResult") + `?a=${documentA}&b=${documentB}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to={createPageUrl("Documents")} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <Link to={createPageUrl("Home")}>
            <span className="text-2xl font-bold text-blue-600">Complyly™</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Compare two documents</h1>
          <p className="text-gray-600">
            Compares wording patterns and structure. Informational only.
          </p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Document A</label>
              <Select value={documentA} onValueChange={setDocumentA}>
                <SelectTrigger>
                  <SelectValue placeholder="Select first document..." />
                </SelectTrigger>
                <SelectContent>
                  {documents.map((doc) => (
                    <SelectItem key={doc.id} value={doc.id}>
                      {doc.contract_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Document B</label>
              <Select value={documentB} onValueChange={setDocumentB}>
                <SelectTrigger>
                  <SelectValue placeholder="Select second document..." />
                </SelectTrigger>
                <SelectContent>
                  {documents
                    .filter(doc => doc.id !== documentA)
                    .map((doc) => (
                      <SelectItem key={doc.id} value={doc.id}>
                        {doc.contract_name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleCompare}
              disabled={!documentA || !documentB}
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              <GitCompare className="w-4 h-4 mr-2" />
              Compare
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}