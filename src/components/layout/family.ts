/**
 * The Automatos AI family: the same four sites, in the same order, in a row at
 * the foot of every Automatos site (Gerard, 19 Oct 2026).
 */
import { ORGANIZATION, SITE } from "@/lib/seo/site";

export const FAMILY_LABEL = "The Automatos AI family";

/**
 * The company and Studio hosts come from the SEO constants, so FamilyRow's
 * aria-current check and the Organization node each read one literal.
 */
export const FAMILY_SITES = [
  { name: "Automatos AI", href: ORGANIZATION.url },
  { name: "Automatos Studio", href: SITE.url },
  { name: "Automatos Academy", href: "https://academy.automatos.app" },
  { name: "Automatos Markets", href: "https://markets.automatos.app" },
] as const;
