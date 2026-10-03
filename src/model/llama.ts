import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import type { LanguageModel } from "ai";
import { required, type Env } from "../common";

export type LlamaConfig = {
    baseURL: string;
    modelName: string;
};

export function loadLlamaConfig(env: Env = process.env): LlamaConfig {
    return {
        baseURL: required(env, "LLAMA_URL"),
        modelName: required(env, "LLAMA_MODEL"),
    }
}

export function createModel(config: LlamaConfig): LanguageModel {
    const llama = createOpenAICompatible({
        name: "llama.cpp",
        baseURL: `${config.baseURL}/v1`,
    });
    return llama(config.modelName);
}
