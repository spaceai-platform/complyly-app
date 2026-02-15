import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Upload, FileText, AlertTriangle, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => base44.auth.me()
  });

  const { data: contracts = [], isLoading } = useQuery({
    queryKey: ["contracts"],
    queryFn: async () => {
      const currentUser = await base44.auth.me();
      return base44.entities.Contract.filter({ created_by: currentUser.email }, "-created_date");
    },
    enabled: !!user
  });

  const getSeverityColor = (score) => {
    if (score >= 70) return "text-red-600 bg-red-100";
    if (score >= 40) return "text-orange-600 bg-orange-100";
    return "text-green-600 bg-green-100";
  };

  const getStatusIcon = (status) => {
    if (status === "analyzing") return <Clock className="w-4 h-4 text-blue-600 animate-spin" />;
    if (status === "completed") return <CheckCircle className="w-4 h-4 text-green-600" />;
    return <AlertTriangle className="w-4 h-4 text-red-600" />;
  };

  const stats = {
    total: contracts.length,
    analyzing: contracts.filter(c => c.status === "analyzing").length,
    completed: contracts.filter(c => c.status === "completed").length,
    avgRisk: contracts.filter(c => c.risk_score).length > 0
      ? Math.round(contracts.filter(c => c.risk_score).reduce((sum, c) => sum + c.risk_score, 0) / contracts.filter(c => c.risk_score).length)
      : 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to={createPageUrl("Home")} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6991beb21a607e88162ccc57/20ca69fb8_WhatsAppImage2026-02-10at1912251.jpeg" 
              alt="Complyly" 
              className="h-10 w-10"
            />
            <span className="text-2xl font-bold text-slate-900">Complyly</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to={createPageUrl("Documents")} className="text-gray-600 hover:text-gray-900 font-medium">
              Documents
            </Link>
            <Link to={createPageUrl("Account")} className="text-gray-600 hover:text-gray-900 font-medium">
              Account
            </Link>
            <Link to={createPageUrl("Upload")}>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Upload className="w-4 h-4 mr-2" />
                New scan
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Start a new scan CTA */}
          <Card className="mb-8 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-2">Start a new scan</h2>
              <p className="text-gray-600 mb-6">Upload a document or screenshot</p>
              <Link to={createPageUrl("Upload")}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="w-5 h-5 mr-2" />
                  New scan
                </Button>
              </Link>
            </CardContent>
          </Card>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Recent</h1>
            <p className="text-gray-600 text-lg">Your latest document analyses</p>
          </div>



          {/* Recent Contracts - Max 5 */}
          {isLoading ? (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600">Loading...</p>
            </div>
          ) : contracts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No saved documents yet</h3>
                <p className="text-gray-600 mb-6">Save a report to access it later across devices.</p>
                <Link to={createPageUrl("Upload")}>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Upload className="w-4 h-4 mr-2" />
                    New scan
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="space-y-3 mb-6">
                {contracts.slice(0, 5).map((contract, index) => (
                  <motion.div
                    key={contract.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link to={createPageUrl("DocumentDetail") + `?id=${contract.id}`}>
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                              <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-900 truncate">{contract.contract_name}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                <span className="capitalize">{contract.document_type}</span>
                                <span>•</span>
                                <span>{format(new Date(contract.updated_date), "MMM d, yyyy")}</span>
                              </div>
                            </div>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Saved
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {contracts.length > 5 && (
                <div className="text-center">
                  <Link to={createPageUrl("Documents")}>
                    <Button variant="outline">View all documents</Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}