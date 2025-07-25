import { builder, BuilderComponent } from "@builder.io/react";

builder.init(process.env.NEXT_PUBLIC_BUILDER_PUBLIC_KEY);
console.log("✅ ENV KEY:", process.env.NEXT_PUBLIC_BUILDER_PUBLIC_KEY);

export async function getStaticProps() {
  const page = await builder.get("page", { url: "/" }).promise();
  console.log("🌐 Builder Request URL: /");
  return {
    props: {
      page: page || null,
    },
  };
}

export default function HomePage({ page }) {
  if (!page) {
    return <div>404 - Page Not Found</div>;
  }

  return <BuilderComponent model="page" content={page} />;
}
