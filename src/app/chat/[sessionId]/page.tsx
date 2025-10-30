"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Accordion } from "@/ui/components/Accordion";
import { Button } from "@/ui/components/Button";
import { LinkButton } from "@/ui/components/LinkButton";
import { DialogLayout } from "@/ui/layouts/DialogLayout";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { FeatherArrowUp } from "@subframe/core";
import { FeatherCpu } from "@subframe/core";
import { FeatherThumbsUp } from "@subframe/core";
import { FeatherTrophy } from "@subframe/core";
import { FeatherZap } from "@subframe/core";
import { FeatherShare2 } from "@subframe/core";
import { FeatherBell } from "@subframe/core";
import { FeatherCheck } from "@subframe/core";
import { FeatherCircleEllipsis } from "@subframe/core";
import { FeatherEye } from "@subframe/core";
import { FeatherFlag } from "@subframe/core";
import { FeatherLink } from "@subframe/core";
import { FeatherLinkedin } from "@subframe/core";
import { FeatherSettings2 } from "@subframe/core";
import { FeatherTwitter } from "@subframe/core";
import { FeatherVerified } from "@subframe/core";
import ReportDialog from "@/ui/components/ReportDialog";
import { Badge } from "@/ui/components/Badge";
import { Table } from "@/ui/components/Table";
import ShareLeaderboardDialog from "@/ui/components/ShareLeaderboardDialog";

interface Session {
  id: string;
  userId: string;
  storyId: string;
  modelAId: string;
  modelBId: string;
  status: string;
  startedAt: string;
  completedAt?: string;
  story: {
    id: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    firstPrompt: string;
  };
  modelA: {
    id: string;
    displayName: string;
  };
  modelB: {
    id: string;
    displayName: string;
  };
  turns: Array<{
    id: string;
    turnNumber: number;
    userPrompt: string;
    modelAResponse: string;
    modelBResponse: string;
    vote?: string;
    nextChoices?: Array<{
      title: string;
      description: string;
      prompt: string;
    }>;
    selectedChoiceIndex?: number;
    createdAt: string;
  }>;
}

function Chat() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;
  
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [currentVote, setCurrentVote] = useState<string | null>(null);
  const [generatingFirstTurn, setGeneratingFirstTurn] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const generatingRef = useRef(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    if (sessionId) {
      fetchSession();
    }
  }, [sessionId]);

  const fetchSession = async () => {
    try {
      const response = await fetch(`/api/sessions/${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Session fetched:', {
          sessionId: data.id,
          turns: data.turns.length,
          status: data.status,
          generatingFirstTurn
        });
        setSession(data);
        
        // Check if session is completed and show modal
        if (data.status === 'COMPLETED' && !showCompletionModal) {
          setShowCompletionModal(true);
        }
        
        // If we have a session but no turns yet, generate the first turn
        if (data.turns.length === 0 && !generatingFirstTurn && !generatingRef.current) {
          console.log('🔄 Starting first turn generation...');
          setGeneratingFirstTurn(true);
          generatingRef.current = true;
          generateFirstTurnForSession();
        } else if (data.turns.length > 0) {
          console.log('✅ Turns loaded:', data.turns.length);
          setLoading(false);
          setGeneratingFirstTurn(false);
          generatingRef.current = false;
        } else if (generatingFirstTurn) {
          console.log('⏳ Waiting for first turn generation...');
        }
      } else {
        console.error('❌ Failed to fetch session');
        setLoading(false);
        router.push('/');
      }
    } catch (error) {
      console.error('❌ Error fetching session:', error);
      setLoading(false);
      router.push('/');
    }
  };

  const generateFirstTurnForSession = async () => {
    try {
      console.log('📡 Calling generate-first-turn API...');
      const response = await fetch(`/api/sessions/${sessionId}/generate-first-turn`, {
        method: 'POST',
      });
      
      if (response.ok) {
        console.log('✅ First turn generation API returned success');
        // Poll for the turn
        setTimeout(() => fetchSession(), 2000);
      } else {
        const errorData = await response.json();
        console.error('❌ Failed to generate first turn:', errorData);
        setLoading(false);
        setGeneratingFirstTurn(false);
        generatingRef.current = false;
      }
    } catch (error) {
      console.error('❌ Error calling generate first turn API:', error);
      setLoading(false);
      setGeneratingFirstTurn(false);
      generatingRef.current = false;
    }
  };

  const handleVote = async (vote: 'MODEL_A' | 'MODEL_B' | 'TIE') => {
    if (!session || !session.turns.length) return;

    const currentTurn = session.turns[session.turns.length - 1];
    console.log('🗳️ Voting:', { 
      turnId: currentTurn.id, 
      turnNumber: currentTurn.turnNumber, 
      vote, 
      currentVote: currentTurn.vote 
    });
    
    if (currentTurn.vote) {
      console.log('⚠️ Already voted on this turn');
      return; // Already voted
    }

    // Set the vote immediately for visual feedback
    setCurrentVote(vote);

    try {
      console.log('📡 Sending vote to API:', { turnId: currentTurn.id, vote });
      const response = await fetch(`/api/turns/${currentTurn.id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vote }),
      });

      if (response.ok) {
        console.log('✅ Vote recorded successfully');
        // Refresh session data
        await fetchSession();
      } else {
        console.error('❌ Vote API error:', await response.text());
      }
    } catch (error) {
      console.error('❌ Error voting:', error);
      setCurrentVote(null); // Reset on error
    }
  };

  const handleChoiceSelect = (choiceIndex: number) => {
    setSelectedChoice(choiceIndex);
  };

  const handleSubmit = async () => {
    if (!session || selectedChoice === null || !session.turns.length) return;

    setSubmitting(true);
    try {
      const currentTurn = session.turns[session.turns.length - 1];
      const selectedPrompt = currentTurn.nextChoices?.[selectedChoice]?.prompt;
      
      if (!selectedPrompt) return;

      const response = await fetch('/api/turns/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: session.id,
          userPrompt: selectedPrompt,
          turnNumber: currentTurn.turnNumber + 1,
        }),
      });

      if (response.ok) {
        // Reset state for next turn
        setSelectedChoice(null);
        setCurrentVote(null);
        // Refresh session data
        await fetchSession();
      }
    } catch (error) {
      console.error('Error submitting turn:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEndStory = async () => {
    // Update session status to completed
    // For now, just redirect to home
    router.push('/');
  };

  const calculateVoteStats = () => {
    if (!session || !session.turns) return { modelA: 0, modelB: 0, tie: 0 };
    
    let modelA = 0;
    let modelB = 0;
    let tie = 0;
    
    // Count votes by checking each turn's vote field
    session.turns.forEach(turn => {
      if (turn.vote === 'MODEL_A') {
        modelA++;
      } else if (turn.vote === 'MODEL_B') {
        modelB++;
      } else if (turn.vote === 'TIE') {
        tie++;
      }
    });
    
    console.log('📊 Vote stats calculated:', { modelA, modelB, tie, totalTurns: session.turns.length });
    console.log('📊 Turn votes:', session.turns.map(t => ({ turnNumber: t.turnNumber, vote: t.vote })));
    
    return { modelA, modelB, tie };
  };

  const handleStartNewStory = () => {
    setShowCompletionModal(false);
    router.push('/');
  };

  if (loading || (session && session.turns.length === 0)) {
    return (
      <DefaultPageLayout>
        <div className="container max-w-none flex h-full w-full flex-col items-center justify-center gap-6 bg-default-background py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="text-heading-2 font-heading-2 text-default-font">
              {session ? session.story.title : 'Loading story...'}
            </div>
            <div className="text-body font-body text-subtext-color">
              Generating responses from AI models...
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-brand-500"></div>
              <div className="h-2 w-2 animate-pulse rounded-full bg-brand-500" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-2 w-2 animate-pulse rounded-full bg-brand-500" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </DefaultPageLayout>
    );
  }

  if (!session) {
    return (
      <DefaultPageLayout>
        <div className="container max-w-none flex h-full w-full flex-col items-center justify-center gap-6 bg-default-background py-12">
          <div className="text-body font-body text-subtext-color">Story not found</div>
        </div>
      </DefaultPageLayout>
    );
  }

  const currentTurn = session.turns[session.turns.length - 1];
  const hasVoted = currentTurn?.vote;
  const hasSelectedChoice = selectedChoice !== null;
  
  // Debug logging
  if (currentTurn) {
    console.log('🔍 Current turn data:', {
      turnId: currentTurn.id,
      hasNextChoices: !!currentTurn.nextChoices,
      nextChoicesCount: currentTurn.nextChoices ? (Array.isArray(currentTurn.nextChoices) ? currentTurn.nextChoices.length : 'not an array') : 0,
      nextChoices: currentTurn.nextChoices
    });
  }
  return (
    <DefaultPageLayout>
      <div className="container max-w-none flex h-full w-full flex-col items-center gap-8 bg-default-background py-12">
        <div className="flex w-full max-w-[1024px] grow shrink-0 basis-0 flex-col items-start gap-8 pb-4">
          <div className="flex w-full flex-col flex-wrap items-start gap-1">
            <div className="flex w-full flex-wrap items-center gap-4">
            <span className="grow shrink-0 basis-0 whitespace-nowrap text-heading-2 font-heading-2 text-default-font">
              {session.story.title}
            </span>
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="neutral-primary"
                onClick={handleEndStory}
              >
                End
              </Button>
              <Button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Like
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FeatherCircleEllipsis className="text-body font-body text-brand-700" />
              <span className="whitespace-nowrap text-body-bold font-body-bold text-brand-700">
                In Progress
              </span>
            </div>
            <span className="text-body font-body text-subtext-color">
              {Math.floor((Date.now() - new Date(session.startedAt).getTime()) / 60000)} mins
            </span>
          </div>
          </div>
          <div className="flex w-full flex-col items-start gap-6">
            <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background shadow-sm">
              <Accordion
                trigger={
                  <div className="flex w-full items-center gap-2 px-6 py-6">
                    <span className="grow shrink-0 basis-0 text-heading-2 font-heading-2 text-default-font">
                      Your prompt
                    </span>
                    <Accordion.Chevron />
                  </div>
                }
                defaultOpen={true}
              >
                <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4 border-t border-solid border-neutral-border px-6 py-6">
                  <span className="text-body font-body text-default-font">
                    {currentTurn?.userPrompt || session.story.firstPrompt}
                  </span>
                  <div className="hidden flex-wrap items-center gap-6">
                    <LinkButton
                      variant="brand"
                      icon={<FeatherLink />}
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => {}}
                    >
                      Website
                    </LinkButton>
                    <LinkButton
                      variant="brand"
                      icon={<FeatherTwitter />}
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => {}}
                    >
                      Twitter
                    </LinkButton>
                    <LinkButton
                      variant="brand"
                      icon={<FeatherLinkedin />}
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => {}}
                    >
                      LinkedIn
                    </LinkButton>
                  </div>
                </div>
              </Accordion>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            <span className="text-heading-3 font-heading-3 text-default-font">
              Model responses
            </span>
        <div className="flex w-full items-start gap-4">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
            <span className="text-heading-3 font-heading-3 text-default-font">
              Model A
            </span>
            <div className="text-body font-body text-default-font prose prose-sm max-w-none">
              <ReactMarkdown>
                {currentTurn?.modelAResponse || 'Loading...'}
              </ReactMarkdown>
            </div>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
            <span className="text-heading-3 font-heading-3 text-default-font">
              Model B
            </span>
            <div className="text-body font-body text-default-font prose prose-sm max-w-none">
              <ReactMarkdown>
                {currentTurn?.modelBResponse || 'Loading...'}
              </ReactMarkdown>
            </div>
          </div>
        </div>
        {!hasVoted && currentTurn && (
          <div className="flex w-full items-center justify-end gap-2">
            <Button
              className="h-8 grow shrink-0 basis-0"
              variant={currentVote === 'MODEL_A' ? 'brand-primary' : 'neutral-secondary'}
              onClick={() => handleVote('MODEL_A')}
            >
              This side&#39;s better
            </Button>
            <Button
              className="h-8 grow shrink-0 basis-0"
              variant={currentVote === 'TIE' ? 'brand-primary' : 'neutral-secondary'}
              icon={<FeatherCheck />}
              onClick={() => handleVote('TIE')}
            >
              Both are equal
            </Button>
            <Button
              className="h-8 grow shrink-0 basis-0"
              variant={currentVote === 'MODEL_B' ? 'brand-primary' : 'neutral-secondary'}
              onClick={() => handleVote('MODEL_B')}
            >
              This side&#39;s better
            </Button>
          </div>
        )}
          </div>
          {currentTurn?.nextChoices && currentTurn.nextChoices.length > 0 && (
            <div className="flex w-full flex-col items-start gap-4">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Your next choice
              </span>
              <div className="flex w-full items-start gap-4">
                {currentTurn.nextChoices.map((choice, index) => {
                  const icons = [FeatherEye, FeatherSettings2, FeatherBell];
                  const IconComponent = icons[index] || FeatherEye;
                  
                  return (
                    <div
                      key={index}
                      className={`flex grow shrink-0 basis-0 flex-col items-start gap-6 rounded-md border border-solid px-6 py-6 shadow-sm cursor-pointer transition-colors ${
                        selectedChoice === index
                          ? 'border-brand-500 bg-brand-50'
                          : 'border-neutral-border bg-default-background hover:bg-neutral-50'
                      }`}
                      onClick={() => handleChoiceSelect(index)}
                    >
                      <div className="flex w-full items-center justify-between">
                        <IconComponent className="text-heading-1 font-heading-1 text-neutral-300" />
                      </div>
                      <div className="flex w-full flex-col items-start gap-1">
                        <span className="w-full text-heading-3 font-heading-3 text-default-font">
                          {choice.title}
                        </span>
                        <span className="w-full text-body font-body text-subtext-color">
                          {choice.description}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div className="flex w-full items-center justify-between">
            <Button
              variant="brand-tertiary"
              onClick={handleEndStory}
            >
              End story
            </Button>
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="brand-secondary"
                iconRight={<FeatherFlag />}
                onClick={() => setReportOpen(true)}
              >
                Report
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!hasSelectedChoice || submitting}
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </div>
          {/* Conversation history hidden for now */}
          {/* <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
            <div className="flex w-full flex-col items-start gap-6">
              <span className="w-full text-heading-3 font-heading-3 text-default-font">
                Conversation history
              </span>
            </div>
            <div className="flex w-full flex-col items-start">
              {session.turns.map((turn, index) => (
                <div key={turn.id} className="flex w-full items-start gap-2">
                  <div className="flex flex-col items-center self-stretch">
                    <div className="flex h-2.5 w-2.5 flex-none flex-col items-start gap-2 rounded-full bg-neutral-300" />
                    <div className="flex w-px grow shrink-0 basis-0 flex-col items-center gap-2 bg-neutral-border" />
                  </div>
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1 px-2 pb-4">
                    <span className="text-caption font-caption text-subtext-color">
                      {Math.floor((Date.now() - new Date(turn.createdAt).getTime()) / 60000)} minutes ago
                    </span>
                    <span className="text-body font-body text-default-font">
                      {turn.vote ? `Voted: ${turn.vote}` : 'No vote yet'}
                      {turn.selectedChoiceIndex !== null && turn.selectedChoiceIndex !== undefined && (
                        <span>; chose choice #{turn.selectedChoiceIndex + 1}</span>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-start gap-6">
              <Button
                variant="neutral-secondary"
                iconRight={<FeatherArrowUp />}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Scroll back up
              </Button>
            </div>
          </div> */}
        </div>
      </div>
      
      {/* Completion Modal */}
      <DialogLayout 
        open={showCompletionModal} 
        onOpenChange={setShowCompletionModal}
      >
        {session && (() => {
          const stats = calculateVoteStats();
          const totalRounds = session.turns.length;
          const aVotes = stats.modelA;
          const bVotes = stats.modelB;
          const totalWins = aVotes + bVotes;
          const aWinRate = totalWins > 0 ? Math.round((aVotes / totalWins) * 100) : 0;
          const bWinRate = totalWins > 0 ? Math.round((bVotes / totalWins) * 100) : 0;
          const aWins = aVotes > bVotes;
          const bWins = bVotes > aVotes;

          return (
            <div className="flex h-full w-full flex-col items-start gap-2">
              <div className="flex w-full max-w-[576px] flex-col items-start gap-6 rounded-lg border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-lg">
                <div className="flex w-full flex-col items-start gap-2">
                  <span className="text-heading-2 font-heading-2 text-default-font">
                    Story
                  </span>
                  <span className="text-body font-body text-subtext-color">
                    Here&#39;s how the two models compared in your session
                  </span>
                </div>
                <div className="flex w-full flex-col items-start gap-4">
                  <div className="flex w-full items-center gap-4 rounded-md border border-solid border-neutral-border bg-neutral-50 px-4 py-4">
                    <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
                      <div className="flex items-center gap-2">
                        <FeatherCpu className="text-heading-3 font-heading-3 text-brand-600" />
                        <span className="text-heading-3 font-heading-3 text-default-font">
                          Model A: {session.modelA.displayName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FeatherThumbsUp className="text-body font-body text-subtext-color" />
                        <span className="text-body font-body text-default-font">
                          {aVotes} votes
                        </span>
                      </div>
                    </div>
                    {aWins ? <Badge icon={<FeatherTrophy />}>Winner</Badge> : null}
                  </div>
                  <div className="flex w-full items-center gap-4 rounded-md border border-solid border-neutral-border bg-neutral-50 px-4 py-4">
                    <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
                      <div className="flex items-center gap-2">
                        <FeatherZap className="text-heading-3 font-heading-3 text-neutral-600" />
                        <span className="text-heading-3 font-heading-3 text-default-font">
                          Model B: {session.modelB.displayName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FeatherThumbsUp className="text-body font-body text-subtext-color" />
                        <span className="text-body font-body text-default-font">
                          {bVotes} votes
                        </span>
                      </div>
                    </div>
                    {bWins ? <Badge icon={<FeatherTrophy />}>Winner</Badge> : null}
                  </div>
                </div>
                <div className="flex w-full flex-col items-start gap-3 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Performance Comparison
                  </span>
                  <Table
                    header={
                      <Table.HeaderRow>
                        <Table.HeaderCell>Metric</Table.HeaderCell>
                        <Table.HeaderCell>Model A</Table.HeaderCell>
                        <Table.HeaderCell>Model B</Table.HeaderCell>
                      </Table.HeaderRow>
                    }
                  >
                    <Table.Row>
                      <Table.Cell>
                        <span className="whitespace-nowrap text-body font-body text-subtext-color">
                          Total Rounds
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                          {totalRounds}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="whitespace-nowrap text-body font-body text-default-font">
                          {totalRounds}
                        </span>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <span className="whitespace-nowrap text-body font-body text-subtext-color">
                          Win Rate
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="whitespace-nowrap text-body-bold font-body-bold text-success-600">
                          {aWinRate}%
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="whitespace-nowrap text-body font-body text-default-font">
                          {bWinRate}%
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  </Table>
                </div>
                <div className="flex w-full items-center justify-end gap-2">
                  <Button
                    variant="neutral-secondary"
                    onClick={handleStartNewStory}
                  >
                    Close
                  </Button>
                  <Button
                    icon={<FeatherShare2 />}
                    onClick={() => setShareOpen(true)}
                  >
                    Share Leaderboard
                  </Button>
                </div>
              </div>
            </div>
          );
        })()}
      </DialogLayout>
      <ShareLeaderboardDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        shareUrl={"http://localhost:3000/leaderboard"}
        title={"Share AILabs Leaderboard"}
        subtitle={"Copy the leaderboard link or share it on social"}
      />
      <ReportDialog 
        open={reportOpen}
        onOpenChange={setReportOpen}
        sessionId={session.id}
        turnId={currentTurn.id}
        defaultModel="UNKNOWN"
        modelAName={session.modelA.displayName}
        modelBName={session.modelB.displayName}
        modelAResponse={currentTurn.modelAResponse}
        modelBResponse={currentTurn.modelBResponse}
      />
    </DefaultPageLayout>
  );
}

export default Chat;