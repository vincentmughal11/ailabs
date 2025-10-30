"use client";

import React, { useEffect, useState } from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Table } from "@/ui/components/Table";
import { TextField } from "@/ui/components/TextField";
import { Button } from "@/ui/components/Button";
import { FeatherSearch } from "@subframe/core";

interface Report {
  id: string;
  sessionId: string;
  turnId: string;
  model: "MODEL_A" | "MODEL_B" | "UNKNOWN";
  reason: string;
  details: string;
  createdAt: string;
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [filtered, setFiltered] = useState<Report[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/reports');
        if (res.ok) {
          const data = await res.json();
          setReports(data);
          setFiltered(data);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!q.trim()) {
      setFiltered(reports);
      return;
    }
    const needle = q.toLowerCase();
    setFiltered(
      reports.filter(r =>
        r.reason.toLowerCase().includes(needle) ||
        r.details.toLowerCase().includes(needle) ||
        r.sessionId.toLowerCase().includes(needle) ||
        r.turnId.toLowerCase().includes(needle) ||
        r.model.toLowerCase().includes(needle)
      )
    );
  }, [q, reports]);

  if (loading) {
    return (
      <DefaultPageLayout>
        <div className="container max-w-none flex h-full w-full flex-col items-center justify-center gap-6 bg-default-background py-12">
          <div className="text-body font-body text-subtext-color">Loading reports...</div>
        </div>
      </DefaultPageLayout>
    );
  }

  return (
    <DefaultPageLayout>
      <div className="container max-w-none flex h-full w-full flex-col items-start gap-6 bg-default-background py-12">
        <div className="flex w-full flex-wrap items-center gap-6 px-2 py-2">
          <div className="flex grow shrink-0 basis-0 items-center gap-6">
            <TextField variant="filled" label="" helpText="" icon={<FeatherSearch /> }>
              <TextField.Input
                placeholder="Search reports..."
                value={q}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQ(e.target.value)}
              />
            </TextField>
          </div>
          <Button onClick={() => setQ("")}>Clear</Button>
        </div>
        <div className="flex w-full flex-col items-start gap-6 overflow-hidden overflow-x-auto">
          <Table
            header={
              <Table.HeaderRow>
                <Table.HeaderCell>When</Table.HeaderCell>
                <Table.HeaderCell>Reason</Table.HeaderCell>
                <Table.HeaderCell>Details</Table.HeaderCell>
                <Table.HeaderCell>Model</Table.HeaderCell>
                <Table.HeaderCell>Session</Table.HeaderCell>
                <Table.HeaderCell>Turn</Table.HeaderCell>
              </Table.HeaderRow>
            }
          >
            {filtered.map((r) => (
              <Table.Row key={r.id}>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    {new Date(r.createdAt).toLocaleString()}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                    {r.reason}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-default-font">
                    {r.details || '-'}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">{r.model}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">{r.sessionId}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">{r.turnId}</span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table>
        </div>
      </div>
    </DefaultPageLayout>
  );
}


