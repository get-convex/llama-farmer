// NOTE: You can remove this file. Declaring the shape
// of the database is entirely optional in Convex.
// See https://docs.convex.dev/database/schemas.

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { literals } from "convex-helpers/validators";
import { rateLimitTables } from "convex-helpers/server/rateLimit";

export default defineSchema(
  {
    ...rateLimitTables,
    users: defineTable({
      name: v.string(),
    }),
    sessions: defineTable({
      userId: v.id("users"),
      sessionId: v.string(),
    }).index("sessionId", ["sessionId"]),
    threads: defineTable({
      uuid: v.string(),
      summary: v.optional(v.string()),
      summarizer: v.optional(v.id("_scheduled_functions")),
      // summaryEmbeddingId: v.optional(v.id("threadSummaryEmbeddings")),
    }).index("uuid", ["uuid"]),
    // .index("summaryEmbeddingId", ["summaryEmbeddingId"]),
    threadMembers: defineTable({
      threadId: v.id("threads"),
      userId: v.id("users"),
    })
      .index("threadId", ["threadId", "userId"])
      .index("userId", ["userId"]),
    // .index("threadId", ["threadId"]),
    messages: defineTable({
      message: v.string(),
      threadId: v.id("threads"),
      // imageId: v.optional(v.id("images")),
      author: v.union(
        v.object({
          role: v.literal("system"),
        }),
        v.object({
          role: v.literal("assistant"),
          context: v.array(v.id("messages")),
          model: v.optional(v.string()),
        }),
        v.object({
          role: v.literal("user"),
          userId: v.id("users"),
        }),
      ),
      state: literals("success", "generating", "failed"),
    })
      .index("state", ["state", "author.userId"])
      .index("threadId", ["threadId"]),
    jobs: defineTable({
      work: v.object({
        responseId: v.id("messages"),
        stream: v.boolean(),
      }),
      status: literals(
        "pending",
        "inProgress",
        "success",
        "failed",
        "timedOut",
      ),
      lastUpdate: v.number(),
      workerId: v.optional(v.id("workers")),
      janitorId: v.optional(v.id("_scheduled_functions")),
      start: v.optional(v.number()),
      end: v.optional(v.number()),
    })
      .index("responseId", ["work.responseId"])
      .index("status", ["status", "lastUpdate"]),
    workers: defineTable({
      apiKey: v.string(),
      name: v.optional(v.string()),
      lastSeen: v.number(),
    }).index("apiKey", ["apiKey"]),
  },
  // If you ever get an error about schema mismatch
  // between your data and your schema, and you cannot
  // change the schema to match the current data in your database,
  // you can:
  //  1. Use the dashboard to delete tables or individual documents
  //     that are causing the error.
  //  2. Change this option to `false` and make changes to the data
  //     freely, ignoring the schema. Don't forget to change back to `true`!
  { schemaValidation: true },
);
