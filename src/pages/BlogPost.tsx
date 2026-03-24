import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import { Helmet } from "react-helmet-async";

const WORKSPACE_ID = import.meta.env.VITE_AUTOMATOS_WORKSPACE_ID;

interface BlogPostData {
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

const fetchPost = async (slug: string): Promise<BlogPostData> => {
    const res = await fetch(
        `https://api.automatos.app/api/widgets/blog/posts/${slug}?workspace_id=${WORKSPACE_ID}`
    );
    if (!res.ok) throw new Error("Post not found");
    return res.json();
};

const PostSkeleton = () => (
    <div className="max-w-3xl mx-auto animate-pulse space-y-6">
        <div className="h-8 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="h-64 bg-muted rounded-2xl" />
        <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="h-4 bg-muted rounded" style={{ width: `${80 + Math.random() * 20}%` }} />
            ))}
        </div>
    </div>
);

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();

    const { data: post, isLoading, isError } = useQuery({
        queryKey: ["blog-post", slug],
        queryFn: () => fetchPost(slug!),
        enabled: !!slug,
    });

    return (
        <div className="min-h-screen bg-background">
            {post && (
                <Helmet>
                    <title>{post.title} | Automatos AI Blog</title>
                    <meta name="description" content={post.seo_description || post.excerpt} />
                    <meta property="og:title" content={post.title} />
                    <meta property="og:description" content={post.seo_description || post.excerpt} />
                    {post.cover_image_url && <meta property="og:image" content={post.cover_image_url} />}
                    <meta property="og:type" content="article" />
                    <meta property="article:published_time" content={post.published_at} />
                    <meta property="article:author" content={post.author_name} />
                    {post.tags.map((tag) => (
                        <meta key={tag} property="article:tag" content={tag} />
                    ))}
                </Helmet>
            )}
            <Navbar />
            <main className="pt-24 pb-16">
                <section className="container mx-auto px-4 max-w-4xl">
                    {/* Back link */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-8"
                    >
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </Link>
                    </motion.div>

                    {isLoading && <PostSkeleton />}

                    {isError && (
                        <div className="text-center py-20 space-y-4">
                            <h2 className="text-2xl font-semibold">Post not found</h2>
                            <p className="text-muted-foreground">
                                This post may have been removed or the URL is incorrect.
                            </p>
                            <Link
                                to="/blog"
                                className="inline-flex items-center gap-2 text-primary hover:underline"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Blog
                            </Link>
                        </div>
                    )}

                    {post && (
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Cover image */}
                            {post.cover_image_url && (
                                <div className="rounded-2xl overflow-hidden mb-8 max-h-[400px]">
                                    <img
                                        src={post.cover_image_url}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Title */}
                            <h1 className="text-4xl font-bold mb-4 leading-tight">
                                {post.title}
                            </h1>

                            {/* Meta row */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                                <span className="flex items-center gap-1.5">
                                    <User className="w-4 h-4" />
                                    {post.author_name}
                                </span>
                                <span>{format(new Date(post.published_at), "MMMM d, yyyy")}</span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {post.reading_time_minutes} min read
                                </span>
                                {post.category && (
                                    <Badge variant="outline">{post.category}</Badge>
                                )}
                            </div>

                            {/* Tags */}
                            {post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {post.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            {/* Content — sanitized with DOMPurify (also sanitized server-side) */}
                            <div
                                className="prose prose-lg dark:prose-invert max-w-3xl mx-auto"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
                            />
                        </motion.article>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default BlogPost;
