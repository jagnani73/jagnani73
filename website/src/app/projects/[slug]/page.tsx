import type { Metadata, NextPage } from "next";
import { notFound } from "next/navigation";
import { ProjectComponent } from "@/components/projects";
import { projects } from "@/utils/constants/data";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.name} | Yashvardhan Jagnani`,
    description: project.description,
    openGraph: {
      title: `${project.name} | Yashvardhan Jagnani`,
      description: project.description,
      images: [project.preview],
    },
  };
}

const ProjectPage: NextPage<{
  params: {
    slug: string;
  };
}> = ({ params }) => {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectComponent {...project} />;
};

export default ProjectPage;
