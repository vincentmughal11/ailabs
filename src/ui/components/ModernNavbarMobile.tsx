"use client";
/*
 * Documentation:
 * Button — https://app.subframe.com/c0ba55092608/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 * Icon Button — https://app.subframe.com/c0ba55092608/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 * Modern navbar mobile — https://app.subframe.com/c0ba55092608/library?component=Modern+navbar+mobile_2aee7939-9e79-4bd2-806c-ccf3dcdc90ce
 */

import React from "react";
import { FeatherMenu } from "@subframe/core";
import * as SubframeUtils from "../utils";
import { Button } from "./Button";
import { IconButton } from "./IconButton";

interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const NavItem = React.forwardRef<HTMLDivElement, NavItemProps>(function NavItem(
  { children, className, ...otherProps }: NavItemProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/02bfa066 flex h-12 cursor-pointer flex-col items-center justify-center gap-4 px-4",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {children ? (
        <span className="text-body-bold font-body-bold text-subtext-color group-hover/02bfa066:text-default-font">
          {children}
        </span>
      ) : null}
    </div>
  );
});

interface ModernNavbarMobileRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const ModernNavbarMobileRoot = React.forwardRef<
  HTMLDivElement,
  ModernNavbarMobileRootProps
>(function ModernNavbarMobileRoot(
  { className, ...otherProps }: ModernNavbarMobileRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full max-w-[1024px] flex-wrap items-center gap-4 rounded-md border border-solid border-neutral-border bg-default-background shadow-md",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex h-12 flex-col items-start justify-center gap-2 px-4">
        <img
          className="h-4 flex-none object-cover"
          src="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/y2rsnhq3mex4auk54aye.png"
        />
      </div>
      <div className="flex grow shrink-0 basis-0 items-center justify-end gap-2">
        <Button variant="brand-secondary">Log in</Button>
        <Button>Sign up</Button>
      </div>
      <div className="flex flex-wrap items-center gap-4 pr-4">
        <IconButton icon={<FeatherMenu />} />
      </div>
    </div>
  );
});

export const ModernNavbarMobile = Object.assign(ModernNavbarMobileRoot, {
  NavItem,
});
