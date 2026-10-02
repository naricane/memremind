import { streamText, type LanguageModel } from "ai";

export function chat(model: LanguageModel, instructions: string, prompt: string) {
    return streamText({ model, instructions, prompt }).textStream;
}
