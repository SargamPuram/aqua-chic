import 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function generateTheme() {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = 'Suggest weekly fashion themes:';

  try {
    const result = await model.generateContent(prompt);
    console.log('Full result object:', result);
    const text = result.response.candidates[0]?.content.parts[0];
    console.log('Generated text:', text);

    return text;
  } catch (error) {
    console.error('Error generating theme:', error);
    throw error;
  }
}

export { generateTheme };
