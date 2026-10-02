import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { streamText, type LanguageModel } from "ai";

export type LlamaConfig = {
    baseURL: string;
    modelName: string;
};

export function createModel(config: LlamaConfig): LanguageModel {
    const llama = createOpenAICompatible({
        name: "llama.cpp",
        baseURL: `${config.baseURL}/v1`,
    });
    return llama(config.modelName);
}

export function chat(model: LanguageModel, instructions: string, prompt: string) {
    return streamText({ model, instructions, prompt }).textStream;
}

const baseURL = process.env.LLAMA_URL;
if (!baseURL) {
    throw new Error("LLAMA_URL is not set");
}

const modelName = process.env.LLAMA_MODEL;
if (!modelName) {
    throw new Error("LLAMA_MODEL is not set");
}

const llamaConfig = { baseURL, modelName };
const model = createModel(llamaConfig);

process.stdout.write("> ");
for await (const line of console) {
    const input = line.trim();
    if (input) {
        for await (const chunk of chat(model, "You are a helpful assistant.", input)) {
            process.stdout.write(chunk);
        }
        process.stdout.write("\n");
    }
    process.stdout.write("> ");
}
