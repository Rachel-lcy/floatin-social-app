// pages/[...page].jsx 或 .tsx
import { builder, BuilderComponent, useIsPreviewing } from '@builder.io/react';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';

builder.init(process.env.NEXT_PUBLIC_BUILDER_PUBLIC_KEY);

export async function getStaticProps({ params }) {
  const pathSegments = params?.page || [];
  const urlPath = '/' + pathSegments.join('/');
  const page = await builder.get('page', {
    userAttributes: { urlPath },
  }).toPromise() || null;

  return {
    props: { page },
    revalidate: 5,
  };
}

export async function getStaticPaths() {
  const pages = await builder.getAll('page', {
    fields: 'data.url',
    options: { noTargeting: true },
  });
  console.log("Builder Request URL:", urlPath);

  return {
    paths: pages.map(p => p.data?.url || '/').filter(Boolean),
    fallback: true,
  };
}

export default function Page({ page }) {
  const router = useRouter();
  const isPreviewing = useIsPreviewing();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <BuilderComponent model="page" content={page} />
    </>
  );
}
