import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { BLOG_POSTS } from "@/content/blog-posts";

export const BlogPreviewSection = () => {
  const navigate = useNavigate();

  const posts = [...BLOG_POSTS]
    .sort(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    )
    .slice(0, 3);

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  if (posts.length === 0) return null;

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
            Research, analysis, and thought leadership — written and published by the Automatos team.
          </p>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
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
