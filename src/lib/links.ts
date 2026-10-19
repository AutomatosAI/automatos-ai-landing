/* Outbound destinations used across the site. The live app host is still to be confirmed (REDESIGN-PLAN §6). */
import { ORGANIZATION } from "@/lib/seo/site";

export const SIGN_IN_URL = "https://ui.automatos.app/sign-in";
export const GITHUB_URL = "https://github.com/AutomatosAI/automatos-ai";
/* The company (Automatos AI) and its About material live on automatos.app (facts sheet 1).
   One host literal: the Organization node's url in src/lib/seo/site.ts. */
export const COMPANY_URL = ORGANIZATION.url;
/* The EU AI Act posture lives on the company site (REDESIGN-PLAN §10). */
export const EU_AI_ACT_URL = "https://automatos.app/eu-ai-act";
export const EU_AI_ACT_CHECKER_URL = "https://automatos.app/eu-ai-act/checker";
/* The one public contact route: the company contact form (facts sheet 8b). No personal phone or email on any site. */
export const CONTACT_URL = "https://automatos.app/contact";
