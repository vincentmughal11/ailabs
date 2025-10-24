"use client";

import React from "react";
import { Button } from "@/ui/components/Button";
import { IconButton } from "@/ui/components/IconButton";
import { LinkButton } from "@/ui/components/LinkButton";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { FeatherHeart } from "@subframe/core";
import { FeatherRocket } from "@subframe/core";
import { FeatherUser } from "@subframe/core";
import { FeatherZap } from "@subframe/core";

function Stories() {
  return (
    <DefaultPageLayout>
      <div className="container max-w-none flex h-full w-full flex-col items-start gap-6 bg-default-background py-12">
        <div className="flex w-full flex-col items-start gap-2">
          <div className="flex w-full flex-wrap items-center gap-2">
            <div className="flex grow shrink-0 basis-0 items-center gap-2">
              <FeatherRocket className="text-heading-2 font-heading-2 text-brand-600" />
              <span className="text-heading-2 font-heading-2 text-default-font">
                Pre-made stories
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="neutral-secondary"
                icon={<FeatherZap />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Suggest
              </Button>
              <IconButton
                variant="brand-primary"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
            </div>
          </div>
          <div className="flex w-full flex-wrap items-center gap-2">
            <LinkButton
              size="small"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Crafted by the staff
            </LinkButton>
            <span className="text-caption font-caption text-neutral-border">
              |
            </span>
            <LinkButton
              size="small"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              12 stories
            </LinkButton>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-start gap-4">
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
              <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2">
                <span className="text-body-bold font-body-bold text-default-font">
                  How do I change the theme of my UI?
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  I would like to update the colors, text, and look and feel of
                  my interface to something else using a theme. I was wondering
                  where I go to find more themes.
                </span>
              </div>
              <div className="flex w-full grow shrink-0 basis-0 items-start gap-4">
                <span className="text-caption font-caption text-subtext-color">
                  1 month ago
                </span>
                <div className="flex items-center gap-1">
                  <FeatherUser className="text-caption font-caption text-subtext-color" />
                  <span className="text-caption font-caption text-subtext-color">
                    253
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FeatherHeart className="text-caption font-caption text-subtext-color" />
                  <span className="text-caption font-caption text-subtext-color">
                    4
                  </span>
                </div>
              </div>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
              <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2">
                <span className="text-body-bold font-body-bold text-default-font">
                  How do I change the theme of my UI?
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  I would like to update the colors, text, and look and feel of
                  my interface to something else using a theme. I was wondering
                  where I go to find more themes.
                </span>
              </div>
              <div className="flex w-full grow shrink-0 basis-0 items-start gap-4">
                <span className="text-caption font-caption text-subtext-color">
                  1 month ago
                </span>
                <div className="flex items-center gap-1">
                  <FeatherUser className="text-caption font-caption text-subtext-color" />
                  <span className="text-caption font-caption text-subtext-color">
                    253
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FeatherHeart className="text-caption font-caption text-subtext-color" />
                  <span className="text-caption font-caption text-subtext-color">
                    4
                  </span>
                </div>
              </div>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
              <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2">
                <span className="text-body-bold font-body-bold text-default-font">
                  What is the best way to manage state in React?
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  I&#39;m a beginner with React and I&#39;m confused about state
                  management. Should I use context, Redux, or something else?
                </span>
              </div>
              <div className="flex w-full grow shrink-0 basis-0 items-start gap-4">
                <span className="text-caption font-caption text-subtext-color">
                  3 days ago
                </span>
                <div className="flex items-center gap-1">
                  <FeatherUser className="text-caption font-caption text-subtext-color" />
                  <span className="text-caption font-caption text-subtext-color">
                    143
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FeatherHeart className="text-caption font-caption text-subtext-color" />
                  <span className="text-caption font-caption text-subtext-color">
                    6
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
              <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2">
                <span className="text-body-bold font-body-bold text-default-font">
                  How do I change the theme of my UI?
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  I would like to update the colors, text, and look and feel of
                  my interface to something else using a theme. I was wondering
                  where I go to find more themes.
                </span>
              </div>
              <div className="flex w-full grow shrink-0 basis-0 items-start gap-4">
                <span className="text-caption font-caption text-subtext-color">
                  1 month ago
                </span>
                <div className="flex items-center gap-1">
                  <FeatherUser className="text-caption font-caption text-subtext-color" />
                  <span className="text-caption font-caption text-subtext-color">
                    253
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FeatherHeart className="text-caption font-caption text-subtext-color" />
                  <span className="text-caption font-caption text-subtext-color">
                    4
                  </span>
                </div>
              </div>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
              <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2">
                <span className="text-body-bold font-body-bold text-default-font">
                  How do I change the theme of my UI?
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  I would like to update the colors, text, and look and feel of
                  my interface to something else using a theme. I was wondering
                  where I go to find more themes.
                </span>
              </div>
              <div className="flex w-full grow shrink-0 basis-0 items-start gap-4">
                <span className="text-caption font-caption text-subtext-color">
                  1 month ago
                </span>
                <div className="flex items-center gap-1">
                  <FeatherUser className="text-caption font-caption text-subtext-color" />
                  <span className="text-caption font-caption text-subtext-color">
                    253
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FeatherHeart className="text-caption font-caption text-subtext-color" />
                  <span className="text-caption font-caption text-subtext-color">
                    4
                  </span>
                </div>
              </div>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
              <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2">
                <span className="text-body-bold font-body-bold text-default-font">
                  What is the best way to manage state in React?
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  I&#39;m a beginner with React and I&#39;m confused about state
                  management. Should I use context, Redux, or something else?
                </span>
              </div>
              <div className="flex w-full grow shrink-0 basis-0 items-start gap-4">
                <span className="text-caption font-caption text-subtext-color">
                  3 days ago
                </span>
                <div className="flex items-center gap-1">
                  <FeatherUser className="text-caption font-caption text-subtext-color" />
                  <span className="text-caption font-caption text-subtext-color">
                    143
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FeatherHeart className="text-caption font-caption text-subtext-color" />
                  <span className="text-caption font-caption text-subtext-color">
                    6
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
              <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2">
                <span className="text-body-bold font-body-bold text-default-font">
                  How do I change the theme of my UI?
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  I would like to update the colors, text, and look and feel of
                  my interface to something else using a theme. I was wondering
                  where I go to find more themes.
                </span>
              </div>
              <div className="flex w-full grow shrink-0 basis-0 items-start gap-4">
                <span className="text-caption font-caption text-subtext-color">
                  1 month ago
                </span>
                <div className="flex items-center gap-1">
                  <FeatherUser className="text-caption font-caption text-subtext-color" />
                  <span className="text-caption font-caption text-subtext-color">
                    253
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FeatherHeart className="text-caption font-caption text-subtext-color" />
                  <span className="text-caption font-caption text-subtext-color">
                    4
                  </span>
                </div>
              </div>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
              <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2">
                <span className="text-body-bold font-body-bold text-default-font">
                  How do I change the theme of my UI?
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  I would like to update the colors, text, and look and feel of
                  my interface to something else using a theme. I was wondering
                  where I go to find more themes.
                </span>
              </div>
              <div className="flex w-full grow shrink-0 basis-0 items-start gap-4">
                <span className="text-caption font-caption text-subtext-color">
                  1 month ago
                </span>
                <div className="flex items-center gap-1">
                  <FeatherUser className="text-caption font-caption text-subtext-color" />
                  <span className="text-caption font-caption text-subtext-color">
                    253
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FeatherHeart className="text-caption font-caption text-subtext-color" />
                  <span className="text-caption font-caption text-subtext-color">
                    4
                  </span>
                </div>
              </div>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
              <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2">
                <span className="text-body-bold font-body-bold text-default-font">
                  What is the best way to manage state in React?
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  I&#39;m a beginner with React and I&#39;m confused about state
                  management. Should I use context, Redux, or something else?
                </span>
              </div>
              <div className="flex w-full grow shrink-0 basis-0 items-start gap-4">
                <span className="text-caption font-caption text-subtext-color">
                  3 days ago
                </span>
                <div className="flex items-center gap-1">
                  <FeatherUser className="text-caption font-caption text-subtext-color" />
                  <span className="text-caption font-caption text-subtext-color">
                    143
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FeatherHeart className="text-caption font-caption text-subtext-color" />
                  <span className="text-caption font-caption text-subtext-color">
                    6
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
              <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2">
                <span className="text-body-bold font-body-bold text-default-font">
                  How do I change the theme of my UI?
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  I would like to update the colors, text, and look and feel of
                  my interface to something else using a theme. I was wondering
                  where I go to find more themes.
                </span>
              </div>
              <div className="flex w-full grow shrink-0 basis-0 items-start gap-4">
                <span className="text-caption font-caption text-subtext-color">
                  1 month ago
                </span>
                <div className="flex items-center gap-1">
                  <FeatherUser className="text-caption font-caption text-subtext-color" />
                  <span className="text-caption font-caption text-subtext-color">
                    253
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FeatherHeart className="text-caption font-caption text-subtext-color" />
                  <span className="text-caption font-caption text-subtext-color">
                    4
                  </span>
                </div>
              </div>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
              <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2">
                <span className="text-body-bold font-body-bold text-default-font">
                  How do I change the theme of my UI?
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  I would like to update the colors, text, and look and feel of
                  my interface to something else using a theme. I was wondering
                  where I go to find more themes.
                </span>
              </div>
              <div className="flex w-full grow shrink-0 basis-0 items-start gap-4">
                <span className="text-caption font-caption text-subtext-color">
                  1 month ago
                </span>
                <div className="flex items-center gap-1">
                  <FeatherUser className="text-caption font-caption text-subtext-color" />
                  <span className="text-caption font-caption text-subtext-color">
                    253
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FeatherHeart className="text-caption font-caption text-subtext-color" />
                  <span className="text-caption font-caption text-subtext-color">
                    4
                  </span>
                </div>
              </div>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
              <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2">
                <span className="text-body-bold font-body-bold text-default-font">
                  What is the best way to manage state in React?
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  I&#39;m a beginner with React and I&#39;m confused about state
                  management. Should I use context, Redux, or something else?
                </span>
              </div>
              <div className="flex w-full grow shrink-0 basis-0 items-start gap-4">
                <span className="text-caption font-caption text-subtext-color">
                  3 days ago
                </span>
                <div className="flex items-center gap-1">
                  <FeatherUser className="text-caption font-caption text-subtext-color" />
                  <span className="text-caption font-caption text-subtext-color">
                    143
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FeatherHeart className="text-caption font-caption text-subtext-color" />
                  <span className="text-caption font-caption text-subtext-color">
                    6
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default Stories;
