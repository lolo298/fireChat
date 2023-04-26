import Link, { LinkProps } from "next/link";

export function SidebarLink({ children, ...props }: customLinkProps) {
  return <Link {...props}>{children}</Link>;
}

interface customLinkProps extends LinkProps {
  children: string;
}
