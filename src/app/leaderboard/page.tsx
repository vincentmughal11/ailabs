"use client";

import React, { useEffect, useState } from "react";
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
import ShareLeaderboardDialog from "@/ui/components/ShareLeaderboardDialog";

interface Model {
  id: string;
  name: string;
  displayName: string;
  eloRating: number;
  lastWeekElo: number;
}

function Leaderboard() {
  const [models, setModels] = useState<Model[]>([]);
  const [filteredModels, setFilteredModels] = useState<Model[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);
  const shareUrl = "http://localhost:3000/leaderboard";

  const handleExport = async () => {
    try {
      const res = await fetch('/api/models/export');
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'leaderboard.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      const sorted = [...models].sort((a, b) => 
        sortOrder === "desc" ? b.eloRating - a.eloRating : a.eloRating - b.eloRating
      );
      setFilteredModels(sorted);
    } else {
      const filtered = models.filter(model => 
        model.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const sorted = filtered.sort((a, b) => 
        sortOrder === "desc" ? b.eloRating - a.eloRating : a.eloRating - b.eloRating
      );
      setFilteredModels(sorted);
    }
  }, [searchTerm, models, sortOrder]);

  const fetchModels = async () => {
    try {
      const response = await fetch('/api/models');
      if (response.ok) {
        const data = await response.json();
        setModels(data);
        setFilteredModels(data);
      }
    } catch (error) {
      console.error('Error fetching models:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DefaultPageLayout>
        <div className="container max-w-none flex h-full w-full flex-col items-center justify-center gap-6 bg-default-background py-12">
          <div className="text-body font-body text-subtext-color">Loading leaderboard...</div>
        </div>
      </DefaultPageLayout>
    );
  }

  return (
    <>
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
              onClick={handleExport}
            >
              Export
            </Button>
            <Button onClick={() => setShareOpen(true)}>
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
                  value={searchTerm}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
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
                      <DropdownMenu.DropdownItem 
                        icon={<FeatherChevronUp />}
                        onClick={() => setSortOrder("asc")}
                      >
                        Ascending
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem 
                        icon={<FeatherChevronDown />}
                        onClick={() => setSortOrder("desc")}
                      >
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
          {filteredModels.slice(0, 3).map((model, index) => (
            <div key={model.id} className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
              <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
                #{index + 1} model
              </span>
              <div className="flex w-full flex-col items-start gap-2">
                <span className="text-heading-2 font-heading-2 text-default-font">
                  {model.displayName}
                </span>
                {(() => {
                  const delta = model.eloRating - model.lastWeekElo;
                  const positive = delta > 0;
                  const zero = delta === 0;
                  const variant = positive ? "success" : zero ? "neutral" : "error";
                  const icon = positive ? <FeatherArrowUp /> : zero ? <FeatherChevronRight /> : <FeatherArrowDown />;
                  return (
                    <Badge variant={variant} icon={icon}>
                      {positive ? `+${delta}` : `${delta}`}
                    </Badge>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col items-start gap-6">
          {filteredModels.length === 0 && searchTerm.trim() !== "" ? (
            <div className="flex w-full flex-col items-center justify-center gap-4 py-12">
              <span className="text-body font-body text-subtext-color">
                No models found matching "{searchTerm}"
              </span>
              <Button 
                variant="neutral-secondary"
                onClick={() => setSearchTerm("")}
              >
                Clear search
              </Button>
            </div>
          ) : (
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
                {filteredModels.map((model, index) => (
                  <Table.Row key={model.id}>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                        {model.displayName}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        {(() => {
                          const delta = model.eloRating - model.lastWeekElo;
                          const positive = delta > 0;
                          const zero = delta === 0;
                          const icon = positive ? <FeatherArrowUp /> : zero ? <FeatherChevronRight /> : <FeatherArrowDown />;
                          return icon;
                        })()}
                        <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                          {model.eloRating}
                        </span>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-body font-body text-neutral-500">
                        {(model.eloRating / 200).toFixed(1)}/10
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-body font-body text-neutral-500">
                        {(model.eloRating / 200).toFixed(1)}/10
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-body font-body text-neutral-500">
                        {(model.eloRating / 200).toFixed(1)}/10
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-body font-body text-neutral-500">
                        {(model.eloRating / 200).toFixed(1)}/10
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table>
            </div>
          )}
        </div>
      </div>
    </DefaultPageLayout>
    <ShareLeaderboardDialog open={shareOpen} onOpenChange={setShareOpen} shareUrl={shareUrl} />
    </>
  );
}

export default Leaderboard;