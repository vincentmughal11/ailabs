"use client";

import React from "react";
import { Button } from "@/ui/components/Button";
import { TextField } from "@/ui/components/TextField";
import { DialogLayout } from "@/ui/layouts/DialogLayout";
import { FeatherCopy } from "@subframe/core";
import { FeatherFacebook } from "@subframe/core";
import { FeatherLinkedin } from "@subframe/core";
import { FeatherShare2 } from "@subframe/core";
import { FeatherTwitter } from "@subframe/core";

interface ShareLeaderboardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shareUrl: string;
  title?: string;
  subtitle?: string;
}

export default function ShareLeaderboardDialog({ open, onOpenChange, shareUrl, title = "Share AILabs Leaderboard", subtitle = "Copy the leaderboard link or share it on social" }: ShareLeaderboardDialogProps) {
  const encodedUrl = encodeURIComponent(shareUrl);
  const tweetText = encodeURIComponent("Check out the AILabs Leaderboard!");

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const el = document.createElement("textarea");
        el.value = shareUrl;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      onOpenChange(false);
    } catch (e) {
      console.error("Failed to copy:", e);
    }
  };

  const openWindow = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareTwitter = () => openWindow(`https://twitter.com/intent/tweet?text=${tweetText}&url=${encodedUrl}`);
  const shareLinkedIn = () => openWindow(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`);
  const shareFacebook = () => openWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`);

  return (
    <DialogLayout open={open} onOpenChange={onOpenChange}>
      <div className="flex h-full w-full flex-col items-start gap-2">
        <div className="flex w-full flex-col items-start gap-6 rounded-sm border border-solid border-neutral-border bg-default-background px-8 py-8">
          <div className="flex w-full items-center gap-4">
            <div className="flex h-12 w-12 flex-none flex-col items-center justify-center gap-2 rounded-full bg-brand-100">
              <FeatherShare2 className="text-heading-2 font-heading-2 text-brand-600" />
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
              <span className="text-heading-3 font-heading-3 text-default-font">
                {title}
              </span>
              <span className="text-body font-body text-subtext-color">
                {subtitle}
              </span>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-3">
            <span className="text-body-bold font-body-bold text-default-font">
              Share link
            </span>
            <TextField
              className="h-auto w-full flex-none"
              label=""
              helpText=""
              iconRight={
                <button
                  type="button"
                  aria-label="Copy link"
                  onClick={handleCopy}
                  className="p-0 m-0 bg-transparent border-0 cursor-pointer"
                >
                  <FeatherCopy />
                </button>
              }
            >
              <TextField.Input
                placeholder="https://leaderboard.ai/share/215-rank"
                value={shareUrl}
                readOnly
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
              />
            </TextField>
          </div>
          <div className="flex w-full flex-col items-start gap-3">
            <span className="text-body-bold font-body-bold text-default-font">
              Share on social media
            </span>
            <div className="flex w-full items-center gap-2">
              <Button
                className="h-8 grow shrink-0 basis-0"
                variant="neutral-secondary"
                icon={<FeatherTwitter />}
                onClick={shareTwitter}
              >
                Twitter
              </Button>
              <Button
                className="h-8 grow shrink-0 basis-0"
                variant="neutral-secondary"
                icon={<FeatherLinkedin />}
                onClick={shareLinkedIn}
              >
                LinkedIn
              </Button>
              <Button
                className="h-8 grow shrink-0 basis-0"
                variant="neutral-secondary"
                icon={<FeatherFacebook />}
                onClick={shareFacebook}
              >
                Facebook
              </Button>
            </div>
          </div>
          <div className="flex w-full items-center justify-end gap-2">
            <Button
              variant="neutral-secondary"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCopy}>
              Copy Link
            </Button>
          </div>
        </div>
      </div>
    </DialogLayout>
  );
}


