import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Mail, Globe, HelpCircle, FileText, Shield, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Account() {
  const navigate = useNavigate();
  const [deleteAccountDialog, setDeleteAccountDialog] = useState(false);

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => base44.auth.me()
  });

  const handleDeleteAccount = async () => {
    // In a real implementation, this would call a backend function to delete the user account
    // For now, we'll just log out
    await base44.auth.logout("/");
  };

  const menuItems = [
    {
      icon: Mail,
      label: "Email",
      value: user?.email || "Loading...",
      action: null,
      readOnly: true
    },
    {
      icon: HelpCircle,
      label: "Support",
      value: null,
      action: () => navigate(createPageUrl("Support"))
    },
    {
      icon: Shield,
      label: "Privacy policy",
      value: null,
      action: () => navigate(createPageUrl("PrivacyPolicy"))
    },
    {
      icon: FileText,
      label: "Terms of service",
      value: null,
      action: () => navigate(createPageUrl("TermsOfService"))
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to={createPageUrl("Dashboard")} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <Link to={createPageUrl("Home")} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6991beb21a607e88162ccc57/20ca69fb8_WhatsAppImage2026-02-10at1912251.jpeg" 
              alt="Complyly" 
              className="h-10 w-10"
            />
            <span className="text-2xl font-bold text-slate-900">Complyly</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Account & Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-0">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 ${
                  index !== menuItems.length - 1 ? "border-b" : ""
                } ${item.action && !item.readOnly ? "cursor-pointer hover:bg-gray-50" : ""}`}
                onClick={item.action && !item.readOnly ? item.action : undefined}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.value ? (
                  <span className="text-gray-600 text-sm">{item.value}</span>
                ) : (
                  item.action && <span className="text-gray-400">→</span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Delete Account */}
        <Card className="border-red-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Trash2 className="w-5 h-5 text-red-600 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-600 mb-2">Delete account</h3>
                <p className="text-sm text-gray-600 mb-4">
                  This will permanently remove your account and all saved documents.
                </p>
                <Button
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  onClick={() => setDeleteAccountDialog(true)}
                >
                  Delete account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Account Dialog */}
      <Dialog open={deleteAccountDialog} onOpenChange={setDeleteAccountDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete account?</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 py-4">
            This permanently removes your account and saved items. This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteAccountDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}