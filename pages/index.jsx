import { builder, BuilderComponent } from "@builder.io/react";

builder.init(process.env.BUILDER_PUBLIC_KEY);

export async function getStaticProps() {
  const page = await builder
    .get("page", { url: "/" })
    .toPromise();

  return {
    props: {
      page: page || null,
    },
    revalidate: 5,
  };
}

export default function HomePage({ page }) {
  if (!page) return <div>404 - Page not found</div>;
  return <BuilderComponent model="page" content={page} />;
}
