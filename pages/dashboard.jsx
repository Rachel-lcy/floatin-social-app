
import { builder, BuilderComponent } from '@builder.io/react';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';


builder.init(process.env.NEXT_PUBLIC_BUILDER_PUBLIC_KEY);


export async function getStaticProps() {
  const page = await builder
    .get('page', {
      url: '/dashboard', //
    })
    .promise();

  return {
    props: {
      page: page || null,
    },
    revalidate: 5,
  };
}


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
