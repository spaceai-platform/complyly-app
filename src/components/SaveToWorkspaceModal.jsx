import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";

export default function SaveToWorkspaceModal({ open, onOpenChange, onSuccess }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = async () => {
    if (!email) return;
    setIsLoading(true);
    setError("");
    
    try {
      await base44.auth.sendOTP(email);
      setStep(3);
    } catch (err) {
      setError("Could not send code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) return;
    setIsLoading(true);
    setError("");
    
    try {
      await base44.auth.verifyOTP(email, otp);
      setStep(4);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Invalid code. Please try again.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError("");
    try {
      await base44.auth.sendOTP(email);
      setError(""); // Clear any previous errors
    } catch (err) {
      setError("Could not resend code.");
    }
  };

  const handleClose = () => {
    // Keep session - just close modal
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Save this to your dashboard?</DialogTitle>
              <DialogDescription className="text-base pt-2">
                Create a free workspace to access this report later on any device.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Re-open anytime</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Compare documents later</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">No password required</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
                onClick={() => setStep(2)}
              >
                Continue with email
              </Button>
              
              <button
                onClick={handleClose}
                className="text-gray-600 hover:text-gray-900 text-sm w-full text-center"
              >
                Not now
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center pt-2">
              We'll send a one-time code. No spam.
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Continue with email</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <Input
                type="email"
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendCode()}
                className="text-base"
              />
              
              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
                onClick={handleSendCode}
                disabled={isLoading || !email}
              >
                {isLoading ? "Sending..." : "Send code"}
              </Button>

              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <p className="text-xs text-gray-500 pt-2">
                We only use your email to access your workspace.
              </p>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Enter the code</DialogTitle>
              <DialogDescription className="text-base pt-2">
                We sent a 6-digit code to {email}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <Input
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                onKeyDown={(e) => e.key === "Enter" && handleVerifyOTP()}
                className={`text-center text-2xl tracking-widest ${shake ? 'animate-shake' : ''}`}
                maxLength={6}
              />
              
              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? "Verifying..." : "Verify & continue"}
              </Button>

              <div className="flex items-center justify-center gap-4 text-sm">
                <button
                  onClick={handleResendCode}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Resend code
                </button>
                <span className="text-gray-300">•</span>
                <button
                  onClick={() => setStep(2)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Change email
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center pt-2">
                Code expires in 10 minutes
              </p>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl text-center">Saved</DialogTitle>
              <DialogDescription className="text-base pt-2 text-center">
                This report is now in your dashboard.
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center justify-center py-6">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
                onClick={() => navigate(createPageUrl("Dashboard"))}
              >
                Go to dashboard
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={handleClose}
              >
                Continue reading
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}