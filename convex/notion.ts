"use node"; // This tells Convex to run this on the server
import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { Client } from "@notionhq/client";

export const saveToWaitlist = internalAction({
    args: {
        email: v.string(),
        platform: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        // 1. Connect to Notion using the variable you set in the Dashboard
        const notion = new Client({ auth: process.env.NOTION_API_KEY });

        // 2. Send the data
        await notion.pages.create({
            parent: { database_id: process.env.NOTION_DB_ID! },
            properties: {
                "Email": {
                    title: [{ text: { content: args.email } }]
                },
                "Platform": {
                    rich_text: [{ text: { content: args.platform || "Web" } }]
                },
                "Status": {
                    select: { name: "New" }
                }
            },
        });

        return { success: true };
    },
});