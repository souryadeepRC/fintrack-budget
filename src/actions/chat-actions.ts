'use server';

import Groq from 'groq-sdk';

import { Expense } from '@/types';

const groq = new Groq({
  apiKey: process.env.NEXT_GROQ_API_KEY,
});

export async function askGroqAction(messages: { role: string; content: string }[], expensesContext: Expense[]) {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const systemMessage = {
      role: 'system',
      content: `You are Fintract AI, a smart personal finance assistant.
The user's current month expenses are provided below as a JSON array:
${JSON.stringify(expensesContext)}

Your capabilities:
1. Analyze the expenses and provide a clear, concise breakup when asked.
2. Identify the highest spending categories and single out large transactions.
3. Provide actionable best practices and financial advice.
4. Help the user add a new expense through natural conversation.

WHEN THE USER ASKS TO ADD AN EXPENSE:
Extract the details (title, amount, category, mode, date). 
- Category MUST be one of: Food & Dining, Groceries, Transport, Shopping, Bills & Utilities, Entertainment, Health, Travel, EMI, Investment, Other. 
- Mode MUST be one of: Credit Card, Debit Card, Cash, Bank Transfer, Google Pay, PhonePe.
- If the date is not specified, use today's date: ${today}.

To execute the addition, append EXACTLY this syntax at the very end of your response:
<<<ADD_EXPENSE:{"title":"...","amount":100,"category":"...","mode":"...","date":"..."}>>>
`,
    };

    const chatCompletion = await groq.chat.completions.create({
      messages: [systemMessage, ...messages] as any,
      model: 'llama-3.1-8b-instant',
      temperature: 0.5,
      max_completion_tokens: 1024,
    });

    return {
      content: chatCompletion.choices[0]?.message?.content || '',
      success: true,
    };
  } catch (error: any) {
    console.error('Groq API Error:', error);
    return { error: error.message, success: false };
  }
}