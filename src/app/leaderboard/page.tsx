"use client";

import React from "react";
import { Badge } from "@/ui/components/Badge";
import { Button } from "@/ui/components/Button";
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import { Table } from "@/ui/components/Table";
import { TextField } from "@/ui/components/TextField";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { FeatherArrowDown } from "@subframe/core";
import { FeatherArrowUp } from "@subframe/core";
import { FeatherChevronDown } from "@subframe/core";
import { FeatherChevronRight } from "@subframe/core";
import { FeatherChevronsDown } from "@subframe/core";
import { FeatherChevronsUp } from "@subframe/core";
import { FeatherChevronUp } from "@subframe/core";
import { FeatherCircleDot } from "@subframe/core";
import { FeatherDollarSign } from "@subframe/core";
import { FeatherKanbanSquare } from "@subframe/core";
import { FeatherPlus } from "@subframe/core";
import { FeatherSearch } from "@subframe/core";
import { FeatherSettings2 } from "@subframe/core";
import { FeatherUser } from "@subframe/core";
import * as SubframeCore from "@subframe/core";

function Leaderboard() {
  return (
    <DefaultPageLayout>
      <div className="container max-w-none flex h-full w-full flex-col items-start gap-6 bg-default-background py-12">
        <div className="flex w-full flex-col items-start">
          <div className="flex w-full flex-wrap items-center gap-2 px-4 py-4">
        <div className="flex grow shrink-0 basis-0 items-center gap-2">
          <FeatherKanbanSquare className="text-heading-2 font-heading-2 text-default-font" />
          <span className="text-heading-2 font-heading-2 text-default-font">
            AILabs Leaderboard
          </span>
          <Badge>Current</Badge>
        </div>
        <Button
          variant="brand-secondary"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
        >
          Export
        </Button>
            <Button onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}>
              Share
            </Button>
          </div>
          <div className="flex w-full flex-wrap items-center gap-6 px-2 py-2">
            <div className="flex grow shrink-0 basis-0 items-center gap-6">
              <TextField
                variant="filled"
                label=""
                helpText=""
                icon={<FeatherSearch />}
              >
                <TextField.Input
                  placeholder="Search"
                  value=""
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
                />
              </TextField>
            </div>
            <div className="flex flex-wrap items-start gap-1">
              <SubframeCore.DropdownMenu.Root>
                <SubframeCore.DropdownMenu.Trigger asChild={true}>
                  <Button
                    className="hidden"
                    variant="neutral-tertiary"
                    iconRight={<FeatherChevronDown />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Filter
                  </Button>
                </SubframeCore.DropdownMenu.Trigger>
                <SubframeCore.DropdownMenu.Portal>
                  <SubframeCore.DropdownMenu.Content
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    asChild={true}
                  >
                    <DropdownMenu>
                      <DropdownMenu.DropdownItem icon={<FeatherPlus />}>
                        Add filter
                      </DropdownMenu.DropdownItem>
                    </DropdownMenu>
                  </SubframeCore.DropdownMenu.Content>
                </SubframeCore.DropdownMenu.Portal>
              </SubframeCore.DropdownMenu.Root>
              <SubframeCore.DropdownMenu.Root>
                <SubframeCore.DropdownMenu.Trigger asChild={true}>
                  <Button
                    variant="neutral-tertiary"
                    iconRight={<FeatherChevronDown />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Sort
                  </Button>
                </SubframeCore.DropdownMenu.Trigger>
                <SubframeCore.DropdownMenu.Portal>
                  <SubframeCore.DropdownMenu.Content
                    side="bottom"
                    align="end"
                    sideOffset={4}
                    asChild={true}
                  >
                    <DropdownMenu>
                      <DropdownMenu.DropdownItem icon={<FeatherChevronUp />}>
                        Ascending
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem icon={<FeatherChevronDown />}>
                        Descending
                      </DropdownMenu.DropdownItem>
                    </DropdownMenu>
                  </SubframeCore.DropdownMenu.Content>
                </SubframeCore.DropdownMenu.Portal>
              </SubframeCore.DropdownMenu.Root>
              <SubframeCore.DropdownMenu.Root>
                <SubframeCore.DropdownMenu.Trigger asChild={true}>
                  <Button
                    className="hidden"
                    variant="neutral-tertiary"
                    iconRight={<FeatherChevronDown />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Group by
                  </Button>
                </SubframeCore.DropdownMenu.Trigger>
                <SubframeCore.DropdownMenu.Portal>
                  <SubframeCore.DropdownMenu.Content
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    asChild={true}
                  >
                    <DropdownMenu>
                      <DropdownMenu.DropdownItem icon={<FeatherCircleDot />}>
                        Status
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem icon={<FeatherUser />}>
                        Owner
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem icon={<FeatherDollarSign />}>
                        Amount
                      </DropdownMenu.DropdownItem>
                    </DropdownMenu>
                  </SubframeCore.DropdownMenu.Content>
                </SubframeCore.DropdownMenu.Portal>
              </SubframeCore.DropdownMenu.Root>
              <Button
                className="hidden"
                variant="neutral-tertiary"
                icon={<FeatherSettings2 />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Customize
              </Button>
        </div>
      </div>
    </div>
    <div className="flex w-full flex-wrap items-start gap-4">
      <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
        <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
          #1 model
        </span>
        <div className="flex w-full flex-col items-start gap-2">
          <span className="text-heading-2 font-heading-2 text-default-font">
            gemini 2.5-pro
          </span>
          <Badge variant="success" icon={<FeatherArrowUp />}>
            13%
          </Badge>
        </div>
      </div>
      <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
        <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
          #2 model
        </span>
        <div className="flex w-full flex-col items-start gap-2">
          <span className="text-heading-2 font-heading-2 text-default-font">
            openai o3-mini
          </span>
          <Badge variant="success" icon={<FeatherArrowUp />}>
            25%
          </Badge>
        </div>
      </div>
      <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
        <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
          #3 model
        </span>
        <div className="flex w-full flex-col items-start gap-2">
          <span className="text-heading-2 font-heading-2 text-default-font">
            claude sonnet-3.5
          </span>
          <Badge variant="error" icon={<FeatherArrowDown />}>
            33%
          </Badge>
        </div>
      </div>
    </div>
    <div className="flex w-full flex-col items-start gap-6">
          <div className="flex w-full flex-col items-start gap-6 overflow-hidden overflow-x-auto">
            <Table
              header={
                <Table.HeaderRow>
                  <Table.HeaderCell>Model</Table.HeaderCell>
                  <Table.HeaderCell>Elo</Table.HeaderCell>
                  <Table.HeaderCell>Clarity</Table.HeaderCell>
                  <Table.HeaderCell>Empathy</Table.HeaderCell>
                  <Table.HeaderCell>Helpfulness</Table.HeaderCell>
                  <Table.HeaderCell>Overall</Table.HeaderCell>
                </Table.HeaderRow>
              }
            >
              <Table.Row>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                    gemini 2.5-pro
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <FeatherChevronUp className="text-heading-3 font-heading-3 text-default-font" />
                    <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                      1520
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    7.3/10
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    7.3/10
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    7.3/10
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    7.3/10
                  </span>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                    openAI o3-mini
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <FeatherChevronsUp className="text-heading-3 font-heading-3 text-default-font" />
                    <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                      1515
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    6.8/10
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    6.8/10
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    6.8/10
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    6.8/10
                  </span>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                    claude sonnet-3.5
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <FeatherChevronRight className="text-heading-3 font-heading-3 text-default-font" />
                    <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                      1510
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    6.9/10
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    6.9/10
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    6.9/10
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    6.9/10
                  </span>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                    deepseek-v3
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <FeatherChevronUp className="text-heading-3 font-heading-3 text-default-font" />
                    <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                      1490
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    5.7/10
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    5.7/10
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    5.7/10
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    5.7/10
                  </span>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                    grok-4-heavy
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <FeatherChevronsDown className="text-heading-3 font-heading-3 text-default-font" />
                    <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                      1487
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    6.2/10
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    6.2/10
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    6.2/10
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    6.2/10
                  </span>
                </Table.Cell>
              </Table.Row>
            </Table>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default Leaderboard;
