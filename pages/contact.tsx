import { NextPage } from "next";
import Head from "next/head";

import { Contact } from "../components/shared";

const ContactPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contact | Yashvardhan Jagnani</title>
      </Head>

      <Contact />
    </>
  );
};

export default ContactPage;
