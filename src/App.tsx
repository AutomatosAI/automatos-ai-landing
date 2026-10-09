import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Marketplace from "./pages/Marketplace";
import Auto from "./pages/product/Auto";
import CommandCentre from "./pages/product/CommandCentre";
import Documents from "./pages/product/Documents";
import Socials from "./pages/product/Socials";
import Integrations from "./pages/product/Integrations";
import YourStore from "./pages/product/YourStore";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Research from "./pages/Research";
import ResearchPaper from "./pages/ResearchPaper";
import AutomatosNotWrapper from "./pages/blog/AutomatosNotWrapper";
import FromToolListsToOperatingGraphs from "./pages/research/FromToolListsToOperatingGraphs";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { ExternalRedirect } from "@/components/ExternalRedirect";
import { EU_AI_ACT_CHECKER_URL, EU_AI_ACT_URL } from "@/lib/links";
import { AutomatosChat } from "@/components/widgets/AutomatosChat";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="automatos-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/auto" element={<Auto />} />
            <Route path="/command-centre" element={<CommandCentre />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/socials" element={<Socials />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/your-store" element={<YourStore />} />
            <Route path="/login" element={<Login />} />
            {/* v1 pillar pages, kept for their links: redirect to the product pages */}
            <Route path="/design-your-agents" element={<Navigate to="/auto" replace />} />
            <Route path="/connect-your-world" element={<Navigate to="/integrations" replace />} />
            <Route path="/empower-with-knowledge" element={<Navigate to="/documents" replace />} />
            <Route path="/launch-missions" element={<Navigate to="/command-centre" replace />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/automatos-is-not-an-llm-wrapper" element={<AutomatosNotWrapper />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/research" element={<Research />} />
            <Route path="/research/from-tool-lists-to-operating-graphs" element={<FromToolListsToOperatingGraphs />} />
            <Route path="/research/:slug" element={<ResearchPaper />} />
            {/* The honest posture lives on automatos.app. EuAiAct.tsx / EuAiActChecker.tsx are kept
                as the target text (PRD-132) and come back here once the missing pieces are built. */}
            <Route path="/eu-ai-act" element={<ExternalRedirect to={EU_AI_ACT_URL} label="Our EU AI Act posture is on automatos.app" />} />
            <Route path="/eu-ai-act/checker" element={<ExternalRedirect to={EU_AI_ACT_CHECKER_URL} label="The EU AI Act checker is on automatos.app" />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AutomatosChat />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
