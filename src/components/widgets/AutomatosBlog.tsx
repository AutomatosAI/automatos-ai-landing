import { useEffect, useRef } from "react";

interface AutomatosBlogProps {
    layout?: "grid" | "list" | "featured" | "minimal";
    postsPerPage?: number;
    category?: string;
    className?: string;
}

const PUBLIC_KEY = import.meta.env.VITE_AUTOMATOS_PUBLIC_KEY as string | undefined;

let containerCounter = 0;

/**
 * Renders the Automatos blog widget into an isolated Shadow-DOM host.
 *
 * The SDK script tag is loaded once globally in index.html. This component
 * polls for the global, then calls `AutomatosWidget.init` with a unique
 * containerSelector. Pass the same props as a Shopify theme block —
 * layout/postsPerPage/category — to get a consistent embed across hosts.
 */
export function AutomatosBlog({
    layout = "grid",
    postsPerPage = 6,
    category,
    className,
}: AutomatosBlogProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const idRef = useRef<string>(`automatos-blog-${++containerCounter}`);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        if (!PUBLIC_KEY) {
            console.warn(
                "[AutomatosBlog] VITE_AUTOMATOS_PUBLIC_KEY missing — blog widget disabled."
            );
            return;
        }

        container.id = idRef.current;
        let cancelled = false;
        let instance: { destroy: () => void } | null = null;

        const tryInit = () => {
            if (cancelled) return;
            if (!window.AutomatosWidget) {
                window.setTimeout(tryInit, 100);
                return;
            }

            instance = window.AutomatosWidget.init({
                apiKey: PUBLIC_KEY,
                widget: "blog",
                containerSelector: `#${idRef.current}`,
                theme: "dark",
                blogConfig: {
                    layout,
                    postsPerPage,
                    category,
                },
                themeOverrides: {
                    "--aw-primary": "#FF4500",
                    "--aw-primary-hover": "#E63E00",
                    "--aw-bg": "#0F0F0F",
                    "--aw-bg-secondary": "#1A1A1A",
                    "--aw-text": "#F5F5F5",
                    "--aw-text-secondary": "#A0A0A0",
                    "--aw-border": "#2A2A2A",
                },
            });
        };

        tryInit();

        return () => {
            cancelled = true;
            instance?.destroy();
        };
    }, [layout, postsPerPage, category]);

    return <div ref={containerRef} className={className} />;
}
