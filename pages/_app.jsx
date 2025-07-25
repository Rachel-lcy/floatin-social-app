
import { ClerkProvider } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      navigate={(to) => window.history.pushState(null, '', to)}
    >
      <Component {...pageProps} key={pathname} />
    </ClerkProvider>
  );
}
