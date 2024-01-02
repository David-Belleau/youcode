"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { useIsClient } from "../../hooks/useIsClient";

export const Breadcrumb = () => {
  const _pathname = usePathname();
  const pathname = _pathname?.split("/").filter(Boolean) ?? [];

  const isClient = useIsClient();

  // avoid server-side rendering
  if (!isClient) return;

  return (
    <nav aria-label="Breadcrumb" className="mx-4">
      <ol
        role="list"
        className="text-skin-secondary flex items-center gap-1 text-sm"
      >
        {pathname.map((item, index) => (
          <Fragment key={item}>
            <li>
              <Link
                href={`/${pathname.slice(0, index + 1).join("/")}`}
                className="block text-xs text-muted-foreground transition hover:text-foreground"
              >
                {item}
              </Link>
            </li>
            {index !== pathname.length - 1 && (
              <ChevronRight className="text-muted-foreground" size={16} />
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
};
