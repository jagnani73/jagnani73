import { useEffect } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { ROUTES } from "../utils/constants/shared-constants";

const NotFound: NextPage = () => {
  const { push } = useRouter();

  useEffect(() => {
    setTimeout(() => push(ROUTES.HOME), 5000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="section-container text-center pt-40 pb-60">
      <h1>4 · O · 4</h1>
      <h3>Looks like you are living the nomad life</h3>

      <Link href={ROUTES.HOME}>
        <a className="justify-center flex font-semibold text-2xl">
          here is a Home
        </a>
      </Link>
    </section>
  );
};

export default NotFound;
