"use client";

import React from "react";
import { ChatSelect } from "@/ui/components/ChatSelect";
import { ChatSelectItem } from "@/ui/components/ChatSelectItem";
import { IconButton } from "@/ui/components/IconButton";
import { TextFieldUnstyled } from "@/ui/components/TextFieldUnstyled";
import { Tooltip } from "@/ui/components/Tooltip";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { FeatherArrowUp } from "@subframe/core";
import { FeatherBadgeX } from "@subframe/core";
import { FeatherBook } from "@subframe/core";
import { FeatherInfo } from "@subframe/core";
import { FeatherMessageCircle } from "@subframe/core";
import { FeatherPartyPopper } from "@subframe/core";
import { FeatherSkull } from "@subframe/core";
import * as SubframeCore from "@subframe/core";

function Home() {
  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start">
        <div className="flex w-full items-center justify-between px-3 py-3">
          <SubframeCore.Popover.Root>
            <SubframeCore.Popover.Trigger asChild={true}>
              <ChatSelect>Combat mode</ChatSelect>
            </SubframeCore.Popover.Trigger>
            <SubframeCore.Popover.Portal>
              <SubframeCore.Popover.Content
                side="bottom"
                align="start"
                sideOffset={4}
                asChild={true}
              >
                <div className="flex w-80 flex-none flex-col items-start gap-1 rounded-md border border-solid border-neutral-border bg-default-background py-2 shadow-lg">
                  <div className="flex w-full items-center gap-2 px-5 pt-2 pb-1">
                    <span className="grow shrink-0 basis-0 text-caption font-caption text-subtext-color">
                      Model
                    </span>
                    <SubframeCore.Tooltip.Provider>
                      <SubframeCore.Tooltip.Root>
                        <SubframeCore.Tooltip.Trigger asChild={true}>
                          <FeatherInfo className="text-body font-body text-neutral-400" />
                        </SubframeCore.Tooltip.Trigger>
                        <SubframeCore.Tooltip.Portal>
                          <SubframeCore.Tooltip.Content
                            side="top"
                            align="center"
                            sideOffset={4}
                            asChild={true}
                          >
                            <Tooltip>Learn more about models</Tooltip>
                          </SubframeCore.Tooltip.Content>
                        </SubframeCore.Tooltip.Portal>
                      </SubframeCore.Tooltip.Root>
                    </SubframeCore.Tooltip.Provider>
                  </div>
                  <div className="flex w-full flex-col items-start gap-1 px-2">
                    <ChatSelectItem
                      title="Head to Head"
                      subtitle="Two random models face off"
                      selected={true}
                    />
                    <ChatSelectItem
                      title="More coming soon"
                      subtitle="Stay tuned!"
                    />
                  </div>
                </div>
              </SubframeCore.Popover.Content>
            </SubframeCore.Popover.Portal>
          </SubframeCore.Popover.Root>
        </div>
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-center justify-center gap-4 bg-default-background px-6 py-6 overflow-auto">
          <div className="flex w-full flex-col items-center justify-center gap-7">
            <div className="flex flex-col items-center gap-2">
              <span className="text-heading-1 font-heading-1 text-default-font text-center">
                Test the limits of AI.
              </span>
              <span className="text-heading-3 font-heading-3 text-subtext-color text-center">
                Find out what artificial intelligence can do for humans.
              </span>
            </div>
            <div className="flex w-full max-w-[768px] flex-col items-end rounded-lg bg-neutral-100 px-3 py-2">
              <div className="flex w-full flex-col items-start gap-2 px-2 py-2">
                <TextFieldUnstyled className="h-auto w-full flex-none">
                  <TextFieldUnstyled.Input
                    placeholder="Click on a story below to start your journey..."
                    value=""
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ) => {}}
                  />
                </TextFieldUnstyled>
              </div>
              <IconButton
                variant="brand-primary"
                icon={<FeatherArrowUp />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
            </div>
            {/* Should be a ticker */}
            <div className="flex grow shrink-0 basis-0 flex-wrap items-center justify-center gap-2">
              <div className="flex items-center gap-2 self-stretch rounded-full border border-solid border-neutral-border bg-default-background px-3 py-2 shadow-sm">
                <FeatherPartyPopper className="text-body-bold font-body-bold text-brand-500" />
                <span className="line-clamp-2 grow shrink-0 basis-0 text-caption font-caption text-subtext-color">
                  Awkward coworker party
                </span>
              </div>
              <div className="flex items-center gap-2 self-stretch rounded-full border border-solid border-neutral-border bg-default-background px-3 py-2 shadow-sm">
                <FeatherMessageCircle className="text-body-bold font-body-bold text-error-500" />
                <span className="line-clamp-2 grow shrink-0 basis-0 text-caption font-caption text-subtext-color">
                  Weird text from ex
                </span>
              </div>
              <div className="flex items-center gap-2 self-stretch rounded-full border border-solid border-neutral-border bg-default-background px-3 py-2 shadow-sm">
                <FeatherBadgeX className="text-body-bold font-body-bold text-warning-500" />
                <span className="line-clamp-2 grow shrink-0 basis-0 text-caption font-caption text-subtext-color">
                  Hurtful message from friend
                </span>
              </div>
              <div className="flex items-center gap-2 self-stretch rounded-full border border-solid border-neutral-border bg-default-background px-3 py-2 shadow-sm">
                <FeatherSkull className="text-body-bold font-body-bold text-success-600" />
                <span className="line-clamp-2 grow shrink-0 basis-0 text-caption font-caption text-subtext-color">
                  Relative dies
                </span>
              </div>
              <div className="flex items-center gap-2 self-stretch rounded-full border border-solid border-neutral-border bg-default-background px-3 py-2 shadow-sm">
                <FeatherBook className="text-body-bold font-body-bold text-neutral-500" />
                <span className="line-clamp-2 grow shrink-0 basis-0 text-caption font-caption text-subtext-color">
                  Teacher issues
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-3 px-4 py-4">
          <span className="text-caption font-caption text-subtext-color">
            AI models can make mistakes. Do not blindly follow AI advice.
          </span>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default Home;