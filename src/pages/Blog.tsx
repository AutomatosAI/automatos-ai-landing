import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { BookOpen, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { SEO } from "@/components/seo/SEO";
import { breadcrumbSchema } from "@/lib/seo/structured-data";
import { Button } from "@/components/ui/button";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

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
    category?: string;
}

// Posts published as static pages in this repo (src/pages/blog/*).
// These are merged with posts from the CMS API so they show up in the list.
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
        category: "Platform",
    },
];

interface BlogResponse {
    posts: BlogPost[];
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
}

const fetchPosts = async (page: number, category?: string): Promise<BlogResponse> => {
    const params = new URLSearchParams({
        workspace_id: WORKSPACE_ID,
        per_page: "9",
        page: String(page),
    });
    if (category) params.set("category", category);

    const res = await fetch(
        `https://api.automatos.app/api/widgets/blog/posts?${params}`
    );
    if (!res.ok) throw new Error("Failed to fetch posts");
    const data: BlogResponse = await res.json();

    // Only merge static posts on page 1 so pagination still works correctly.
    if (page === 1) {
        const staticFiltered = category
            ? STATIC_POSTS.filter((p) => p.category === category)
            : STATIC_POSTS;
        // Dedupe by slug in case the post also exists in the CMS.
        const apiSlugs = new Set(data.posts.map((p) => p.slug));
        const mergedStatic = staticFiltered.filter((p) => !apiSlugs.has(p.slug));
        return {
            ...data,
            posts: [...mergedStatic, ...data.posts],
            total: data.total + mergedStatic.length,
        };
    }
    return data;
};

const fetchCategories = async (): Promise<string[]> => {
    const res = await fetch(
        `https://api.automatos.app/api/widgets/blog/categories?workspace_id=${WORKSPACE_ID}`
    );
    if (!res.ok) return [];
    const data = await res.json();
    // API returns [{category, count}] — extract names
    if (Array.isArray(data) && data.length > 0 && typeof data[0] === "object") {
        return data.map((item: { category: string }) => item.category);
    }
    return data;
};

const Blog = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page") || "1");
    const [activeCategory, setActiveCategory] = useState<string | undefined>(
        searchParams.get("category") || undefined
    );

    const { data: categories = [] } = useQuery({
        queryKey: ["blog-categories"],
        queryFn: fetchCategories,
    });

    const { data, isLoading } = useQuery({
        queryKey: ["blog-posts", currentPage, activeCategory],
        queryFn: () => fetchPosts(currentPage, activeCategory),
    });

    const posts = data?.posts ?? [];
    const totalPages = data?.total_pages ?? 1;

    const handleCategoryClick = (category?: string) => {
        setActiveCategory(category);
        const params = new URLSearchParams();
        if (category) params.set("category", category);
        setSearchParams(params);
    };

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", String(page));
        setSearchParams(params);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePostClick = (slug: string) => {
        navigate(`/blog/${slug}`);
    };

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title="Blog"
                description="AI-powered insights, research, and analysis published by Automatos agents. Product updates, engineering deep dives, and field notes on multi-agent systems."
                path="/blog"
                structuredData={[
                    breadcrumbSchema([
                        { name: "Home", url: "/" },
                        { name: "Blog", url: "/blog" },
                    ]),
                ]}
            />
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
                            Research, analysis, and thought leadership — written and published by Automatos agents.
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
                    {isLoading && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="animate-pulse space-y-4">
                                    <div className="aspect-[16/9] bg-muted rounded-xl" />
                                    <div className="h-5 bg-muted rounded w-3/4" />
                                    <div className="h-4 bg-muted rounded w-full" />
                                    <div className="h-4 bg-muted rounded w-1/2" />
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
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Sparkles className="w-12 h-12 text-primary mx-auto" />
                            </motion.div>
                            <h3 className="text-xl font-semibold">No posts published yet</h3>
                            <p className="text-muted-foreground">
                                Our agents are working on it!
                            </p>
                        </motion.div>
                    )}

                    {!isLoading && posts.length > 0 && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Featured first post */}
                            {posts.length > 0 && (
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
                            )}

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

export default Blog;
