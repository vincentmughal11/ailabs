"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

interface Story {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  firstPrompt: string;
  icon?: string;
}

function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFeaturedStories();
  }, []);


  useEffect(() => {
    const storyId = searchParams.get('story');
    console.log('🔍 URL param check:', {
      storyId,
      storiesLoaded: stories.length,
      searchParams: searchParams.toString()
    });
    
    if (storyId && stories.length > 0) {
      const story = stories.find(s => s.id === storyId);
      console.log('📚 Story lookup:', {
        found: !!story,
        story: story ? {
          id: story.id,
          title: story.title,
          firstPrompt: story.firstPrompt,
          hasFirstPrompt: !!story.firstPrompt
        } : null
      });
      
      if (story) {
        setSelectedStory(story);
        setInputValue(story.firstPrompt);
        console.log('✅ Story prefilled:', story.firstPrompt);
      }
    }
  }, [searchParams, stories]);

  const fetchFeaturedStories = async () => {
    try {
      const response = await fetch('/api/stories');
      if (response.ok) {
        const data = await response.json();
        setStories(data); // Load ALL stories for URL param lookup
        console.log('📚 Loaded all stories:', data.length);
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  const handleStoryClick = async (story: Story) => {
    console.log('🏠 Homepage story button clicked:', {
      id: story.id,
      title: story.title,
      firstPrompt: story.firstPrompt,
      hasFirstPrompt: !!story.firstPrompt
    });
    setSelectedStory(story);
    setInputValue(story.firstPrompt);
  };

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;
    
    setLoading(true);
    try {
      // Generate a simple user ID (in a real app, this would be from auth)
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Create session (without waiting for LLM responses)
      const response = await fetch('/api/sessions/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storyId: selectedStory?.id || stories[0]?.id,
          userId
        }),
      });

      if (response.ok) {
        const { sessionId } = await response.json();
        // Navigate immediately to chat page
        router.push(`/chat/${sessionId}`);
      } else {
        console.error('Failed to create session');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error creating session:', error);
      setLoading(false);
    }
    // Don't set loading to false here - we're navigating away
  };
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
                    value={inputValue}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                      setInputValue(event.target.value)
                    }
                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                      if (event.key === 'Enter') {
                        handleSubmit();
                      }
                    }}
                  />
                </TextFieldUnstyled>
              </div>
              <IconButton
                variant="brand-primary"
                icon={<FeatherArrowUp />}
                onClick={handleSubmit}
                disabled={loading || !inputValue.trim()}
              />
            </div>
            {/* Story buttons */}
            <div className="flex grow shrink-0 basis-0 flex-wrap items-center justify-center gap-2">
              {stories.slice(0, 5).map((story, index) => {
                const icons = [FeatherPartyPopper, FeatherMessageCircle, FeatherBadgeX, FeatherSkull, FeatherBook];
                const colors = ['text-brand-500', 'text-error-500', 'text-warning-500', 'text-success-600', 'text-neutral-500'];
                const IconComponent = icons[index % icons.length];
                const colorClass = colors[index % colors.length];
                
                return (
                  <div 
                    key={story.id}
                    className="flex items-center gap-2 self-stretch rounded-full border border-solid border-neutral-border bg-default-background px-3 py-2 shadow-sm cursor-pointer hover:bg-neutral-50 transition-colors"
                    onClick={() => handleStoryClick(story)}
                  >
                    <IconComponent className={`text-body-bold font-body-bold ${colorClass}`} />
                    <span className="line-clamp-2 grow shrink-0 basis-0 text-caption font-caption text-subtext-color">
                      {story.title}
                    </span>
                  </div>
                );
              })}
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