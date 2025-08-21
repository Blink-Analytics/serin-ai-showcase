import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AuthForm } from "@/components/auth-form";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Sign in:", { email, password, rememberMe });
    setIsLoading(false);
    onOpenChange(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Sign up:", { email, password, rememberMe });
    setIsLoading(false);
    onOpenChange(false);
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Social login:", provider);
    setIsLoading(false);
    onOpenChange(false);
  };

  const handleForgotPassword = () => {
    console.log("Forgot password for:", email);
    // Implement forgot password logic
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-black/95 border border-white/10 text-white backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Welcome to Shree AI
          </DialogTitle>
          <p className="text-center text-white/70 text-sm">
            Sign in to access your AI-powered recruitment platform
          </p>
        </DialogHeader>

        <div className="mt-8">
          <AuthForm
            isLoading={isLoading}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
            onSignIn={handleSignIn}
            onSignUp={handleSignUp}
            onSocialLogin={handleSocialLogin}
            onForgotPassword={handleForgotPassword}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
