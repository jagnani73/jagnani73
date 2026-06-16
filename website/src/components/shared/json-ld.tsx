// `<` is escaped so a string value can't break out of the <script>. Server
// component — the markup ships in the initial HTML for crawlers.
export const JsonLd = ({ data }: { data: object | object[] }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    }}
  />
);
