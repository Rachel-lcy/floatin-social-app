import { builder, BuilderComponent } from "@builder.io/react";

builder.init(process.env.NEXT_PUBLIC_BUILDER_PUBLIC_KEY);

export async function getStaticProps() {
  const page = await builder.get("page", { url: "/" }).promise();
  return {
    props: {
      page: page || null,
    },
  };
}

export default function Home({ page }) {
  return (
    <>
      {page ? (
        <BuilderComponent model="page" content={page} />
      ) : (
        <h1>404 - Page Not Found</h1>
      )}
    </>
  );
}
