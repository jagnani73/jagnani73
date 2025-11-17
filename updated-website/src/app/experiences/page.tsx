import type { Metadata } from "next";
import { Experiences } from "../../components/experiences";
import { experiences } from "../../../data";

export const metadata: Metadata = {
  title: "Experiences | Yashvardhan Jagnani",
  description:
    "Explore the professional experiences and journey of Yashvardhan Jagnani",
};

export default function ExperiencesPage() {
  return <Experiences experiences={experiences.reverse()} />;
}
