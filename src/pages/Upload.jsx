import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Upload as UploadIcon, FileText, Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { createPageUrl } from "../utils";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [documentName, setDocumentName] = useState("");
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("type");
  const [documentType, setDocumentType] = useState(categoryFromUrl || "");
  const [readingStyle, setReadingStyle] = useState("plain");
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (categoryFromUrl) {
      setDocumentType(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf" || 
          droppedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setFile(droppedFile);
        if (!documentName) {
          setDocumentName(droppedFile.name.replace(/\.[^/.]+$/, ""));
        }
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      if (!documentName) {
        setDocumentName(selectedFile.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !documentName || !documentType) return;

    setUploading(true);
    try {
      const isAuth = await base44.auth.isAuthenticated();
      if (!isAuth) {
        base44.auth.redirectToLogin(window.location.href);
        return;
      }

      const { file_url } = await base44.integrations.Core.UploadFile({ file });

      const contract = await base44.entities.Contract.create({
        contract_name: documentName,
        file_url: file_url,
        status: "analyzing",
        document_type: documentType,
        reading_style: readingStyle
      });

      // Start analysis in background - don't await
      base44.functions.invoke('analyzeDocument', {
        contractId: contract.id,
        fileUrl: file_url,
        documentType: documentType,
        readingStyle: readingStyle
      }).catch(err => {
        console.error('Analysis invocation failed:', err);
        // Update status to failed
        base44.entities.Contract.update(contract.id, { status: "failed" });
      });

      setUploading(false);
      navigate(createPageUrl("PreviewInsight") + `?id=${contract.id}`);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
      setUploading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <nav className="border-b bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to={createPageUrl("Home")} className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">
              Complyly™
            </span>
          </Link>
          <Link to={createPageUrl("Dashboard")}>
            <Button variant="outline">View Dashboard</Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link to={createPageUrl("CategorySelection")} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {documentType && (
          <div className="mb-6">
            <Badge className="bg-blue-100 text-blue-700 text-base">
              Reviewing: {
                documentType === "personal" ? "Renting a place" :
                documentType === "employment" ? "Starting a job" :
                documentType === "financial" ? "Borrowing money" :
                documentType === "policy" ? "Signing terms online" :
                documentType === "business" ? "Business agreement" :
                "Other document"
              }
            </Badge>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-xl border-2">
            <CardHeader className="bg-gradient-to-r from-slate-700 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-3xl flex items-center gap-3">
                <UploadIcon className="w-8 h-8" />
                Upload Your Document
              </CardTitle>
              <p className="text-blue-100 mt-2">
                Get structured analysis and interpretation in under 5 minutes
              </p>
            </CardHeader>
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Document Name */}
                <div>
                  <Label htmlFor="documentName" className="text-lg font-semibold">
                    Document Name
                  </Label>
                  <Input
                    id="documentName"
                    placeholder="e.g., Employment Contract 2026"
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                    className="mt-2 text-lg"
                    required
                  />
                </div>

                {/* Document Type Selector */}
                <div>
                  <Label className="text-lg font-semibold mb-2 block">
                    What type of document is this?
                  </Label>
                  <Select value={documentType} onValueChange={setDocumentType} required>
                    <SelectTrigger className="text-lg">
                      <SelectValue placeholder="Select document type..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal agreement</SelectItem>
                      <SelectItem value="employment">Work or employment</SelectItem>
                      <SelectItem value="financial">Financial or loan</SelectItem>
                      <SelectItem value="business">Business or commercial</SelectItem>
                      <SelectItem value="policy">Policy or regulatory</SelectItem>
                      <SelectItem value="technical">Technical or IT</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Reading Style Toggle */}
                <div>
                  <Label className="text-lg font-semibold mb-2 block">
                    Reading Style
                  </Label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setReadingStyle("plain")}
                      className={`flex-1 p-4 border-2 rounded-lg transition-all ${
                        readingStyle === "plain"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-semibold mb-1">Plain Explanation</div>
                      <div className="text-sm text-gray-600">
                        Clear summaries and simple language
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setReadingStyle("structured")}
                      className={`flex-1 p-4 border-2 rounded-lg transition-all ${
                        readingStyle === "structured"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-semibold mb-1">Structured Analysis</div>
                      <div className="text-sm text-gray-600">
                        Professional mode with detailed mapping
                      </div>
                    </button>
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <Label className="text-lg font-semibold mb-2 block">
                    Upload Document File
                  </Label>
                  <div
                    className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                      dragActive
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {file ? (
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-900">{file.name}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setFile(null)}
                        >
                          Change File
                        </Button>
                      </div>
                    ) : (
                      <>
                        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-lg font-semibold text-gray-700 mb-2">
                          Drag and drop your document here
                        </p>
                        <p className="text-gray-500 mb-4">or</p>
                        <label>
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                          />
                          <Button type="button" variant="outline" asChild>
                            <span>Browse Files</span>
                          </Button>
                        </label>
                        <p className="text-sm text-gray-500 mt-4">
                          Supports PDF and Word documents • Handles long technical documents
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!file || !documentName || !documentType || uploading}
                  className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing Document...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-2" />
                      Analyse Document Now
                    </>
                  )}
                </Button>
              </form>

              {/* Trust Badges */}
              <div className="mt-8 pt-8 border-t grid grid-cols-3 gap-4 text-center text-sm text-gray-600">
                <div>
                  <Shield className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  Bank-grade encryption
                </div>
                <div>
                  <CheckCircle className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                  GDPR compliant
                </div>
                <div>
                  <FileText className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                  Auto-deleted in 7 days
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}