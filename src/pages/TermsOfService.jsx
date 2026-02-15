import React from "react";
import { Shield, ArrowLeft, FileText, Users, CreditCard, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";

export default function TermsOfService() {
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
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Terms of Service</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-12">
            By using Complyly you agree to the following terms.
          </p>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900 m-0">Nature of Service</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Complyly is an automated document explanation tool providing informational output only.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The service does not provide legal advice, professional opinion, or decision authority.
            </p>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900 m-0">User Responsibility</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Users remain responsible for interpreting results and making decisions.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You agree not to rely solely on the service for matters requiring professional judgement.
            </p>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900 m-0">Acceptable Use</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              You agree not to upload unlawful content or material you are not permitted to process.
            </p>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900 m-0">Payments</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Payments grant access to generated explanations.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Digital services may be non-refundable once delivered where permitted by applicable law.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Store purchases follow store policies.
            </p>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900 m-0">Availability</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We may modify or discontinue features at any time without liability.
            </p>
          </section>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-12 rounded-r-lg">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">Limitation of Liability</h3>
                <p className="text-gray-700">
                  The service is provided "as is". To the maximum extent permitted by law, Complyly is not 
                  liable for decisions, losses or outcomes arising from use.
                </p>
              </div>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Jurisdiction</h2>
            <p className="text-gray-700 leading-relaxed">
              Users are responsible for compliance with laws applicable in their location.
            </p>
          </section>

          <div className="bg-gray-50 rounded-xl p-8 text-center mt-16">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Questions about terms?</h3>
            <p className="text-gray-700 mb-4">Contact us at</p>
            <a href="mailto:support@complyly.io" className="text-blue-600 font-semibold text-lg hover:underline">
              support@complyly.io
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}