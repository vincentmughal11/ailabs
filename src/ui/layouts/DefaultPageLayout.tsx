"use client";
/*
 * Documentation:
 * Default Page Layout — https://app.subframe.com/c0ba55092608/library?component=Default+Page+Layout_a57b1c43-310a-493f-b807-8cc88e2452cf
 * Sidebar rail with icons — https://app.subframe.com/c0ba55092608/library?component=Sidebar+rail+with+icons_0d7efe0e-8762-46f5-b399-9f6d329e13b9
 */

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { FeatherBarChart2 } from "@subframe/core";
import { FeatherBook } from "@subframe/core";
import { FeatherHome } from "@subframe/core";
import { FeatherSend } from "@subframe/core";
import { SidebarRailWithIcons } from "../components/SidebarRailWithIcons";
import * as SubframeUtils from "../utils";

interface DefaultPageLayoutRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const DefaultPageLayoutRoot = React.forwardRef<
  HTMLDivElement,
  DefaultPageLayoutRootProps
>(function DefaultPageLayoutRoot(
  { children, className, ...otherProps }: DefaultPageLayoutRootProps,
  ref
) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-screen w-full items-start",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <SidebarRailWithIcons
        header={
          <div className="flex flex-col items-center justify-center gap-2 px-1 py-1">
            <img
              className="h-6 w-6 flex-none object-cover"
              src="https://res.cloudinary.com/subframe/image/upload/v1711417511/shared/t4qorgih4yjwudzjfkxq.png"
            />
          </div>
        }
        footer={
          <SidebarRailWithIcons.NavItem icon={<FeatherSend />}>
            Share
          </SidebarRailWithIcons.NavItem>
        }
      >
        <SidebarRailWithIcons.NavItem 
          icon={<FeatherHome />} 
          selected={pathname === "/"}
          onClick={() => handleNavigation("/")}
        >
          Home
        </SidebarRailWithIcons.NavItem>
        <SidebarRailWithIcons.NavItem 
          icon={<FeatherBook />}
          selected={pathname === "/stories"}
          onClick={() => handleNavigation("/stories")}
        >
          Stories
        </SidebarRailWithIcons.NavItem>
        <SidebarRailWithIcons.NavItem 
          icon={<FeatherBarChart2 />}
          selected={pathname === "/leaderboard"}
          onClick={() => handleNavigation("/leaderboard")}
        >
          Leaderboard
        </SidebarRailWithIcons.NavItem>
      </SidebarRailWithIcons>
      {children ? (
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 self-stretch overflow-y-auto bg-default-background">
          {children}
        </div>
      ) : null}
    </div>
  );
});

export const DefaultPageLayout = DefaultPageLayoutRoot;
