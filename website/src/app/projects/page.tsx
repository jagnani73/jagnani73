import type { Metadata } from "next";
import { Projects } from "../../components/projects";
import { projects } from "../../../data";

export const metadata: Metadata = {
  title: "Projects | Yashvardhan Jagnani",
  description: "Explore the projects and creations of Yashvardhan Jagnani",
};

export default function ProjectsPage() {
  return <Projects projects={projects.reverse()} />;
}

