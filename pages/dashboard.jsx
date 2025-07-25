import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { BuilderComponent, builder } from "@builder.io/react";

builder.init(process.env.NEXT_PUBLIC_BUILDER_PUBLIC_KEY);

export default function DashboardPage({ page }) {
  if (!page) {
    return <h1>404 - Dashboard Page Not Found</h1>;
  }

  return (
    <>
      <SignedIn>
        <BuilderComponent model="page" content={page} />
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn redirectUrl="/dashboard" />
      </SignedOut>
    </>
  );
}


export async function getServerSideProps(context) {
  const page = await builder.get("page", {
    userAttributes: {
      urlPath: "/dashboard",
    },
  });

  return {
    props: {
      page: page || null,
    },
  };
}
