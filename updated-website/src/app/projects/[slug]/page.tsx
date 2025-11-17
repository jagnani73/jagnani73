import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectComponent } from "../../../components/projects";
import { projects } from "../../../../data";

// Generate static params for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for each project
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

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectComponent {...project} />;
}

