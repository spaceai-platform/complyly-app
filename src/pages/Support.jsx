import React from "react";
import { Shield, ArrowLeft, Mail, HelpCircle, CreditCard, Globe, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";

export default function Support() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to={createPageUrl("Home")} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6991beb21a607e88162ccc57/20ca69fb8_WhatsAppImage2026-02-10at1912251.jpeg" 
              alt="Complyly" 
              className="h-10 w-10"
            />
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
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Support</h1>
          <p className="text-xl text-gray-600">
            We provide global technical support for access, payments and platform usage.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 rounded-2xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <Mail className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Contact Support</h2>
                <div className="space-y-3 text-gray-700">
                  <p><span className="font-semibold">Email:</span> support@complyly.io</p>
                  <p><span className="font-semibold">Document forwarding:</span> scan@complyly.io</p>
                  <p><span className="font-semibold">Typical response time:</span> 24–48 hours (Mon–Fri)</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 mt-6">
              <h3 className="font-bold mb-3 text-gray-900">Please include:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Device (Android / iOS / Web)</li>
                <li>• Approximate time used</li>
                <li>• Screenshot if applicable</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border-2 border-gray-100">
            <div className="flex items-start gap-4">
              <HelpCircle className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">How the Service Works</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Complyly generates automated explanations to help users understand document wording before acting.
                </p>
                <p className="text-gray-900 font-semibold mb-2">
                  The service explains structure and meaning.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  It does not provide legal, financial, tax, regulatory or professional advice.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border-2 border-gray-100">
            <div className="flex items-start gap-4">
              <CreditCard className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Payments</h2>
                <div className="space-y-3 text-gray-700">
                  <p><span className="font-semibold">Website purchases:</span> contact support@complyly.io</p>
                  <p><span className="font-semibold">App Store purchases:</span> handled by Apple</p>
                  <p><span className="font-semibold">Google Play purchases:</span> handled by Google Play</p>
                  <p className="pt-3 border-t text-sm italic">
                    We cannot override store billing decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border-2 border-gray-100">
            <div className="flex items-start gap-4">
              <Globe className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Global Use</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Complyly is available worldwide.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Documents and rights differ by country, therefore users remain responsible for decisions within their jurisdiction.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border-2 border-gray-100">
            <div className="flex items-start gap-4">
              <Database className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Data Handling</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Documents are processed automatically to generate explanations.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Access links expire and we aim to minimise retention.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  See <Link to={createPageUrl("PrivacyPolicy")} className="text-blue-600 hover:underline font-semibold">Privacy Policy</Link> for details.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center py-12 text-gray-500 italic">
          <p>Complyly — document understanding tool</p>
        </div>
      </div>
    </div>
  );
}