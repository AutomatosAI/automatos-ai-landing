import { SITE } from "@/lib/seo/site";
import { FAMILY_LABEL, FAMILY_SITES } from "./family";

const LABEL_ID = "footer-family-label";

/**
 * The family row at the foot of the footer. This site's own entry is shown as
 * text marked aria-current="page", not as a link to itself.
 */
export const FamilyRow = () => (
  <nav
    aria-labelledby={LABEL_ID}
    className="mt-6 flex flex-col sm:flex-row items-center gap-x-6 gap-y-2 text-sm"
  >
    <p id={LABEL_ID} className="font-semibold">
      {FAMILY_LABEL}
    </p>
    <ul className="flex flex-wrap justify-center sm:justify-start gap-x-5 gap-y-2">
      {FAMILY_SITES.map((site) => (
        <li key={site.href}>
          {site.href === SITE.url ? (
            <span aria-current="page" className="font-medium text-foreground">
              {site.name}
            </span>
          ) : (
            <a href={site.href} className="text-muted-foreground hover:text-foreground transition-colors">
              {site.name}
            </a>
          )}
        </li>
      ))}
    </ul>
  </nav>
);
