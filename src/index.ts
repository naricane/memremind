import { createModel, loadLlamaConfig } from "./model/llama";
import { chat } from "./llm";

const model = createModel(loadLlamaConfig());

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
