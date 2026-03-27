import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Calendar, FlaskConical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import { Helmet } from "react-helmet-async";

const WORKSPACE_ID = import.meta.env.VITE_AUTOMATOS_WORKSPACE_ID;

interface PaperData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image_url: string | null;
  tags: string[];
  author_name: string;
  published_at: string;
  reading_time_minutes: number;
  seo_description?: string;
  category?: string;
}

const fetchPaper = async (slug: string): Promise<PaperData> => {
  const res = await fetch(
    `https://api.automatos.app/api/widgets/blog/posts/${slug}?workspace_id=${WORKSPACE_ID}`
  );
  if (!res.ok) throw new Error("Paper not found");
  return res.json();
};

const PaperSkeleton = () => (
  <div className="max-w-3xl mx-auto animate-pulse space-y-8">
    <div className="h-10 bg-muted rounded w-3/4" />
    <div className="h-5 bg-muted rounded w-1/2" />
    <div className="h-px bg-border" />
    <div className="space-y-4">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="h-4 bg-muted rounded"
          style={{ width: `${70 + Math.random() * 30}%` }}
        />
      ))}
    </div>
  </div>
);

/**
 * Sanitize HTML content from the blog API.
 *
 * Content is already sanitized server-side by the Automatos API before storage.
 * DOMPurify is applied here as a defense-in-depth measure on the client side.
 */
const sanitizeContent = (html: string): string =>
  DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
  });

const ResearchPaper = () => {
  const { slug } = useParams<{ slug: string }>();

  const {
    data: paper,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["research-paper", slug],
    queryFn: () => fetchPaper(slug!),
    enabled: !!slug,
  });

  const sanitizedContent = paper ? sanitizeContent(paper.content) : "";

  return (
    <div className="min-h-screen bg-background">
      {paper && (
        <Helmet>
          <title>{paper.title} | Automatos AI Research</title>
          <meta
            name="description"
            content={paper.seo_description || paper.excerpt}
          />
          <meta property="og:title" content={paper.title} />
          <meta
            property="og:description"
            content={paper.seo_description || paper.excerpt}
          />
          {paper.cover_image_url && (
            <meta property="og:image" content={paper.cover_image_url} />
          )}
          <meta property="og:type" content="article" />
          <meta
            property="article:published_time"
            content={paper.published_at}
          />
          <meta property="article:author" content={paper.author_name} />
          {paper.tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </Helmet>
      )}
      <Navbar />
      <main className="pt-24 pb-16">
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-10"
          >
            <Link
              to="/research"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Research
            </Link>
          </motion.div>

          {isLoading && <PaperSkeleton />}

          {isError && (
            <div className="text-center py-20 space-y-4">
              <h2 className="text-2xl font-semibold">Paper not found</h2>
              <p className="text-muted-foreground">
                This paper may have been removed or the URL is incorrect.
              </p>
              <Link
                to="/research"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Research
              </Link>
            </div>
          )}

          {paper && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Paper header */}
              <header className="mb-10">
                {/* Label */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>Practitioner Research</span>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-tight mb-6">
                  {paper.title}
                </h1>

                {/* Subtitle / excerpt */}
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {paper.excerpt}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {paper.author_name}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(paper.published_at), "MMMM d, yyyy")}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {paper.reading_time_minutes} min read
                  </span>
                </div>

                {/* Tags */}
                {paper.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {paper.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Cover image */}
                {paper.cover_image_url && (
                  <div className="rounded-xl overflow-hidden max-h-[420px] mb-2">
                    <img
                      src={paper.cover_image_url}
                      alt={paper.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Divider */}
                <div className="border-t border-border mt-8" />
              </header>

              {/* Paper content — academic prose styling */}
              {/* Content is sanitized server-side and again client-side via DOMPurify */}
              <div
                className="
                  prose prose-lg dark:prose-invert
                  max-w-3xl mx-auto
                  prose-headings:font-bold
                  prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:leading-relaxed prose-p:text-base
                  prose-li:text-base
                  prose-blockquote:border-l-primary
                  prose-blockquote:bg-muted/50
                  prose-blockquote:py-1 prose-blockquote:px-4
                  prose-blockquote:rounded-r-lg
                  prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                  prose-code:text-sm prose-code:font-normal
                  prose-pre:bg-[#1e1e2e] prose-pre:rounded-xl
                  prose-table:text-sm
                  prose-th:bg-muted prose-th:font-semibold
                  prose-td:border-border
                  prose-img:rounded-xl
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:font-semibold
                "
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />

              {/* Footer attribution */}
              <footer className="max-w-3xl mx-auto mt-16 pt-8 border-t border-border">
                <div className="bg-muted/50 rounded-xl p-6 text-sm text-muted-foreground space-y-2">
                  <p>
                    This research was conducted on the{" "}
                    <a
                      href="https://automatos.ai"
                      className="text-primary hover:underline font-medium"
                    >
                      Automatos AI platform
                    </a>
                    , where multi-agent missions coordinate specialized agents
                    across research, analysis, and content workflows.
                  </p>
                </div>
              </footer>
            </motion.div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ResearchPaper;
