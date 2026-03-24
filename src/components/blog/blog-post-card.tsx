import { motion } from "framer-motion";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogPostCardProps {
    title: string;
    slug: string;
    excerpt: string;
    coverImageUrl: string | null;
    tags: string[];
    authorName: string;
    publishedAt: string;
    readingTimeMinutes: number;
    onClick: (slug: string) => void;
}

export const BlogPostCard = ({
    title,
    slug,
    excerpt,
    coverImageUrl,
    tags,
    authorName,
    publishedAt,
    readingTimeMinutes,
    onClick,
}: BlogPostCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            <Card
                className="cursor-pointer overflow-hidden border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300 h-full"
                onClick={() => onClick(slug)}
            >
                {/* Cover image */}
                <div className="aspect-[16/9] overflow-hidden rounded-t-xl">
                    {coverImageUrl ? (
                        <img
                            src={coverImageUrl}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-muted" />
                    )}
                </div>

                <CardContent className="p-5 flex flex-col gap-3">
                    {/* Title */}
                    <h3 className="text-xl font-semibold line-clamp-2 leading-snug">
                        {title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                        {excerpt}
                    </p>

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {/* Meta row */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50 mt-auto">
                        <span>{authorName}</span>
                        <div className="flex items-center gap-3">
                            <span>{format(new Date(publishedAt), "MMM d, yyyy")}</span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {readingTimeMinutes} min
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};
