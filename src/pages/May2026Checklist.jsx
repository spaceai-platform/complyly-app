import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, Download, ArrowLeft, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";

export default function May2026Checklist() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to={createPageUrl("Home")} className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Complyly
            </span>
          </Link>
          <Link to={createPageUrl("Home")}>
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link to={createPageUrl("Home")} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="mb-12">
          <Badge className="mb-4 bg-orange-100 text-orange-700 border-orange-300 px-4 py-2">
            <Calendar className="w-4 h-4 mr-2" />
            FREE Resource
          </Badge>
          <h1 className="text-5xl font-bold mb-4">May 2026 Checklist</h1>
          <p className="text-xl text-gray-600">
            Important changes coming in May 2026. Make sure you're prepared with our comprehensive checklist.
          </p>
        </div>

        <Card className="shadow-xl mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardTitle className="text-2xl">Key Changes Taking Effect May 2026</CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">End of Section 21 "No-Fault" Evictions</h3>
                  <p className="text-gray-600">Landlords can no longer evict tenants without a valid reason. All evictions must follow Section 8 grounds.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Automatic Periodic Tenancies</h3>
                  <p className="text-gray-600">All assured shorthold tenancies will automatically become periodic after the fixed term, giving you more flexibility.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Rent Increase Limits</h3>
                  <p className="text-gray-600">Landlords can only increase rent once per year, with proper notice periods enforced.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Pet Rights</h3>
                  <p className="text-gray-600">Landlords cannot unreasonably refuse requests to keep pets in rental properties.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Stronger Property Standards</h3>
                  <p className="text-gray-600">Enhanced Decent Homes Standard with stricter enforcement and penalties for non-compliance.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Tenancy Database Access</h3>
                  <p className="text-gray-600">New private rented sector database allowing tenants to check their landlord's compliance history.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">What You Should Do Before May 2026</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <p className="text-gray-700"><strong>Review your current tenancy agreement</strong> to identify clauses that may become unenforceable</p>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <p className="text-gray-700"><strong>Document any property issues</strong> and communicate them to your landlord in writing</p>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <p className="text-gray-700"><strong>Keep records of all communications</strong> with your landlord or letting agent</p>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                <p className="text-gray-700"><strong>Understand your new rights</strong> regarding rent increases and eviction notices</p>
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">5</div>
                <p className="text-gray-700"><strong>Use Complyly to scan your contract</strong> and get a full compliance report</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
            <Download className="w-5 h-5 mr-2" />
            Download Full Checklist PDF
          </Button>
        </div>
      </div>
    </div>
  );
}