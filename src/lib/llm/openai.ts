import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

export async function generateOpenAIResponse(
  prompt: string,
  model: string = 'gpt-4',
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<LLMResponse> {
  try {
    const messages = [
      {
        role: 'system' as const,
        content: 'You are a helpful assistant that provides thoughtful, empathetic advice for human situations. Be honest, considerate, and practical in your responses.'
      },
      ...conversationHistory,
      {
        role: 'user' as const,
        content: prompt
      }
    ]

    const completion = await openai.chat.completions.create({
      model,
      messages,
      max_tokens: 1000,
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
    console.error('OpenAI API error:', error)
    throw new Error('Failed to generate response from OpenAI')
  }
}
