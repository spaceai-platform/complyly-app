import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Upload, Brain, List, CheckCircle, HelpCircle, Clock, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { base44 } from "@/api/base44Client";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    base44.auth.isAuthenticated().then(setIsAuthenticated);
  }, []);

  const categories = [
    { id: "personal", title: "Renting a place", icon: FileText },
    { id: "employment", title: "Starting a job", icon: FileText },
    { id: "financial", title: "Borrowing money", icon: FileText },
    { id: "business", title: "Signing terms online", icon: FileText },
    { id: "policy", title: "Business agreement", icon: FileText },
    { id: "other", title: "Other document", icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-slate-200/60 bg-white/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">
          <Link to={createPageUrl("Home")} className="flex items-center gap-2">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6991beb21a607e88162ccc57/20ca69fb8_WhatsAppImage2026-02-10at1912251.jpeg" 
              alt="Complyly" 
              className="h-10 w-10"
            />
            <span className="text-xl font-bold text-slate-900">Complyly</span>
          </Link>
          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link to={createPageUrl("Dashboard")} className="text-slate-700 hover:text-slate-900 font-medium text-sm transition-colors">
                  Dashboard
                </Link>
                <Link to={createPageUrl("Support")} className="text-slate-700 hover:text-slate-900 font-medium text-sm transition-colors">
                  Support
                </Link>
                <Button variant="ghost" className="text-sm" onClick={() => base44.auth.logout("/")}>Sign Out</Button>
              </>
            ) : (
              <>
                <Link to={createPageUrl("Support")} className="text-slate-700 hover:text-slate-900 font-medium text-sm transition-colors">
                  Support
                </Link>
                <Button variant="ghost" className="text-sm hover:bg-slate-100" onClick={() => base44.auth.redirectToLogin()}>Sign In</Button>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-sm text-sm" onClick={() => base44.auth.redirectToLogin()}>
                   Get Started
                 </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-24 lg:py-32 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-sm font-medium text-blue-700">
              Document Understanding Platform
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-[1.1] text-slate-900 tracking-tight">
            Understand what the<br />document actually says
          </h1>

          <p className="text-xl lg:text-2xl text-slate-700 mb-5 max-w-3xl mx-auto leading-relaxed font-light">
            A clear explanation of agreements, policies and formal documents — before you decide what to do.
          </p>

          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto font-light">
            Most people only realise the meaning after something happens.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg mb-10">
            <span className="text-sm text-slate-600">Introductory pricing — full explanation from</span>
            <span className="text-base font-semibold text-slate-900">£4.99</span>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Link to={createPageUrl("CategorySelection")}>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-base px-12 py-7 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                        Understand this document
                      </Button>
            </Link>

            <p className="text-sm text-slate-500 flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Takes about a minute
              </span>
              <span className="text-slate-300">•</span>
              <span>No specialised knowledge needed</span>
            </p>
          </div>
        </motion.div>
      </section>

      {/* Category Selector */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl lg:text-5xl font-bold mb-5 text-slate-900 tracking-tight">What are you reviewing?</h2>
            <p className="text-lg text-slate-600 font-light">Selection only helps tailor the explanation.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link to={createPageUrl("CategorySelection")}>
                  <Card className="border-2 border-blue-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 cursor-pointer group bg-gradient-to-br from-blue-50 to-white">
                    <CardContent className="p-7 text-center">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 group-hover:from-blue-700 group-hover:to-blue-800 flex items-center justify-center mx-auto mb-4 transition-all shadow-md">
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-slate-900 text-base">{category.title}</h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-5 text-slate-900 tracking-tight">Upload a document or screenshot</h2>
        </div>

        <Card className="border-2 border-dashed border-blue-400 bg-gradient-to-br from-blue-50 via-white to-blue-50 hover:border-blue-600 transition-all duration-300 shadow-md hover:shadow-lg">
            <CardContent className="p-14 lg:p-16 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Upload className="w-10 h-10 text-white" />
              </div>
              <p className="text-2xl font-medium text-slate-900 mb-3">Drop a file or choose a document</p>
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm text-slate-600">PDF</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm text-slate-600">image</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm text-slate-600">screenshot</span>
            </div>
            <Link to={createPageUrl("CategorySelection")}>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-10 py-6 rounded-xl mb-6 shadow-lg hover:shadow-xl transition-all">
                Continue
              </Button>
            </Link>
            <p className="text-sm text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
              Processed automatically • Not stored after session unless you choose to save
            </p>
          </CardContent>
        </Card>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-16 text-center text-slate-900 tracking-tight">How it works</h2>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Brain className="w-9 h-9 text-blue-600" />
              </div>
              <div className="text-sm font-semibold text-blue-600 mb-2 tracking-wide uppercase">Step 1</div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Read</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                We recognise structure and relationships in the wording
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mx-auto mb-6 shadow-sm">
                <List className="w-9 h-9 text-blue-600" />
              </div>
              <div className="text-sm font-semibold text-blue-600 mb-2 tracking-wide uppercase">Step 2</div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Organise</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                We map sections, conditions and timing references
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mx-auto mb-6 shadow-sm">
                <FileCheck className="w-9 h-9 text-blue-600" />
              </div>
              <div className="text-sm font-semibold text-blue-600 mb-2 tracking-wide uppercase">Step 3</div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Explain</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                You receive a clear explanation of what the document describes
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You Receive */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-16 text-center text-slate-900 tracking-tight">Your explanation includes</h2>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 h-full hover:shadow-xl bg-gradient-to-br from-white to-blue-50">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-5 shadow-md">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">Document overview</h3>
                  <p className="text-slate-600 leading-relaxed font-light">
                    Summary of the main purpose and key parties involved
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 h-full hover:shadow-xl bg-gradient-to-br from-white to-blue-50">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-5 shadow-md">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">Responsibilities explained</h3>
                  <p className="text-slate-600 leading-relaxed font-light">
                    What each party is expected to do or provide
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 h-full hover:shadow-xl bg-gradient-to-br from-white to-blue-50">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-5 shadow-md">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">Timing and conditions clarified</h3>
                  <p className="text-slate-600 leading-relaxed font-light">
                    When things happen and under what circumstances
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 h-full hover:shadow-xl bg-gradient-to-br from-white to-blue-50">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-5 shadow-md">
                    <HelpCircle className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">Questions readers often ask</h3>
                  <p className="text-slate-600 leading-relaxed font-light">
                    Common points of confusion addressed
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Boundary */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-14 text-center text-slate-900 tracking-tight">Designed for understanding</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100/50 h-full shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-lg text-slate-900 font-medium leading-relaxed">
                    Helps you understand wording before acting
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-white h-full shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-5">
                    <HelpCircle className="w-8 h-8 text-slate-600" />
                  </div>
                  <p className="text-lg text-slate-900 font-medium leading-relaxed">
                    Does not replace professional judgement
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-10 text-slate-900 leading-tight tracking-tight">
              Start with the document<br />in front of you
            </h2>

            <Link to={createPageUrl("CategorySelection")}>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-base px-12 py-7 rounded-xl mb-4 shadow-lg hover:shadow-2xl transition-all duration-300">
                Analyse a document
              </Button>
            </Link>

            <p className="text-sm text-slate-500 font-light">
              You'll see a preview before payment
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}