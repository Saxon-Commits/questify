import { mutation, query, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

export const getCount = query({
    args: {},
    handler: async (ctx) => {
        const count = await ctx.db.query("waitlist").collect();
        return count.length;
    },
});

export const join = mutation({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        // Check if email already exists to prevent duplicates (optional but good practice)
        const existing = await ctx.db
            .query("waitlist")
            .filter((q) => q.eq(q.field("email"), args.email))
            .first();

        if (existing) {
            // Still try to sync to Notion if not already there
            await ctx.scheduler.runAfter(0, internal.notion.saveToWaitlist, {
                email: args.email,
                platform: "Web"
            });
            return existing._id;
        }

        const newId = await ctx.db.insert("waitlist", { email: args.email });

        // Schedule the Notion sync action
        await ctx.scheduler.runAfter(0, internal.notion.saveToWaitlist, {
            email: args.email,
            platform: "Web"
        });

        return newId;
    },
});
