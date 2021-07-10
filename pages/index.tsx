import Head from "next/head";

import * as IndexComponents from "../components/index";

const IndexPage = () => {
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://assets.calendly.com/assets/external/widget.js"
          async
        />
      </Head>

      <IndexComponents.Home />
      <IndexComponents.About />
      <IndexComponents.Stack />
      <IndexComponents.Work />
      <IndexComponents.Projects />
      {/* <IndexComponents.Contact /> */}
    </>
  );
};

export default IndexPage;
