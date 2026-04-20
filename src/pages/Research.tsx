import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { FlaskConical, ChevronLeft, ChevronRight } from "lucide-react";
import { SEO } from "@/components/seo/SEO";
import { breadcrumbSchema } from "@/lib/seo/structured-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { format } from "date-fns";

const WORKSPACE_ID = import.meta.env.VITE_AUTOMATOS_WORKSPACE_ID;

interface ResearchPost {
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string | null;
  tags: string[];
  author_name: string;
  published_at: string;
  reading_time_minutes: number;
}

interface ResearchResponse {
  posts: ResearchPost[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

const fetchResearchPosts = async (page: number): Promise<ResearchResponse> => {
  const params = new URLSearchParams({
    workspace_id: WORKSPACE_ID,
    per_page: "12",
    page: String(page),
    category: "Research",
  });

  const res = await fetch(
    `https://api.automatos.app/api/widgets/blog/posts?${params}`
  );
  if (!res.ok) throw new Error("Failed to fetch research papers");
  return res.json();
};

const Research = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");

  const { data, isLoading } = useQuery({
    queryKey: ["research-posts", currentPage],
    queryFn: () => fetchResearchPosts(currentPage),
  });

  const posts = data?.posts ?? [];
  const totalPages = data?.total_pages ?? 1;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Research"
        description="Original research on multi-agent coordination, semantic memory, and AI orchestration from the Automatos AI platform."
        path="/research"
        structuredData={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Research", url: "/research" },
          ]),
        ]}
      />
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Header */}
        <section className="container mx-auto px-4 max-w-5xl mb-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <FlaskConical className="w-4 h-4" />
                <span>Research</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Practitioner{" "}
                <span className="text-primary">[Research]</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Original research on multi-agent coordination, semantic memory, and
              AI orchestration &mdash; built and tested on the Automatos platform.
            </motion.p>
          </div>
        </section>

        {/* Papers */}
        <section className="container mx-auto px-4 max-w-5xl">
          {isLoading && (
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse flex gap-8 p-6 border border-border rounded-xl"
                >
                  <div className="hidden md:block w-64 h-40 bg-muted rounded-lg shrink-0" />
                  <div className="flex-1 space-y-4">
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                    <div className="h-3 bg-muted rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && posts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 space-y-4"
            >
              <FlaskConical className="w-12 h-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">
                No research papers found
              </h3>
              <p className="text-muted-foreground">
                Check back soon — new research is published regularly.
              </p>
            </motion.div>
          )}

          {!isLoading && posts.length > 0 && (
            <div className="space-y-6">
              {posts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/research/${post.slug}`)}
                >
                  <div className="flex flex-col md:flex-row gap-6 p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                    {/* Cover image */}
                    {post.cover_image_url && (
                      <div className="w-full md:w-64 h-44 overflow-hidden rounded-lg shrink-0">
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex flex-col justify-center gap-3 min-w-0">
                      <h2 className="text-xl lg:text-2xl font-bold leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground line-clamp-3 text-sm lg:text-base">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span>{post.author_name}</span>
                        <span>&middot;</span>
                        <span>
                          {format(new Date(post.published_at), "MMMM d, yyyy")}
                        </span>
                        <span>&middot;</span>
                        <span>{post.reading_time_minutes} min read</span>
                      </div>
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {post.tags.slice(0, 5).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-12">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Research;
