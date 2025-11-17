"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ROUTES } from "../utils/constants/shared-constants";
import { NextPage } from "next";

const NotFound: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => router.push(ROUTES.HOME), 5000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <section className="px-10 lg:px-0 w-full lg:w-10/12 mx-auto text-center pt-40 pb-60">
      <h1>4 · O · 4</h1>
      <h3>Looks like you are living the nomad life</h3>

      <Link
        href={ROUTES.HOME}
        className="justify-center flex font-semibold text-2xl"
      >
        here is a Home
      </Link>
    </section>
  );
};

export default NotFound;
