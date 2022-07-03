import { useEffect } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { ROUTES } from "../utils/constants/shared-constants";

const ServerError: NextPage = () => {
  const { push } = useRouter();

  useEffect(() => {
    setTimeout(() => push(ROUTES.HOME), 5000);
  }, []);

  return (
    <section className="section-container text-center pt-40 pb-60">
      <h1>5 · O · O</h1>
      <h3>Looks like there was a downsizing</h3>

      <Link href={ROUTES.HOME}>
        <a className="justify-center flex font-semibold text-2xl">
          here is a Home
        </a>
      </Link>
    </section>
  );
};

export default ServerError;
