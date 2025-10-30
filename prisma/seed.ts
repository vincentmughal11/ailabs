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

  // Create 30 OpenRouter models
  const models = await Promise.all([
    prisma.model.create({
      data: {
        name: "google/gemini-2.5-pro",
        displayName: "Gemini 2.5 Pro",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "anthropic/claude-opus-4.1",
        displayName: "Claude Opus 4.1",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "anthropic/claude-sonnet-4.5",
        displayName: "Claude Sonnet 4.5",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "openrouter/gpt-4.5",
        displayName: "GPT-4.5",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "openai/chatgpt-4o-latest",
        displayName: "ChatGPT-4o Latest",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "openai/o3",
        displayName: "O3",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "openai/gpt-5",
        displayName: "GPT-5 High",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "qwen/qwen3-max",
        displayName: "Qwen3 Max",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "openai/gpt-5-chat",
        displayName: "GPT-5 Chat",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "z-ai/glm-4.6",
        displayName: "GLM-4.6",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "x-ai/grok-4-fast",
        displayName: "Grok-4 Fast",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "anthropic/claude-opus-4",
        displayName: "Claude Opus 4",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "deepseek/deepseek-chat-v3-0324",
        displayName: "DeepSeek V3 0324",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "qwen/qwen3-vl-235b-a22b-instruct",
        displayName: "Qwen3 VL 235B",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "qwen/qwen3-235b-a22b-2507",
        displayName: "Qwen3 235B",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "deepseek/deepseek-r1-0528",
        displayName: "DeepSeek R1",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "moonshotai/kimi-k2",
        displayName: "Kimi K2",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "deepseek/deepseek-v3.1-terminus",
        displayName: "DeepSeek V3.1 Terminus",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "x-ai/grok-4",
        displayName: "Grok-4",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "deepseek/deepseek-v3.2-exp",
        displayName: "DeepSeek V3.2 Exp",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "qwen/qwen3-next-80b-a3b-instruct",
        displayName: "Qwen3 Next 80B",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "qwen/qwen3-235b-a22b-thinking-2507",
        displayName: "Qwen3 235B Thinking",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "qwen/qwen3-235b-a22b-04-28",
        displayName: "Qwen3 235B No Thinking",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "openai/gpt-5-mini",
        displayName: "GPT-5 Mini",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "z-ai/glm-4.5",
        displayName: "GLM-4.5",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "google/gemini-2.5-flash-preview-09-2025",
        displayName: "Gemini 2.5 Flash",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "anthropic/claude-3.5-sonnet",
        displayName: "Claude 3.5 Sonnet",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "openai/gpt-4o",
        displayName: "GPT-4o",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "anthropic/claude-3-opus",
        displayName: "Claude 3 Opus",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    }),
    prisma.model.create({
      data: {
        name: "meta-llama/llama-3.1-405b-instruct",
        displayName: "Llama 3.1 405B",
        eloRating: 1500,
        lastWeekElo: 1500,
        apiKeyEnvVar: "OPENROUTER_API_KEY"
      }
    })
  ])

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


