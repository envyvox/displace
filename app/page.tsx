import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import TypographyH1 from "@/components/typography/h1";

export default function Home() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center space-y-12">
      <TypographyH1>Displace</TypographyH1>
      <Link
        className={buttonVariants({ variant: "default" })}
        href="/dashboard"
      >
        Присоединиться
      </Link>
    </main>
  );
}
