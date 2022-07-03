import { InlineWidget } from "react-calendly";

export const Contact: React.FC = () => {
  return (
    <section className="section-container mt-48">
      <h1>Lets Jabber</h1>
      <h3>All awkwardness aside</h3>

      <InlineWidget
        url="https://calendly.com/jagnani73/natter"
        styles={{
          minHeight: "content-fit",
          marginTop: "2.5rem",
          height: "756px",
        }}
      />
    </section>
  );
};

export default Contact;
