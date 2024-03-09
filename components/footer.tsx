import { siteConfig } from "@/config/site";

const Footer = () => {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Сайт сделал{" "}
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            @envyvox
          </a>
          . Исходный код доступен на{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          . Вы можете поддержать меня через{" "}
          <a
            href={siteConfig.links.buymeacoffee}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Buy Me a Coffee
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
