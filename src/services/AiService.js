import fs from 'fs';
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = '<Your Key>';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash-thinking-exp-01-21"
});

const ragServices = {
    prompt: async (userPrompt) => {
        const prompt = {
            contents: [
                {
                    parts: [
                        { text: userPrompt }
                    ]
                }
            ]
        };
        try {
            const result = await model.generateContent(prompt, { timeout: 600000 });
            return result.response; // ou `result`, dependendo da estrutura da resposta
        } catch (error) {
            console.error('Error in prompt generation:', error);
            throw error;
        }
    },

    analyzeDocument: async (pdfPath, query) => {
        try {
            // Leitura do PDF (simples, apenas exemplo – você pode usar 'pdf-parse' ou outra lib para extrair texto)
            const fileContent = fs.readFileSync(pdfPath, 'utf-8'); // Supondo que seja um .txt para simplificar

            const combinedContext = `
                Document content:
                ${fileContent}

                Query:
                ${query}
            `;

            const finalPrompt = `
                ${combinedContext}

                Provide a final synthesized answer concisely.
            `;

            const prompt = {
                contents: [
                    {
                        parts: [
                            { text: finalPrompt }
                        ]
                    }
                ]
            };

            const result = await model.generateContent(prompt);
            return result.response;
        } catch (error) {
            console.error('Error analyzing document:', error);
            throw error;
        }
    }
};

export default ragServices;
