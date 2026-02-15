import React from "react";
import { Shield, ArrowLeft, Lock, Eye, Globe, Server, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";

export default function PrivacyPolicy() {
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
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Privacy Policy</h1>
          <p className="text-gray-500">Last updated: 15 February 2026</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-12">
            Complyly provides automated document explanations. This policy explains how data is handled.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-12 rounded-r-lg">
            <div className="flex items-start gap-4">
              <Lock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">Your data is encrypted</h3>
                <p className="text-gray-700">Documents are encrypted at rest and in transit using bank-grade security.</p>
              </div>
            </div>
          </div>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900 m-0">Information We Process</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">When using the service we may process:</p>
            <ul className="space-y-2 text-gray-700">
              <li>uploaded documents</li>
              <li>technical usage data (device, browser, time)</li>
              <li>approximate region (for language and display settings)</li>
              <li>payment confirmation from payment providers</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              We do not collect personal profiles or behavioural tracking beyond service functionality.
            </p>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Server className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900 m-0">How Documents Are Used</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Documents are processed solely to generate an automated explanation.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We aim not to retain files longer than necessary for processing and access delivery.
            </p>
            <p className="text-gray-700 leading-relaxed font-semibold">
              We do not sell uploaded documents or personal data.
            </p>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900 m-0">Payments</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-2">
              Payments are handled by third-party providers (e.g. Stripe, Apple, Google).
            </p>
            <p className="text-gray-700 leading-relaxed">
              We do not store full payment card details.
            </p>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900 m-0">Security</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We apply reasonable technical measures to protect data during processing and transmission.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm italic">
              No online system can be guaranteed completely secure.
            </p>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900 m-0">International Use</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Complyly is accessible globally. By using the service you acknowledge your data may be processed 
              in systems located in different jurisdictions.
            </p>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900 m-0">User Responsibility</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Users should avoid uploading highly sensitive identity documents unless necessary.
            </p>
          </section>

          <div className="bg-gray-50 rounded-xl p-8 text-center mt-16">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Questions about privacy?</h3>
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