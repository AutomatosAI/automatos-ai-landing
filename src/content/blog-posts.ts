// Single source of truth for blog posts on the landing site.
// Add a new entry here whenever you publish a new blog page under src/pages/blog/.

export interface BlogPost {
    title: string;
    slug: string;
    excerpt: string;
    cover_image_url: string | null;
    tags: string[];
    author_name: string;
    published_at: string; // ISO date
    reading_time_minutes: number;
    category?: string;
}

export const BLOG_POSTS: BlogPost[] = [
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
