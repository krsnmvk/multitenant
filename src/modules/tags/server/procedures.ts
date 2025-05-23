import * as z from 'zod';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';

export const tagsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(10),
      })
    )
    .query(async ({ input, ctx }) => {
      const data = await ctx.db.find({
        collection: 'tags',
        depth: 1,
        page: input.cursor,
        limit: input.limit,
      });

      return data;
    }),
});
