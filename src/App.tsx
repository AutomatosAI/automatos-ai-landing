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
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Research from "./pages/Research";
import ResearchPaper from "./pages/ResearchPaper";
import EuAiAct from "./pages/EuAiAct";
import EuAiActChecker from "./pages/EuAiActChecker";
import AutomatosNotWrapper from "./pages/blog/AutomatosNotWrapper";
import FromToolListsToOperatingGraphs from "./pages/research/FromToolListsToOperatingGraphs";
import NotFound from "./pages/NotFound";
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
            <Route path="/eu-ai-act" element={<EuAiAct />} />
            <Route path="/eu-ai-act/checker" element={<EuAiActChecker />} />
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
