import type { Metadata, NextPage } from "next";
import { Experiences } from "@/components/experiences";
import { experiences } from "@/utils/constants/data";

export const metadata: Metadata = {
  title: "Experiences | Yashvardhan Jagnani",
  description:
    "Explore the professional experiences and journey of Yashvardhan Jagnani",
};

const ExperiencesPage: NextPage = () => {
  return <Experiences experiences={experiences} />;
};

export default ExperiencesPage;
