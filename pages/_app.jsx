import { ClerkProvider } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      navigate={(to) => router.push(to)}
    >
      <Component {...pageProps} key={router.pathname} />
    </ClerkProvider>
  );
}