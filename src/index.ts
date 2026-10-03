import { createModel, loadLlamaConfig } from "./model/llama";
import { chat } from "./llm";
import type { ModelMessage } from "ai";
import { addAssistantMsg, addUserMsg } from "./history";

const model = createModel(loadLlamaConfig());
let messages: ModelMessage[] = [];

process.stdout.write("> ");
for await (const line of console) {
    const input = line.trim();
    if (input) {
        messages = addUserMsg(input, messages);

        let text = "";
        for await (const chunk of chat(model, "You are a helpful assistant.", messages)) {
            process.stdout.write(chunk);
            text += chunk;
        }
        messages = addAssistantMsg(text, messages);
        process.stdout.write("\n");
    }
    console.log(messages);
    process.stdout.write("> ");
}
