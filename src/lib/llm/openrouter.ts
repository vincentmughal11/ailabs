import OpenAI from 'openai'

const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
})

export interface LLMResponse {
  response: string
  model: string
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
}

export async function generateOpenRouterResponse(
  prompt: string,
  model: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<LLMResponse> {
  try {
    const messages = [
      {
        role: 'system' as const,
        content: 'You are a helpful assistant providing advice for human situations. Keep responses SHORT and READABLE:\n\n- Maximum 2-3 short paragraphs (under 150 words total)\n- Use simple, clear language\n- Break up text with line breaks for readability\n- Focus on 2-3 key actionable points\n- Avoid dense walls of text\n- Be empathetic but concise\n\nExample of GOOD format:\n\n"I completely understand how stressful this must be—especially with a critical interview tomorrow.\n\nFor tonight: Put in earplugs and text your building manager immediately. Frame it as urgent since you have an interview.\n\nFor tomorrow: Get neighbors to sign a group complaint. Document everything with dates/times. Most leases have noise clauses—management must address repeat violations."\n\nThis is helpful, actionable, and easy to scan quickly.'
      },
      ...conversationHistory,
      {
        role: 'user' as const,
        content: prompt
      }
    ]

    const completion = await openrouter.chat.completions.create({
      model,
      messages,
      max_tokens: 200,
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content || ''

    return {
      response,
      model,
      usage: completion.usage ? {
        promptTokens: completion.usage.prompt_tokens,
        completionTokens: completion.usage.completion_tokens,
        totalTokens: completion.usage.total_tokens,
      } : undefined
    }
  } catch (error) {
    console.error('OpenRouter API error:', error)
    throw new Error(`Failed to generate response from ${model}`)
  }
}

export async function generateNextChoices(
  storyId: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>,
  modelResponses: { modelA: string; modelB: string }
): Promise<Array<{ title: string; description: string; prompt: string }>> {
  try {
    const systemPrompt = `You are an expert at creating engaging story continuations. Based on the conversation history and the two AI responses, generate 3 different next steps that would be natural progressions of this story.

IMPORTANT FORMATTING RULES:
- Return ONLY raw JSON, no markdown formatting, no code blocks, no backticks. Your response must be valid JSON that can be parsed directly.
- Keep descriptions SHORT (1-2 sentences max, under 20 words)
- Prompts must be written in FIRST-PERSON PAST TENSE, as if the user has already taken the action
- Prompts should describe what the user DID, not commands for what they should do
- Prompts should end with uncertainty or a question to invite model response

Format your response as a JSON array with objects containing: title, description, and prompt.`

    const userPrompt = `Story ID: ${storyId}

Conversation History:
${conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

Model A Response: ${modelResponses.modelA}

Model B Response: ${modelResponses.modelB}

Based on these two different AI responses, generate 3 next step choices that:
1. Are written in FIRST-PERSON PAST TENSE, describing what the user already did based on the model advice
2. Reference specific advice or suggestions from BOTH models
3. Show what action the user took as a result of the advice
4. PROVIDE FULL CONTEXT - explain WHO they talked to, WHAT they said, WHERE they went, etc.
5. End with uncertainty, a question, or "But then..." to invite the next model response
6. Create meaningful story progression

CRITICAL: The prompt must include specific details about the action taken - WHO was involved, WHAT was said/done, WHERE it happened. Don't leave details vague.

EXAMPLE FORMAT:
BAD: "They encouraged me to stand my ground, but now I'm unsure if I should still reach out to my friend..."
GOOD: "So I reached out to my friend Sarah like you suggested and asked her if she could help me with this situation. I mentioned what you said about standing my ground, and explained the context to her. She said she'd think about it, but then asked me something that made me reconsider..."

BAD: "I called and explained the situation."
GOOD: "I dialed the landlord's office number like you recommended and spoke to the property manager, Ms. Johnson. I calmly explained the noise situation to her, mentioned how it was affecting my sleep for my job interview, and referenced what both of you said about documenting everything. But then she told me something that changed everything..."

Each choice should provide a complete, specific picture of what happened in the next step, not just vague feelings about it.`

    const completion = await openrouter.chat.completions.create({
      model: "openai/gpt-4o-mini", // Use a reliable model for choice generation
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 800,
      temperature: 0.8,
    })

    const response = completion.choices[0]?.message?.content || ''
    
    // Strip markdown code blocks if present
    let cleanResponse = response.trim()
    if (cleanResponse.startsWith('```json')) {
      cleanResponse = cleanResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '')
    } else if (cleanResponse.startsWith('```')) {
      cleanResponse = cleanResponse.replace(/^```\s*/, '').replace(/\s*```$/, '')
    }
    
    try {
      const choices = JSON.parse(cleanResponse)
      if (Array.isArray(choices) && choices.length >= 3) {
        return choices.slice(0, 3)
      }
    } catch (parseError) {
      console.error('Failed to parse choices JSON:', parseError)
      console.error('Raw response:', response)
      console.error('Cleaned response:', cleanResponse)
    }

    // Fallback choices if parsing fails
    return [
      {
        title: "Take a direct approach",
        description: "Address the situation head-on with clear communication",
        prompt: "I need to address this situation directly and clearly communicate my thoughts and feelings."
      },
      {
        title: "Seek more information",
        description: "Ask questions to better understand the situation before responding",
        prompt: "I want to understand more about what's happening before I decide how to respond."
      },
      {
        title: "Take time to think",
        description: "Step back and give yourself time to process before making a decision",
        prompt: "I need some time to think about this and process my feelings before responding."
      }
    ]
  } catch (error) {
    console.error('Error generating next choices:', error)
    
    // Fallback choices
    return [
      {
        title: "Take a direct approach",
        description: "Address the situation head-on with clear communication",
        prompt: "I need to address this situation directly and clearly communicate my thoughts and feelings."
      },
      {
        title: "Seek more information",
        description: "Ask questions to better understand the situation before responding",
        prompt: "I want to understand more about what's happening before I decide how to respond."
      },
      {
        title: "Take time to think",
        description: "Step back and give yourself time to process before making a decision",
        prompt: "I need some time to think about this and process my feelings before responding."
      }
    ]
  }
}

export async function generateFinalChoices(
  storyId: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>,
  modelResponses: { modelA: string; modelB: string }
): Promise<Array<{ title: string; description: string; prompt: string }>> {
  try {
    const systemPrompt = `You are an expert at creating story conclusions. Based on the conversation history and the two AI responses, generate 3 different final steps that wrap up this story naturally. Each choice should lead toward a meaningful resolution.

IMPORTANT FORMATTING RULES:
- Return ONLY raw JSON, no markdown formatting, no code blocks, no backticks. Your response must be valid JSON that can be parsed directly.
- Keep descriptions SHORT (1-2 sentences max, under 20 words)
- Prompts must be written in FIRST-PERSON PAST TENSE
- Prompts should feel like natural conclusions to the story
- Each choice should represent a different resolution path

Format your response as a JSON array with objects containing: title, description, and prompt.`

    const userPrompt = `Story ID: ${storyId}

Conversation History:
${conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

Model A Response: ${modelResponses.modelA}

Model B Response: ${modelResponses.modelB}

Generate 3 final step choices that wrap up this story naturally:
1. Are written in FIRST-PERSON PAST TENSE
2. Lead toward different meaningful resolutions to the story
3. Show the user taking final action based on the advice they received
4. Feel like natural conclusions to the narrative

Each choice should provide a clear resolution path while staying true to the story's emotional arc.`

    const completion = await openrouter.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 800,
      temperature: 0.8,
    })

    const response = completion.choices[0]?.message?.content || ''
    
    // Strip markdown code blocks if present
    let cleanResponse = response.trim()
    if (cleanResponse.startsWith('```json')) {
      cleanResponse = cleanResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '')
    } else if (cleanResponse.startsWith('```')) {
      cleanResponse = cleanResponse.replace(/^```\s*/, '').replace(/\s*```$/, '')
    }
    
    try {
      const choices = JSON.parse(cleanResponse)
      if (Array.isArray(choices) && choices.length >= 3) {
        return choices.slice(0, 3)
      }
    } catch (parseError) {
      console.error('Failed to parse final choices JSON:', parseError)
      console.error('Raw response:', response)
      console.error('Cleaned response:', cleanResponse)
    }

    // Fallback choices if parsing fails
    return [
      {
        title: "Resolve and move forward",
        description: "Take action to resolve the situation",
        prompt: "I took the advice and handled it. Now I'm ready to move on."
      },
      {
        title: "Reflect and learn",
        description: "Take time to process what happened",
        prompt: "I reflected on everything that happened. I learned something important from this."
      },
      {
        title: "Accept and continue",
        description: "Accept the outcome and continue forward",
        prompt: "I accepted the situation and decided to keep moving forward."
      }
    ]
  } catch (error) {
    console.error('Error generating final choices:', error)
    
    // Fallback choices
    return [
      {
        title: "Resolve and move forward",
        description: "Take action to resolve the situation",
        prompt: "I took the advice and handled it. Now I'm ready to move on."
      },
      {
        title: "Reflect and learn",
        description: "Take time to process what happened",
        prompt: "I reflected on everything that happened. I learned something important from this."
      },
      {
        title: "Accept and continue",
        description: "Accept the outcome and continue forward",
        prompt: "I accepted the situation and decided to keep moving forward."
      }
    ]
  }
}
