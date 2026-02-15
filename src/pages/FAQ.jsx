import React from "react";
import { Shield, ArrowLeft, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";

export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState(null);

  const faqs = [
    {
      question: "What does Complyly do?",
      answer: "Complyly explains document wording in plain language to support understanding before action."
    },
    {
      question: "Is this legal advice?",
      answer: "No. It is an informational explanation tool."
    },
    {
      question: "Does it work in my country?",
      answer: "Yes. However laws differ by jurisdiction and the service does not determine legal rights."
    },
    {
      question: "Are documents stored?",
      answer: "We aim to minimise retention and process documents automatically."
    },
    {
      question: "Why do I need to pay?",
      answer: "Payment unlocks the full structured explanation."
    },
    {
      question: "Can I get a refund?",
      answer: "Website payments: contact support. App payments: handled by Apple or Google."
    },
    {
      question: "Can professionals use it?",
      answer: "Yes. Many users review agreements, policies and technical documents for understanding."
    },
    {
      question: "What documents are supported?",
      answer: "Agreements, contracts, policies, letters and formal communication."
    }
  ];

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

      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h1>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-2 border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 bg-gray-50">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}