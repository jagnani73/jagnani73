import type { Metadata, NextPage } from "next";
import { Projects } from "@/components/projects";
import { projects } from "@/utils/constants/data";

export const metadata: Metadata = {
  title: "Projects | Yashvardhan Jagnani",
  description: "Explore the projects and creations of Yashvardhan Jagnani",
};

const ProjectsPage: NextPage = () => {
  return <Projects projects={projects.reverse()} />;
};

export default ProjectsPage;
