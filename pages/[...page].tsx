import { builder, BuilderComponent } from "@builder.io/react";
import { GetStaticPropsContext } from "next";

builder.init(process.env.BUILDER_PUBLIC_KEY!);
console.log(process.env.BUILDER_PUBLIC_KEY);

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const urlPath = "/" + (params?.page?.join("/") || "");
  const page = await builder.get("page", { url: urlPath }).promise();

  return { props: { page } };
}

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export default function Page({ page }: any) {
  return <BuilderComponent model="page" content={page} />;
}
