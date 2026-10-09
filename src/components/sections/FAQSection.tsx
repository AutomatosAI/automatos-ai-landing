import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { HOME_FAQS } from "./faqs";
import { SectionEyebrow } from "./SectionEyebrow";

/* Single-open accordion; the first answer starts open. */
export const FAQSection = () => (
  <section id="faq" className="border-t border-border">
    <div className="mx-auto grid max-w-[1280px] items-start gap-14 px-4 py-24 sm:px-8 lg:grid-cols-2">
      <div className="flex flex-col gap-[18px] lg:sticky lg:top-24">
        <SectionEyebrow n="06" label="Questions" />
        <h2 className="m-0 text-4xl font-medium leading-[1.05] sm:text-5xl">
          Straight answers, <em className="font-normal">before you sign up.</em>
        </h2>
        <a
          href="#waitlist"
          className="self-start rounded-full bg-primary px-[22px] py-[13px] text-[15px] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Join the waitlist →
        </a>
      </div>

      <AccordionPrimitive.Root type="single" collapsible defaultValue="faq-0" className="flex flex-col gap-2.5">
        {HOME_FAQS.map((faq, i) => (
          <AccordionPrimitive.Item
            key={faq.question}
            value={`faq-${i}`}
            className="rounded-[14px] border border-border bg-card data-[state=open]:border-foreground"
          >
            <AccordionPrimitive.Header>
              <AccordionPrimitive.Trigger className="group flex w-full justify-between gap-4 px-[22px] py-5 text-left text-base font-medium text-foreground">
                {faq.question}
                <span className="text-muted-foreground group-data-[state=open]:hidden" aria-hidden>
                  +
                </span>
                <span className="hidden text-muted-foreground group-data-[state=open]:inline" aria-hidden>
                  −
                </span>
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down motion-reduce:animate-none">
              <p className="m-0 px-[22px] pb-5 text-[15px] leading-relaxed text-muted-foreground">{faq.answer}</p>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        ))}
      </AccordionPrimitive.Root>
    </div>
  </section>
);
