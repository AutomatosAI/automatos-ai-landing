import { SITE } from "@/lib/seo/site";
import { FAMILY_LABEL, FAMILY_SITES } from "./family";

const LABEL_ID = "footer-family-label";

/**
 * The family row at the foot of the footer. This site's own entry is shown as
 * text marked aria-current="page", not as a link to itself.
 *
 * Layout: stacked and centred below lg; one row from lg (1024px) up, where the
 * footer's content box (960px) fits the label and all four entries. The label
 * never shrinks or wraps; only the list wraps.
 */
export const FamilyRow = () => (
  <nav
    aria-labelledby={LABEL_ID}
    className="mt-6 flex flex-col lg:flex-row items-center gap-x-6 gap-y-2 text-sm"
  >
    <p id={LABEL_ID} className="font-semibold shrink-0 whitespace-nowrap">
      {FAMILY_LABEL}
    </p>
    <ul className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2">
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
