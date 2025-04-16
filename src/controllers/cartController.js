import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = '<Your Key>';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-thinking-exp-01-21"
});

const cartServices = {
    generateCartSummary: async (cartItems) => {
        const cartPrompt = `


Itens no carrinho:
${JSON.stringify(cartItems, null, 2)}

Responda de forma clara e objetiva para o cliente final.
        `;
        const prompt = {
            contents: [
                {
                    parts: [
                        { text: cartPrompt }
                    ]
                }
            ]
        };

        try {
            const response = await model.generateContent(prompt);
            return response.response.text();
        } catch (error) {
            console.error("Erro ao gerar resumo do carrinho:", error);
            throw error;
        }
    },

    analyzeCartBehavior: async (cartHistory, userPreferences) => {
        const promptText = `


Histórico de carrinho:
${JSON.stringify(cartHistory, null, 2)}

Preferências do usuário:
${JSON.stringify(userPreferences, null, 2)}

Retorne suas análises em forma de parágrafos objetivos.
        `;
        const prompt = {
            contents: [
                {
                    parts: [
                        { text: promptText }
                    ]
                }
            ]
        };

        try {
            const response = await model.generateContent(prompt);
            return response.response.text();
        } catch (error) {
            console.error("Erro ao analisar comportamento de carrinho:", error);
            throw error;
        }
    }
};

export default cartServices;
