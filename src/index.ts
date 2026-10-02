import { createModel, loadLlamaConfig } from "./model/llama";
import { chat } from "./llm";
import type { ModelMessage } from "ai";

function addUser(content: string, messages: ModelMessage[]): ModelMessage[] {
    return [...messages, { role: "user", content }];
}

function addAssistant(content: string, messages: ModelMessage[]): ModelMessage[] {
    return [...messages, { role: "assistant", content }];
}

const model = createModel(loadLlamaConfig());
let messages: ModelMessage[] = [];

process.stdout.write("> ");
for await (const line of console) {
    const input = line.trim();
    if (input) {
        messages = addUser(input, messages);

        let text = "";
        for await (const chunk of chat(model, "You are a helpful assistant.", messages)) {
            process.stdout.write(chunk);
            text += chunk;
        }
        messages = addAssistant(text, messages);
        process.stdout.write("\n");
    }
    console.log(messages);
    process.stdout.write("> ");
}
