import Image from "next/image";
import Link from "next/link";
import { Social } from "@prisma/client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type Props = {
  social: Social;
  link: string;
};

const Icon: { [social in Social]: React.ReactElement } = {
  [Social.Telegram]: (
    <Image src="/telegram.webp" alt="Telegram" width={20} height={20} />
  ),
  [Social.Discord]: (
    <Image src="/discord.png" alt="Discord" width={20} height={20} />
  ),
  [Social.LinkedIn]: (
    <Image src="/linkedin.png" alt="LinkedIn" width={20} height={20} />
  ),
};

const SocialLink = ({ social, link }: Props) => {
  return (
    <Link
      href={link}
      className={cn(buttonVariants({ variant: "link" }), "flex gap-2")}
    >
      {Icon[social]}
      {link
        .replace("https://", "")
        .replace("www.", "")
        .replace("t.me/", "")
        .replace("linkedin.com/in/", "")
        .replace("/", "")}
    </Link>
  );
};

export default SocialLink;
