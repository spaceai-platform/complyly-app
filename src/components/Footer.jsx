import React from "react";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { createPageUrl } from "../utils";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-sm">
          <p>© 2026 Complyly™. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to={createPageUrl("PrivacyPolicy")} className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to={createPageUrl("TermsOfService")} className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link to={createPageUrl("Support")} className="hover:text-white transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}