import type { Metadata, NextPage } from "next";
import { Contact } from "@/components/shared";

export const metadata: Metadata = {
  title: "Contact | Yashvardhan Jagnani",
  description: "Get in touch with Yashvardhan Jagnani",
};

const ContactPage: NextPage = () => {
  return <Contact />;
};

export default ContactPage;
