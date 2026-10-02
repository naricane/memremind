import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import type { LanguageModel } from "ai";

export type LlamaConfig = {
    baseURL: string;
    modelName: string;
};

type Env = Record<string, string | undefined>;

function required(env: Env, key: string): string {
    const value = env[key];
    if (!value) {
        throw new Error(`${key} is not set`);
    }
    return value;
}

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
