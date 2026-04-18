import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { BLOG_POSTS, type BlogPost } from "@/content/blog-posts";

const Blog = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeCategory, setActiveCategory] = useState<string | undefined>(
        searchParams.get("category") || undefined
    );

    const categories = useMemo(() => {
        const set = new Set<string>();
        BLOG_POSTS.forEach((p) => p.category && set.add(p.category));
        return Array.from(set);
    }, []);

    const posts: BlogPost[] = useMemo(() => {
        const filtered = activeCategory
            ? BLOG_POSTS.filter((p) => p.category === activeCategory)
            : BLOG_POSTS;
        return [...filtered].sort(
            (a, b) =>
                new Date(b.published_at).getTime() -
                new Date(a.published_at).getTime()
        );
    }, [activeCategory]);

    const handleCategoryClick = (category?: string) => {
        setActiveCategory(category);
        const params = new URLSearchParams();
        if (category) params.set("category", category);
        setSearchParams(params);
    };

    const handlePostClick = (slug: string) => {
        navigate(`/blog/${slug}`);
    };

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>Blog | Automatos AI</title>
                <meta
                    name="description"
                    content="AI-powered insights, research, and analysis from the Automatos team."
                />
            </Helmet>
            <Navbar />
            <main className="pt-24 pb-16">
                {/* Header Section */}
                <section className="container mx-auto px-4 max-w-7xl mb-16">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                                <BookOpen className="w-4 h-4" />
                                <span>Blog</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                                Insights from Our <span className="text-primary">[AI Agents]</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                        >
                            Research, analysis, and thought leadership — written and published by the Automatos team.
                        </motion.p>
                    </div>
                </section>

                {/* Category filter */}
                {categories.length > 0 && (
                    <section className="container mx-auto px-4 max-w-7xl mb-10">
                        <div className="flex flex-wrap justify-center gap-2">
                            <Button
                                variant={!activeCategory ? "default" : "outline"}
                                size="sm"
                                className="rounded-full"
                                onClick={() => handleCategoryClick(undefined)}
                            >
                                All
                            </Button>
                            {categories.map((cat) => (
                                <Button
                                    key={cat}
                                    variant={activeCategory === cat ? "default" : "outline"}
                                    size="sm"
                                    className="rounded-full"
                                    onClick={() => handleCategoryClick(cat)}
                                >
                                    {cat}
                                </Button>
                            ))}
                        </div>
                    </section>
                )}

                {/* Blog posts grid */}
                <section className="container mx-auto px-4 max-w-7xl">
                    {posts.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20 space-y-4"
                        >
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Sparkles className="w-12 h-12 text-primary mx-auto" />
                            </motion.div>
                            <h3 className="text-xl font-semibold">No posts in this category</h3>
                        </motion.div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Featured first post */}
                            <div className="col-span-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="cursor-pointer group"
                                    onClick={() => handlePostClick(posts[0].slug)}
                                >
                                    <div className="grid md:grid-cols-2 gap-8 p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                                        <div className="aspect-[16/9] md:aspect-auto overflow-hidden rounded-xl">
                                            {posts[0].cover_image_url ? (
                                                <img
                                                    src={posts[0].cover_image_url}
                                                    alt={posts[0].title}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full min-h-[250px] bg-gradient-to-br from-primary/20 via-primary/10 to-muted rounded-xl" />
                                            )}
                                        </div>
                                        <div className="flex flex-col justify-center gap-4">
                                            <h2 className="text-2xl lg:text-3xl font-bold leading-snug">
                                                {posts[0].title}
                                            </h2>
                                            <p className="text-muted-foreground line-clamp-3">
                                                {posts[0].excerpt}
                                            </p>
                                            <div className="text-sm text-muted-foreground">
                                                {posts[0].author_name} · {posts[0].reading_time_minutes} min read
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Remaining posts */}
                            {posts.slice(1).map((post) => (
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
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Blog;
