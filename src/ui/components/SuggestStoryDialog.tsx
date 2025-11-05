"use client";

import React, { useState } from "react";
import { Button } from "@/ui/components/Button";
import { Checkbox } from "@/ui/components/Checkbox";
import { IconButton } from "@/ui/components/IconButton";
import { TextArea } from "@/ui/components/TextArea";
import { TextField } from "@/ui/components/TextField";
import { ToggleGroup } from "@/ui/components/ToggleGroup";
import { DialogLayout } from "@/ui/layouts/DialogLayout";
import { FeatherSend } from "@subframe/core";
import { FeatherX } from "@subframe/core";

interface SuggestStoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SuggestStoryDialog({ open, onOpenChange }: SuggestStoryDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    if (!submitting) {
      onOpenChange(false);
      // Reset form when closing
      setTitle("");
      setDescription("");
      setCategory("");
      setAgreedToTerms(false);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!description.trim()) {
      setError("Description is required");
      return;
    }
    if (!category) {
      setError("Category is required");
      return;
    }
    if (!agreedToTerms) {
      setError("You must agree to the terms");
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/story-suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          category,
          agreedToTerms,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to submit story suggestion");
        return;
      }

      // Success - reset form and close modal
      setTitle("");
      setDescription("");
      setCategory("");
      setAgreedToTerms(false);
      setError(null);
      onOpenChange(false);
    } catch (err) {
      console.error("Error submitting story suggestion:", err);
      setError("An error occurred while submitting. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DialogLayout open={open} onOpenChange={handleClose}>
      <div className="flex h-full w-full flex-col items-start gap-2">
        <div className="flex w-full max-w-[448px] flex-col items-start overflow-hidden rounded-md border border-solid border-neutral-border bg-default-background shadow-lg">
          <div className="flex w-full items-center justify-between bg-neutral-100 pl-6 pr-2 py-2">
            <span className="text-caption-bold font-caption-bold text-default-font">
              Suggest a Story
            </span>
            <IconButton
              size="small"
              icon={<FeatherX />}
              onClick={handleClose}
              disabled={submitting}
            />
          </div>

          <div className="flex w-full flex-col items-start gap-6 px-6 py-6">
            <div className="flex w-full flex-col items-start gap-1">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Share a great story
              </span>
              <span className="text-body font-body text-subtext-color">
                Tell us about a great (awkward) story you think the AI models would get tripped up on.
              </span>
            </div>

            {error && (
              <div className="flex w-full items-center gap-2 rounded-md bg-red-50 px-4 py-3 border border-red-200">
                <span className="text-body font-body text-red-600">{error}</span>
              </div>
            )}

            <div className="flex w-full flex-col items-start gap-4">
              <TextField
                className="h-auto w-full flex-none"
                label="Story Title"
                helpText="Give your story a catchy title"
              >
                <TextField.Input
                  placeholder="e.g., I texted my ex at 2am..."
                  value={title}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(event.target.value)
                  }
                  disabled={submitting}
                />
              </TextField>

              <TextArea
                className="h-auto w-full flex-none"
                label="Description"
                helpText="Describe the awkward situation in detail"
              >
                <TextArea.Input
                  placeholder="Tell us what happened..."
                  value={description}
                  onChange={(
                    event: React.ChangeEvent<HTMLTextAreaElement>
                  ) => setDescription(event.target.value)}
                  disabled={submitting}
                />
              </TextArea>

              <div className="flex w-full flex-col items-start gap-2">
                <span className="text-body-bold font-body-bold text-default-font">
                  Category
                </span>
                <ToggleGroup
                  value={category}
                  onValueChange={(value: string) => setCategory(value)}
                  disabled={submitting}
                >
                  <ToggleGroup.Item icon={null} value="Texting">
                    Texting
                  </ToggleGroup.Item>
                  <ToggleGroup.Item icon={null} value="Neighbor">
                    Neighbor
                  </ToggleGroup.Item>
                  <ToggleGroup.Item icon={null} value="Work">
                    Work
                  </ToggleGroup.Item>
                  <ToggleGroup.Item icon={null} value="Other">
                    Other
                  </ToggleGroup.Item>
                </ToggleGroup>
              </div>

              <Checkbox
                label="I agree this story is real and appropriate to share"
                checked={agreedToTerms}
                onCheckedChange={(checked: boolean) =>
                  setAgreedToTerms(checked)
                }
                disabled={submitting}
              />
            </div>

            <div className="flex w-full items-center justify-end gap-2">
              <Button
                className="h-8 grow shrink-0 basis-0"
                variant="neutral-secondary"
                onClick={handleClose}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                className="h-8 grow shrink-0 basis-0"
                icon={<FeatherSend />}
                onClick={handleSubmit}
                disabled={submitting || !title.trim() || !description.trim() || !category || !agreedToTerms}
              >
                {submitting ? "Submitting..." : "Submit Story"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DialogLayout>
  );
}

