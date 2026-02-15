import React from "react";
import { Shield, ArrowLeft, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";

export default function LegalDisclaimer() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to={createPageUrl("Home")} className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Complyly</span>
          </Link>
          <Link to={createPageUrl("Home")}>
            <button className="text-gray-600 hover:text-gray-900 font-medium">
              <ArrowLeft className="w-5 h-5 inline mr-2" />
              Back
            </button>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Legal Disclaimer</h1>
        </div>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-8 mb-12 rounded-r-lg">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-3 text-gray-900">Important Notice</h2>
              <p className="text-gray-700 leading-relaxed">
                Complyly provides automated explanations of document wording for informational purposes only.
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl font-semibold text-gray-900 mb-6">The service:</p>
          <ul className="space-y-3 text-gray-700 mb-12">
            <li>does not interpret law</li>
            <li>does not determine enforceability</li>
            <li>does not provide legal, financial or professional advice</li>
            <li>does not create a professional relationship</li>
          </ul>

          <p className="text-gray-700 leading-relaxed mb-6">
            Documents may have different meanings depending on jurisdiction and circumstances.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Users remain responsible for any decision made using the information provided.
          </p>

          <div className="bg-blue-50 rounded-2xl p-8 text-center mt-12">
            <p className="text-2xl font-bold text-gray-900 mb-2">
              Where certainty is required, consult a qualified professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}