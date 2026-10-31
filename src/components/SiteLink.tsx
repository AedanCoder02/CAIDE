import Link from "next/link";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; home?: boolean };

/**
 * Section anchors ("#work") stay plain on the home page so Lenis handles the
 * scroll. Off the home page they become basePath-aware links back to "/#work".
 */
export default function SiteLink({ href, home = true, children, ...rest }: Props) {
  if (href.startsWith("#") && home) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href.startsWith("#") ? `/${href}` : href} {...rest}>
      {children}
    </Link>
  );
}
