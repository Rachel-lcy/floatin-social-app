import { builder, BuilderComponent } from "@builder.io/react";

builder.init(process.env.NEXT_PUBLIC_BUILDER_PUBLIC_KEY);

export async function getStaticProps({ params }) {
  let urlPath = "/";

  if (Array.isArray(params?.page)) {
    urlPath += params.page.join("/");
  } else if (typeof params?.page === "string") {
    urlPath += params.page;
  }

  const page = await builder.get("page", { url: urlPath }).promise();

  return {
    props: {
      page: page || null,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default function Page({ page }) {
  if (!page) {
    return <div>404 - Page Not Found</div>;
  }

  return <BuilderComponent model="page" content={page} />;
}
