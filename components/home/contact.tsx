import { InlineWidget } from "react-calendly";

export const Contact: React.FC = () => {
  return (
    <section className="section-container">
      <h1>Lets Jabber</h1>
      <h3>Some random line for spacing</h3>

      <InlineWidget
        url="https://calendly.com/jagnani73/natter"
        styles={{
          minHeight: "content-fit",
          height: "756px",
        }}
      />
    </section>
  );
};

export default Contact;
