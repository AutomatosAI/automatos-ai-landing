import { useEffect, useRef } from "react";

declare global {
    interface Window {
        AutomatosWidget?: {
            init: (config: AutomatosInitConfig) => AutomatosInstance;
        };
    }
}

interface AutomatosInitConfig {
    apiKey: string;
    widget: "chat" | "blog";
    position?: "bottom-right" | "bottom-left";
    theme?: "light" | "dark";
    title?: string;
    greeting?: string;
    agentId?: string;
    containerSelector?: string;
    blogConfig?: {
        layout?: "grid" | "list" | "featured" | "minimal";
        postsPerPage?: number;
        category?: string;
    };
    themeOverrides?: Record<string, string>;
}

interface AutomatosInstance {
    destroy: () => void;
}

const PUBLIC_KEY = import.meta.env.VITE_AUTOMATOS_PUBLIC_KEY as string | undefined;
const CHAT_AGENT_ID = import.meta.env.VITE_AUTOMATOS_CHAT_AGENT_ID as string | undefined;

/**
 * Mounts the Automatos chat widget globally.
 *
 * The script tag itself lives in index.html so it's only fetched once;
 * this component just calls `AutomatosWidget.init` after mount and tears
 * down on unmount. Render once near the root (e.g. in App.tsx) so chat
 * appears on every route.
 */
export function AutomatosChat() {
    const instanceRef = useRef<AutomatosInstance | null>(null);

    useEffect(() => {
        if (!PUBLIC_KEY) {
            console.warn(
                "[AutomatosChat] VITE_AUTOMATOS_PUBLIC_KEY missing — chat widget disabled."
            );
            return;
        }

        let cancelled = false;

        const tryInit = () => {
            if (cancelled) return;
            if (!window.AutomatosWidget) {
                window.setTimeout(tryInit, 100);
                return;
            }

            instanceRef.current = window.AutomatosWidget.init({
                apiKey: PUBLIC_KEY,
                widget: "chat",
                position: "bottom-right",
                theme: "dark",
                title: "Auto",
                greeting:
                    "Hi! I'm Auto — ask me anything about Automatos, our agents, or the platform.",
                ...(CHAT_AGENT_ID ? { agentId: CHAT_AGENT_ID } : {}),
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
            instanceRef.current?.destroy();
            instanceRef.current = null;
        };
    }, []);

    return null;
}
