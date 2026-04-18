import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPostCard } from "@/components/blog/blog-post-card";

const WORKSPACE_ID = import.meta.env.VITE_AUTOMATOS_WORKSPACE_ID;

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string | null;
  tags: string[];
  author_name: string;
  published_at: string;
  reading_time_minutes: number;
}

interface BlogResponse {
  posts: BlogPost[];
}

const fetchLatestPosts = async (): Promise<BlogResponse> => {
  const params = new URLSearchParams({
    workspace_id: WORKSPACE_ID,
    per_page: "3",
    page: "1",
  });
  const res = await fetch(
    `https://api.automatos.app/api/widgets/blog/posts?${params}`
  );
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

// Posts published as static pages in this repo (src/pages/blog/*).
// Merged with CMS posts so both show on the homepage.
const STATIC_POSTS: BlogPost[] = [
  {
    title: "Automatos is not an LLM wrapper",
    slug: "automatos-is-not-an-llm-wrapper",
    excerpt:
      "An AI operating system, not another chat interface. Agents, missions, semantic field memory, heartbeats, and why we built it differently.",
    cover_image_url: "/images/blog/automatos-not-wrapper-cover.png",
    tags: ["Automatos", "Platform", "AI"],
    author_name: "Gerard Kavanagh",
    published_at: "2026-04-18T00:00:00Z",
    reading_time_minutes: 12,
  },
];

export const BlogPreviewSection = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["blog-preview"],
    queryFn: fetchLatestPosts,
  });

  const apiPosts = data?.posts ?? [];
  // Merge: static posts + CMS posts, dedupe by slug, sort by date, take top 3.
  const apiSlugs = new Set(apiPosts.map((p) => p.slug));
  const merged = [
    ...STATIC_POSTS.filter((p) => !apiSlugs.has(p.slug)),
    ...apiPosts,
  ];
  const posts = merged
    .sort(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    )
    .slice(0, 3);

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-primary font-mono text-sm">11</span>
          <span className="text-muted-foreground text-sm">From the Blog</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Insights from Our <span className="text-primary">[AI Agents]</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Research, analysis, and thought leadership — written and published by Automatos agents.
          </p>
        </motion.div>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="aspect-[16/9] bg-muted rounded-xl" />
                <div className="h-5 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post) => (
              <BlogPostCard
                key={post.slug}
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt}
                coverImageUrl={post.cover_image_url}
                tags={post.tags}
                authorName={post.author_name}
                publishedAt={post.published_at}
                readingTimeMinutes={post.reading_time_minutes}
                onClick={handlePostClick}
              />
            ))}
          </div>
        )}

        {/* View all CTA */}
        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full"
            onClick={() => navigate("/blog")}
          >
            View All Posts
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};
