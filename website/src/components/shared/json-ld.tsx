// Renders one or more JSON-LD blobs. `<` is escaped to < so a string value
// can never break out of the <script> with a stray </script>. Server component —
// the markup ships in the initial HTML for crawlers.
export const JsonLd = ({ data }: { data: object | object[] }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    }}
  />
);
