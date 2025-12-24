import type { Metadata, NextPage } from "next";
import { notFound } from "next/navigation";
import { Project } from "@/components/shared";
import { projects } from "@/utils/constants/data";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

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
  params: Promise<{
    slug: string;
  }>;
}> = async ({ params }) => {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="px-10 lg:px-0 w-full lg:w-8/12 mx-auto mt-48">
      <Project primary={false} project={project} />
    </section>
  );
};

export default ProjectPage;
