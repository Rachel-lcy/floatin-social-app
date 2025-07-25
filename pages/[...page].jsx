import { builder } from '@builder.io/react';
import { BuilderComponent } from '@builder.io/react';

builder.init(process.env.NEXT_PUBLIC_BUILDER_PUBLIC_KEY);

export async function getServerSideProps({ params }) {
  let urlPath = '/';

  if (Array.isArray(params?.page)) {
    urlPath += params.page.join('/');
  } else if (typeof params?.page === 'string') {
    urlPath += params.page;
  }

  console.log('🌱 Builder Request URL:', urlPath);

  const page = await builder.get('page', { url: urlPath }).promise();

  console.log('🌿 Builder Page Result:', page);

  return {
    props: {
      page: page || null,
    },
  };
}

export default function CatchAllPage({ page }) {
  if (!page) {
    return <h1>404 - Page Not Found</h1>;
  }

  return <BuilderComponent model="page" content={page} />;
}
