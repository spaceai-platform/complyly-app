import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Briefcase, Building, CreditCard, Globe, File, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { motion } from "framer-motion";

export default function CategorySelection() {
  const navigate = useNavigate();

  const categories = [
    {
      id: "personal",
      title: "Renting a place",
      description: "Tenancy agreements, lease contracts, rental terms",
      icon: FileText,
      color: "from-blue-100 to-blue-200"
    },
    {
      id: "employment",
      title: "Starting a job",
      description: "Employment contracts, offer letters, work terms",
      icon: Briefcase,
      color: "from-purple-100 to-purple-200"
    },
    {
      id: "financial",
      title: "Borrowing money",
      description: "Loan agreements, credit terms, financial contracts",
      icon: CreditCard,
      color: "from-green-100 to-green-200"
    },
    {
      id: "policy",
      title: "Signing terms online",
      description: "Terms of service, privacy policies, user agreements",
      icon: Globe,
      color: "from-amber-100 to-amber-200"
    },
    {
      id: "business",
      title: "Business agreement",
      description: "Commercial contracts, vendor agreements, partnerships",
      icon: Building,
      color: "from-indigo-100 to-indigo-200"
    },
    {
      id: "other",
      title: "Other document",
      description: "Any other formal document or agreement",
      icon: File,
      color: "from-gray-100 to-gray-200"
    }
  ];

  const handleCategorySelect = (categoryId) => {
    sessionStorage.setItem("document_category", categoryId);
    navigate(createPageUrl("Upload") + `?type=${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to={createPageUrl("Home")} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <Link to={createPageUrl("Home")}>
            <span className="text-2xl font-bold text-blue-600">Complyly™</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">What are you reviewing?</h1>
            <p className="text-xl text-gray-600">
              Choose the category that best describes your document
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card
                  className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-blue-300"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0`}>
                        <category.icon className="w-6 h-6 text-gray-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{category.title}</h3>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 text-sm text-gray-500">
            Your selection helps tailor the explanation to your needs
          </div>
        </motion.div>
      </div>
    </div>
  );
}