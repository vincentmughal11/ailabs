"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/components/Button";
import { IconButton } from "@/ui/components/IconButton";
import { LinkButton } from "@/ui/components/LinkButton";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { FeatherHeart } from "@subframe/core";
import { FeatherRocket } from "@subframe/core";
import { FeatherUser } from "@subframe/core";
import { FeatherZap } from "@subframe/core";

interface Story {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  firstPrompt: string;
  icon?: string;
}

function Stories() {
  const router = useRouter();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await fetch('/api/stories');
      if (response.ok) {
        const data = await response.json();
        setStories(data);
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStoryClick = (story: Story) => {
    console.log('📖 Story clicked:', {
      id: story.id,
      title: story.title,
      firstPrompt: story.firstPrompt,
      hasFirstPrompt: !!story.firstPrompt
    });
    // Navigate to homepage with story data
    router.push(`/?story=${story.id}`);
  };

  if (loading) {
    return (
      <DefaultPageLayout>
        <div className="container max-w-none flex h-full w-full flex-col items-center justify-center gap-6 bg-default-background py-12">
          <div className="text-body font-body text-subtext-color">Loading stories...</div>
        </div>
      </DefaultPageLayout>
    );
  }

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
              {stories.length} stories
            </LinkButton>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          {Array.from({ length: Math.ceil(stories.length / 3) }, (_, rowIndex) => (
            <div key={rowIndex} className="flex items-start gap-4">
              {stories.slice(rowIndex * 3, (rowIndex + 1) * 3).map((story) => (
                <div 
                  key={story.id}
                  className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm cursor-pointer hover:bg-neutral-50 transition-colors"
                  onClick={() => handleStoryClick(story)}
                >
                  <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2">
                    <span className="text-body-bold font-body-bold text-default-font">
                      {story.title}
                    </span>
                    <span className="text-caption font-caption text-subtext-color">
                      {story.description}
                    </span>
                  </div>
                  <div className="flex w-full grow shrink-0 basis-0 items-start gap-4">
                    <span className="text-caption font-caption text-subtext-color">
                      {story.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <FeatherUser className="text-caption font-caption text-subtext-color" />
                      <span className="text-caption font-caption text-subtext-color">
                        {story.tags.length} tags
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FeatherHeart className="text-caption font-caption text-subtext-color" />
                      <span className="text-caption font-caption text-subtext-color">
                        Start
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default Stories;