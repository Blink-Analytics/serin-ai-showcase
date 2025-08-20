import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TwentyFirstToolbar } from "@21st-extension/toolbar-react";
import { ReactPlugin } from "@21st-extension/react";
import { PageTransition } from "@/components/ui/page-transition";
import { NavigationOverlay } from "@/components/ui/navigation-overlay";
import { useNavTransition } from "@/hooks/useNavTransition";
import Index from "./pages/Index";
import About from "./pages/About";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import OrbShowcase from "./pages/OrbShowcase";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import PostSignupDashboard from "./pages/PostSignupDashboard";
import { DemoOne } from "./components/demo";

const queryClient = new QueryClient();

const AppContent = () => {
  const { showBlackOverlay } = useNavTransition();
  
  return (
    <>
      <NavigationOverlay isVisible={showBlackOverlay} />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post-signup" element={<PostSignupDashboard />} />
          <Route path="/orb" element={<OrbShowcase />} />
          <Route path="/demo" element={<DemoOne />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TwentyFirstToolbar 
        config={{
          plugins: [ReactPlugin]
        }}
      />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
