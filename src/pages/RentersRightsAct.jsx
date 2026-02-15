import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Scale, Home, FileText, ArrowLeft, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";

export default function RentersRightsAct() {
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
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-300 px-4 py-2">
            <Scale className="w-4 h-4 mr-2" />
            Updated for 2025
          </Badge>
          <h1 className="text-5xl font-bold mb-4">Renters' Rights Act 2025</h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about the biggest shake-up to renters' rights in a generation.
          </p>
        </div>

        <Card className="shadow-xl mb-8 border-2 border-blue-200">
          <CardContent className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <AlertCircle className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">What is the Renters' Rights Act 2025?</h3>
                <p className="text-gray-700 leading-relaxed">
                  The Renters' Rights Act 2025 is landmark legislation that transforms the UK rental market. 
                  It replaces the outdated system that heavily favoured landlords with a fairer, more balanced 
                  framework that protects tenants while maintaining responsible landlord rights.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-br from-red-50 to-red-100">
              <CardTitle className="flex items-center gap-2">
                <Home className="w-6 h-6 text-red-600" />
                End of No-Fault Evictions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-700 mb-4">
                Section 21 "no-fault" evictions are abolished. Landlords must now provide a valid legal reason 
                to evict tenants, with extended notice periods.
              </p>
              <Badge className="bg-red-100 text-red-700">Major Change</Badge>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-br from-green-50 to-green-100">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-green-600" />
                Periodic Tenancies
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-700 mb-4">
                All new tenancies will be periodic from the start, giving tenants more flexibility to leave 
                with just 2 months' notice.
              </p>
              <Badge className="bg-green-100 text-green-700">New Right</Badge>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-br from-purple-50 to-purple-100">
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-6 h-6 text-purple-600" />
                Rent Increase Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-700 mb-4">
                Landlords can only increase rent once per year, and tenants have the right to challenge 
                excessive increases at tribunal.
              </p>
              <Badge className="bg-purple-100 text-purple-700">Protection</Badge>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600" />
                Decent Homes Standard
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-700 mb-4">
                All rental properties must meet enhanced standards, with stricter enforcement and higher 
                penalties for non-compliance.
              </p>
              <Badge className="bg-blue-100 text-blue-700">Quality Standard</Badge>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Key Protections for Tenants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2">🐕 Right to Keep Pets</h3>
                <p className="text-gray-700">
                  Landlords cannot unreasonably refuse requests to keep pets. They can require pet insurance 
                  but cannot charge extra rent.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">💰 Deposit Protection</h3>
                <p className="text-gray-700">
                  Strengthened rules on deposit protection schemes with faster dispute resolution and higher 
                  penalties for non-compliance.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">🔧 Repairs and Maintenance</h3>
                <p className="text-gray-700">
                  Landlords must respond to repair requests within specified timeframes, with new powers for 
                  councils to enforce standards.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">📊 Transparency</h3>
                <p className="text-gray-700">
                  New private rented sector database gives tenants access to their landlord's compliance record 
                  before signing a contract.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">⚖️ Discrimination Protection</h3>
                <p className="text-gray-700">
                  Illegal for landlords to discriminate against tenants on benefits or with children, with 
                  enforceable penalties.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-2 border-green-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Protect Yourself Today</h3>
            <p className="text-gray-700 mb-6">
              Upload your tenancy agreement to see if it complies with the new Act and identify any unfair clauses.
            </p>
            <Link to={createPageUrl("Upload")}>
              <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
                Analyze Your Contract Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}