import type { ModelMessage } from "ai";

export function addUserMsg(content: string, messages: ModelMessage[]): ModelMessage[] {
    return [...messages, { role: "user", content }];
}

export function addAssistantMsg(content: string, messages: ModelMessage[]): ModelMessage[] {
    return [...messages, { role: "assistant", content }];
}
