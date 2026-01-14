import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const join = mutation({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        // Check if email already exists to prevent duplicates (optional but good practice)
        const existing = await ctx.db
            .query("waitlist")
            .filter((q) => q.eq(q.field("email"), args.email))
            .first();

        if (existing) {
            return existing._id;
        }

        const newId = await ctx.db.insert("waitlist", { email: args.email });
        return newId;
    },
});
