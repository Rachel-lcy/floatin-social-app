// import { builder } from '@builder.io/react';
// import { BuilderComponent } from '@builder.io/react';

// builder.init(process.env.NEXT_PUBLIC_BUILDER_PUBLIC_KEY);

// export async function getServerSideProps({ params }) {
//   let urlPath = '/';

//   if (Array.isArray(params?.page)) {
//     urlPath += params.page.join('/');
//   } else if (typeof params?.page === 'string') {
//     urlPath += params.page;
//   }

//   console.log('🌱 Builder Request URL:', urlPath);

//   const page = await builder.get('page', { url: urlPath }).promise();

//   console.log('🌿 Builder Page Result:', page);

//   return {
//     props: {
//       page: page || null,
//     },
//   };
// }

// export default function CatchAllPage({ page }) {
//   if (!page) {
//     return <h1>404 - Page Not Found</h1>;
//   }

//   return <BuilderComponent model="page" content={page} />;
// }
// pages/[[...page]].jsx
import { builder, BuilderComponent } from '@builder.io/react';


builder.init(process.env.NEXT_PUBLIC_BUILDER_PUBLIC_KEY);


export async function getStaticProps({ params, preview = false }) {
  const urlPath = '/' + (params?.page?.join('/') || '');

  const options = { url: urlPath };

  if (process.env.NODE_ENV !== 'production' || preview) {
    options.cache = false;
  }

  const page = await builder.get('page', options).toPromise();

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('🌐 Builder Request URL:', urlPath);
    // eslint-disable-next-line no-console
    console.log('🧩 Builder Page Found:', Boolean(page));
  }

  return {
    props: {
      page: page || null,
      urlPath,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default function BuilderCatchAllPage({ page }) {
  if (!page) {
    return <h1>404 – Page not found</h1>;
  }
  return <BuilderComponent model="page" content={page} />;
}
