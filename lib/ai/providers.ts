import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { google } from "@ai-sdk/google";
import { perplexity } from "@ai-sdk/perplexity";
import { isTestEnvironment } from "@/constants/constants";
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from "./models.test";

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        "chat-model": chatModel,
        "chat-model-reasoning": reasoningModel,
        "title-model": titleModel,
        "artifact-model": artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        "chat-model": google("gemini-2.0-flash-thinking-exp-01-21"),
        "chat-model-reasoning": wrapLanguageModel({
          model: google("gemini-2.0-flash-thinking-exp-01-21"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": google("gemini-2.0-flash-thinking-exp-01-21"),
        "artifact-model": google("gemini-2.0-flash-thinking-exp-01-21"),
      },
      // imageModels: {
      //   small: google.imageModel,
      // },
    });
