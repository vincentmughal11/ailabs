// @ts-nocheck
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.vote.deleteMany()
  await prisma.turn.deleteMany()
  await prisma.session.deleteMany()
  await prisma.model.deleteMany()
  await prisma.story.deleteMany()
  
  console.log('Cleared existing data')
  
  // Create stories
  const stories = await Promise.all([
    prisma.story.create({
      data: {
        title: "The Awkward Coworker Party",
        description: "You're at a work party and your awkward coworker keeps making inappropriate comments. How do you handle the situation?",
        category: "Workplace",
        tags: ["work", "social", "awkward", "boundaries"],
        firstPrompt: "I'm at a work party celebrating the company's quarterly success. My coworker Sarah, who has a history of making inappropriate comments, approached me and loudly said, 'Wow, you look really different tonight! Did you lose weight or just dress better?' Several people nearby turned to look. How should I respond?",
        icon: "FeatherPartyPopper"
      }
    }),
    prisma.story.create({
      data: {
        title: "Weird Text from Ex",
        description: "Your ex-partner sends you a confusing text message after months of no contact. What do you do?",
        category: "Relationships",
        tags: ["ex", "text", "confusing", "boundaries"],
        firstPrompt: "It's been 6 months since my ex and I broke up. I've been doing well, focusing on myself and my career. Then I received this text: 'Hey, I know we haven't talked in a while, but I had a dream about you last night and it made me realize I might have made a mistake. Can we meet for coffee? I have something important to tell you.' How should I respond?",
        icon: "FeatherMessageCircle"
      }
    }),
    prisma.story.create({
      data: {
        title: "Hurtful Message from Friend",
        description: "A close friend sends you a message that really hurts your feelings. How do you handle it?",
        category: "Friendship",
        tags: ["friend", "hurt", "communication", "conflict"],
        firstPrompt: "My best friend of 10 years sent me a message: 'I've been thinking about this for a while, but I think you've become really negative lately. Every time we hang out, you just complain about everything. I know you're going through a tough time, but it's draining to be around you. Maybe we should take a break from hanging out so much.' This came completely out of the blue. How should I respond?",
        icon: "FeatherBadgeX"
      }
    }),
    prisma.story.create({
      data: {
        title: "Relative Dies",
        description: "A family member passes away and you need to navigate the complex emotions and family dynamics.",
        category: "Family",
        tags: ["death", "family", "grief", "support"],
        firstPrompt: "My grandmother, who raised me after my parents divorced, has passed away. She was 89 and had been declining for months, but it still hits me hard. My family is gathering for the funeral, and I know there will be tension between my estranged parents who haven't spoken in years. My cousin called me crying, saying she doesn't know how she'll get through this. How should I respond?",
        icon: "FeatherSkull"
      }
    }),
    prisma.story.create({
      data: {
        title: "Teacher Issues",
        description: "You're having problems with a teacher or professor who seems to be treating you unfairly.",
        category: "Education",
        tags: ["teacher", "unfair", "academic", "conflict"],
        firstPrompt: "I'm in my final semester of college, and my professor has been consistently giving me lower grades than my classmates for similar work. When I asked about it, she said my writing 'lacks depth' but won't give specific feedback. I've always been a good student, and this is affecting my GPA. My friend suggests I go to the department head, but I'm worried about making things worse. What should I do?",
        icon: "FeatherBook"
      }
    }),
    prisma.story.create({
      data: {
        title: "Neighbor Drama",
        description: "Your neighbor is causing problems and you need to address it without making things worse.",
        category: "Community",
        tags: ["neighbor", "conflict", "boundaries", "communication"],
        firstPrompt: "My upstairs neighbor has been playing loud music every night until 2 AM for the past week. I've tried knocking on their door, but they either don't answer or turn it down for 10 minutes before cranking it back up. I have an important job interview tomorrow morning and need to sleep. My other neighbors are also complaining. What should I do?",
        icon: "FeatherHome"
      }
    }),
    prisma.story.create({
      data: {
        title: "Social Media Conflict",
        description: "Someone posts something offensive on social media and you need to decide how to respond.",
        category: "Social Media",
        tags: ["social media", "offensive", "conflict", "values"],
        firstPrompt: "A friend from college posted a meme on Facebook that I find deeply offensive and harmful. It's a stereotype about a marginalized group, and several people are laughing in the comments. This friend has always seemed like a good person, but this post makes me question everything. I know calling them out publicly might end the friendship, but staying silent feels wrong. How should I handle this?",
        icon: "FeatherTwitter"
      }
    }),
    prisma.story.create({
      data: {
        title: "Workplace Harassment",
        description: "You witness or experience harassment at work and need to decide how to respond.",
        category: "Workplace",
        tags: ["harassment", "workplace", "reporting", "ethics"],
        firstPrompt: "I was in a meeting with my team when my manager made a sexist joke about one of my female colleagues. Everyone laughed uncomfortably, but no one said anything. The colleague in question looked visibly upset but tried to laugh it off. I know this manager has a history of inappropriate comments, but they're also the one who decides on promotions. What should I do?",
        icon: "FeatherAlertTriangle"
      }
    }),
    prisma.story.create({
      data: {
        title: "Family Financial Crisis",
        description: "A family member asks you for money during a financial crisis, but you have your own financial concerns.",
        category: "Family",
        tags: ["money", "family", "financial", "boundaries"],
        firstPrompt: "My brother called me in tears, saying he's about to lose his house because he can't make the mortgage payment. He's asking me to lend him $5,000, which is most of my emergency savings. I know he's had money problems before and has never paid me back when I've helped in the past. I'm also saving for my own wedding next year. How should I respond?",
        icon: "FeatherDollarSign"
      }
    }),
    prisma.story.create({
      data: {
        title: "Friend's Addiction",
        description: "A close friend is struggling with addiction and you need to decide how to help without enabling them.",
        category: "Health",
        tags: ["addiction", "friend", "help", "boundaries"],
        firstPrompt: "My best friend has been drinking heavily for months, and it's affecting their job and relationships. They've asked me to cover for them at work again, saying they're 'sick' when they're actually hungover. I've tried talking to them about it, but they get defensive and angry. Their partner has reached out to me, saying they're worried and asking for my help. What should I do?",
        icon: "FeatherHeart"
      }
    }),
    prisma.story.create({
      data: {
        title: "Online Dating Dilemma",
        description: "You're navigating the complexities of online dating and need to make decisions about relationships.",
        category: "Dating",
        tags: ["dating", "online", "relationships", "boundaries"],
        firstPrompt: "I've been talking to someone on a dating app for two weeks. The conversation has been great, and we've made plans to meet in person. The night before our date, they sent me a message saying they need to reschedule because their ex just called and wants to get back together. They're asking for my advice on what to do. How should I respond?",
        icon: "FeatherHeart"
      }
    }),
    prisma.story.create({
      data: {
        title: "Career Crossroads",
        description: "You're facing a major career decision that will impact your future and relationships.",
        category: "Career",
        tags: ["career", "decision", "future", "family"],
        firstPrompt: "I've been offered my dream job in another city, but it means leaving my aging parents who rely on me for support. My partner is also established in their career here and doesn't want to move. The job pays significantly more and offers better growth opportunities, but I'd be moving away from my entire support system. How should I make this decision?",
        icon: "FeatherBriefcase"
      }
    })
  ])

  // Helper function to generate display names from OpenRouter model names
  function getDisplayName(modelName: string): string {
    const parts = modelName.split('/')
    const provider = parts[0]
    const model = parts[1]
    
    // Handle specific model name formatting
    const modelMap: Record<string, string> = {
      'perplexity/sonar-pro-search': 'Perplexity Sonar Pro Search',
      'minimax/minimax-m2': 'MiniMax M2',
      'anthropic/claude-haiku-4.5': 'Claude Haiku 4.5',
      'openai/gpt-5': 'GPT-5',
      'openai/gpt-5-mini': 'GPT-5 Mini',
      'openai/gpt-oss-120b': 'GPT-OSS 120B',
      'openai/gpt-oss-20b': 'GPT-OSS 20B',
      'openai/gpt-4.1-mini': 'GPT-4.1 Mini',
      'openai/gpt-4o-mini': 'GPT-4o Mini',
      'anthropic/claude-sonnet-4.5': 'Claude Sonnet 4.5',
      'anthropic/claude-sonnet-4': 'Claude Sonnet 4',
      'google/gemini-2.5-flash-preview-09-2025': 'Gemini 2.5 Flash Preview',
      'google/gemini-2.5-flash-lite': 'Gemini 2.5 Flash Lite',
      'google/gemini-2.5-pro': 'Gemini 2.5 Pro',
      'x-ai/grok-4-fast': 'Grok 4 Fast',
      'x-ai/grok-code-fast-1': 'Grok Code Fast',
      'x-ai/grok-3': 'Grok 3',
      'cohere/command-r7b-12-2024': 'Cohere Command R7B',
      'google/gemini-2.0-flash-001': 'Gemini 2.0 Flash',
      'deepseek/deepseek-chat-v3-0324': 'DeepSeek Chat V3',
      'z-ai/glm-4.6': 'GLM-4.6',
      'deepseek/deepseek-chat-v3.1': 'DeepSeek Chat V3.1',
      'qwen/qwen3-235b-a22b-2507': 'Qwen3 235B',
      'mistralai/mistral-nemo': 'Mistral Nemo',
      'deepseek/deepseek-v3.2-exp': 'DeepSeek V3.2 Experimental',
      'anthropic/claude-3.7-sonnet': 'Claude 3.7 Sonnet',
      'meta-llama/llama-4-maverick': 'Llama 4 Maverick',
      'meta-llama/llama-3.3-70b-instruct': 'Llama 3.3 70B',
      'x-ai/grok-3-mini': 'Grok 3 Mini',
      'qwen/qwen3-next-80b-a3b-instruct': 'Qwen3 Next 80B',
      'mistralai/codestral-2508': 'Codestral',
      'moonshotai/kimi-k2': 'Kimi K2',
      'tngtech/deepseek-r1t2-chimera': 'DeepSeek R1T2 Chimera',
      'perplexity/sonar-deep-research': 'Perplexity Sonar Deep Research',
      'amazon/nova-premier-v1': 'Amazon Nova Premier',
      'amazon/nova-pro-v1': 'Amazon Nova Pro',
      'microsoft/wizardlm-2-8x22b': 'WizardLM 2 8x22B',
      'morph/morph-v3-large': 'Morph V3 Large',
      'inclusionai/ling-1t': 'Ling 1T',
    }
    
    if (modelMap[modelName]) {
      return modelMap[modelName]
    }
    
    // Fallback: format the model name nicely
    return model
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Create OpenRouter models - starting from 0 models and building up
  const modelNames = [
    // Original models
    "perplexity/sonar-pro-search",
    "minimax/minimax-m2",
    "anthropic/claude-haiku-4.5",
    "openai/gpt-5",
    "openai/gpt-5-mini",
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "openai/gpt-4.1-mini",
    "openai/gpt-4o-mini",
    "anthropic/claude-sonnet-4.5",
    "anthropic/claude-sonnet-4",
    "google/gemini-2.5-flash-preview-09-2025",
    "google/gemini-2.5-flash-lite",
    "google/gemini-2.5-pro",
    "x-ai/grok-4-fast",
    "x-ai/grok-code-fast-1",
    "x-ai/grok-3",
    "cohere/command-r7b-12-2024",
    // New models (skipping duplicates)
    "google/gemini-2.0-flash-001",
    "deepseek/deepseek-chat-v3-0324",
    "z-ai/glm-4.6",
    "deepseek/deepseek-chat-v3.1",
    "qwen/qwen3-235b-a22b-2507",
    "mistralai/mistral-nemo",
    "deepseek/deepseek-v3.2-exp",
    "anthropic/claude-3.7-sonnet",
    "meta-llama/llama-4-maverick",
    "meta-llama/llama-3.3-70b-instruct",
    "x-ai/grok-3-mini",
    "qwen/qwen3-next-80b-a3b-instruct",
    "mistralai/codestral-2508",
    "moonshotai/kimi-k2",
    "tngtech/deepseek-r1t2-chimera",
    "perplexity/sonar-deep-research",
    "amazon/nova-premier-v1",
    "amazon/nova-pro-v1",
    "microsoft/wizardlm-2-8x22b",
    "morph/morph-v3-large",
    "inclusionai/ling-1t"
  ]

  const models = await Promise.all(
    modelNames.map(modelName =>
      prisma.model.create({
        data: {
          name: modelName,
          displayName: getDisplayName(modelName),
          eloRating: 1500,
          lastWeekElo: 1500,
          apiKeyEnvVar: "OPENROUTER_API_KEY",
          apiEndpoint: null // All models use OpenRouter (configured in code)
        }
      })
    )
  )

  console.log('Seeded stories:', stories.length)
  console.log('Seeded models:', models.length)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


