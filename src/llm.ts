import { streamText, type LanguageModel, type ModelMessage } from "ai";

export function chat(model: LanguageModel, instructions: string, messages: ModelMessage[]) {
    return streamText({ model, instructions, messages }).textStream;
}
