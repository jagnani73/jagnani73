import type { Metadata } from "next";
import { Contact } from "../../components/shared";

export const metadata: Metadata = {
  title: "Contact | Yashvardhan Jagnani",
  description: "Get in touch with Yashvardhan Jagnani",
};

export default function ContactPage() {
  return <Contact />;
}

