"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { useIsClient } from "../../hooks/useIsClient";

export const Breadcrumb = () => {
  const _pathname = usePathname();
  const pathname = _pathname?.split("/").filter(Boolean) ?? [];

  // avoid server-side rendering
  const isClient = useIsClient();

  if (!isClient) return;

  return (
    <nav aria-label="Breadcrumb" className="mx-4">
      <ul
        role="list"
        className="text-skin-secondary flex items-center gap-1 text-sm"
      >
        {pathname.map((item, index) => (
          <BreadcrumbItem
            key={index}
            item={item}
            index={index}
            pathname={pathname}
          />
        ))}
      </ul>
    </nav>
  );
};

const lengthId = (id: string): string => {
  return `${id.slice(0, 4)}...${id.slice(-4)}`;
};

type BreadcrumbItemProps = {
  item: string;
  index: number;
  pathname: string[];
};

const BreadcrumbItem = ({ item, index, pathname }: BreadcrumbItemProps) => {
  return (
    <Fragment key={item}>
      <li>
        <Link
          href={`/${pathname.slice(0, index + 1).join("/")}`}
          className="block text-xs text-muted-foreground transition hover:text-foreground"
        >
          {item.length > 15 ? lengthId(item) : item}
        </Link>
      </li>
      {index !== pathname.length - 1 && (
        <ChevronRight className="text-muted-foreground" size={16} />
      )}
    </Fragment>
  );
};
