import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Marketplace from "./pages/Marketplace";
import DesignYourAgents from "./pages/DesignYourAgents";
import ConnectYourWorld from "./pages/ConnectYourWorld";
import EmpowerWithKnowledge from "./pages/EmpowerWithKnowledge";
import LaunchMissions from "./pages/LaunchMissions";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Research from "./pages/Research";
import ResearchPaper from "./pages/ResearchPaper";
import EuAiAct from "./pages/EuAiAct";
import EuAiActChecker from "./pages/EuAiActChecker";
import AutomatosNotWrapper from "./pages/blog/AutomatosNotWrapper";
import FromToolListsToOperatingGraphs from "./pages/research/FromToolListsToOperatingGraphs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="automatos-ui-theme">
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
            <Route path="/design-your-agents" element={<DesignYourAgents />} />
            <Route path="/connect-your-world" element={<ConnectYourWorld />} />
            <Route path="/empower-with-knowledge" element={<EmpowerWithKnowledge />} />
            <Route path="/launch-missions" element={<LaunchMissions />} />
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
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
