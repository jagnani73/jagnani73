import { PERSON } from "@/content/home";
import { SectionHead } from "@/components/shared/section-head";

export const Person = () => (
  <section>
    <SectionHead
      source="page"
      id="person"
      n="03"
      title="THE PERSON"
      note="education · contact"
    />
    <div className="grid grid-cols-1 gap-[22px] px-4 pb-[26px] pt-[22px] rail:grid-cols-[1.4fr_1fr] rail:gap-10 rail:px-11 rail:pb-10 rail:pt-[34px]">
      <div>
        <p className="m-0 font-serif text-[22px] italic leading-[1.4] text-tx2 rail:text-[31px]">
          &quot;{PERSON.quote.pre}
          <span className="text-tx">{PERSON.quote.emphasis}</span>&quot;
        </p>
        <p className="mt-[22px] font-mono text-[13.5px] leading-loose text-tx3">
          {PERSON.education}
          <br />
          <span className="text-acc">{PERSON.cgpa}</span>
          <span className="text-tx2">{PERSON.cgpaNote}</span>
          <br />
          NEXT — <span className="text-sig">{PERSON.next}</span>
          <br />
          {PERSON.beyond}
        </p>
      </div>

      <div className="font-mono text-[13px] leading-[2.4] text-tx2 rail:text-right mt-auto">
        {PERSON.links.map((l) => (
          <span key={l.href} className="block">
            <a
              href={l.href}
              {...(l.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="transition-colors hover:text-sig"
            >
              {l.label}
            </a>
          </span>
        ))}
        <span className="block">
          <a
            href={PERSON.resume.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-sig"
          >
            {PERSON.resume.label}
          </a>
        </span>
      </div>
    </div>
  </section>
);
