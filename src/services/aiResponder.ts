import { sendMessage } from './chatService';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const checkForAutoReply = async (lastMessage: string, email?: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You're a professional portfolio auto-responder. 
          Respond politely to messages received on a portfolio website.
          Keep responses under 2 sentences unless technical details are needed.`
        },
        {
          role: "user",
          content: lastMessage
        }
      ],
      temperature: 0.7
    });

    const aiResponse = response.choices[0].message.content;
    if (aiResponse) {
      await sendMessage(aiResponse, 'admin', {
        email,
        isAutoReply: true
      });
    }
  } catch (error) {
    console.error("AI Responder Error:", error);
    // Fallback to basic response
    await sendMessage(
      "Thanks for your message! I'll get back to you soon.", 
      'admin',
      { email, isAutoReply: true }
    );
  }
};