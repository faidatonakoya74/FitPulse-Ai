
import { GoogleGenAI, Type } from "@google/genai";
import { Workout, FitnessInsight } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getFitnessInsights = async (workouts: Workout[], goals: string): Promise<FitnessInsight[]> => {
  try {
    const workoutSummary = workouts.slice(0, 5).map(w => 
      `${w.date}: ${w.exercise} (${w.duration}m, ${w.calories} cal)`
    ).join(', ');

    const prompt = `Based on the following workout history: [${workoutSummary}] and the user's goals: "${goals}", generate 3 personalized fitness insights. 
    One should be an encouraging milestone/stat, one a technical tip, and one a motivational push. 
    Return the response as a JSON array of objects with keys: title, advice, type (one of 'encouragement', 'warning', 'tip').`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              advice: { type: Type.STRING },
              type: { type: Type.STRING, enum: ['encouragement', 'warning', 'tip'] }
            },
            required: ['title', 'advice', 'type']
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini AI error:", error);
    return [{
      title: "Keep Moving!",
      advice: "Every step counts. Keep logging your workouts to get personalized AI insights.",
      type: "encouragement"
    }];
  }
};
