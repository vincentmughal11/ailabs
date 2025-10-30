"use client";

import React, { useState } from "react";
import { Button } from "@/ui/components/Button";
import { Select } from "@/ui/components/Select";
import { TextField } from "@/ui/components/TextField";
import { DialogLayout } from "@/ui/layouts/DialogLayout";
import { FeatherFlag } from "@subframe/core";
import { FeatherInfo } from "@subframe/core";

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionId: string;
  turnId: string;
  defaultModel?: "MODEL_A" | "MODEL_B" | "UNKNOWN";
  modelAName: string;
  modelBName: string;
  modelAResponse: string;
  modelBResponse: string;
}

export default function ReportDialog({ open, onOpenChange, sessionId, turnId, defaultModel = "UNKNOWN", modelAName, modelBName, modelAResponse, modelBResponse }: ReportDialogProps) {
  const [reason, setReason] = useState<string | undefined>(undefined);
  const [details, setDetails] = useState<string>("");
  const [modelSide, setModelSide] = useState<"MODEL_A" | "MODEL_B" | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!reason || !modelSide) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          turnId,
          model: modelSide,
          reason,
          details,
          modelAName,
          modelBName,
          modelAResponse,
          modelBResponse,
        }),
      });
      if (res.ok) {
        onOpenChange(false);
        setReason(undefined);
        setDetails("");
        setModelSide(undefined);
      } else {
        console.error('Report submit failed', await res.text());
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DialogLayout open={open} onOpenChange={onOpenChange}>
      <div className="flex h-full w-full flex-col items-start gap-2">
        <div className="flex w-full max-w-[448px] flex-col items-start gap-6 rounded-lg bg-white px-6 py-6 shadow-lg">
          <div className="flex w-full flex-col items-start gap-2">
            <span className="text-heading-2 font-heading-2 text-default-font">
              Report Response
            </span>
            <span className="text-body font-body text-subtext-color">
              Help us improve by reporting inappropriate AI responses
            </span>
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            <Select
              className="h-auto w-full flex-none"
              label="Which model?"
              placeholder="Select a model"
              helpText=""
              value={modelSide}
              onValueChange={(value: string) => setModelSide(value as any)}
            >
              <Select.Item value="MODEL_A">Model A</Select.Item>
              <Select.Item value="MODEL_B">Model B</Select.Item>
            </Select>
            <Select
              className="h-auto w-full flex-none"
              label="Reason"
              placeholder="Select a reason"
              helpText=""
              value={reason}
              onValueChange={(value: string) => setReason(value)}
            >
              <Select.Item value="harmful">harmful</Select.Item>
              <Select.Item value="offensive">offensive</Select.Item>
              <Select.Item value="misleading">misleading</Select.Item>
              <Select.Item value="privacy">privacy</Select.Item>
              <Select.Item value="other">other</Select.Item>
            </Select>
            <TextField
              className="h-auto w-full flex-none"
              label="Additional details"
              helpText="Please provide more context about the issue"
            >
              <TextField.Input
                placeholder="Describe what was inappropriate..."
                value={details}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDetails(event.target.value)}
              />
            </TextField>
          </div>
          <div className="flex w-full items-start gap-2 rounded-md bg-neutral-50 px-4 py-3">
            <FeatherInfo className="text-body font-body text-neutral-600" />
            <span className="grow shrink-0 basis-0 text-caption font-caption text-subtext-color">
              Your report will be reviewed by our team. We take all reports
              seriously and will take appropriate action.
            </span>
          </div>
          <div className="flex w-full items-center justify-end gap-2">
            <Button
              variant="neutral-secondary"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              icon={<FeatherFlag />}
              onClick={submit}
              disabled={!reason || !modelSide || submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Report'}
            </Button>
          </div>
        </div>
      </div>
    </DialogLayout>
  );
}


