import * as z from 'zod';

import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import { headers as getHeaders } from 'next/headers';
import { TRPCError } from '@trpc/server';
import { generateCookies } from '../utils';

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();

    return await ctx.db.auth({ headers });
  }),

  register: baseProcedure
    .input(
      z.object({
        username: z.string().min(3).trim(),
        email: z.string().email(),
        password: z.string().min(6).trim(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.db.find({
        collection: 'users',
        limit: 1,
        where: {
          username: {
            equals: input.username,
          },
        },
      });

      const exisingUser = user.docs[0];

      if (exisingUser) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Username already taken',
        });
      }

      await ctx.db.create({
        collection: 'users',
        data: {
          username: input.username,
          email: input.email,
          password: input.password,
        },
      });

      const data = await ctx.db.login({
        collection: 'users',
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Failed to login',
        });
      }

      await generateCookies({
        prefix: ctx.db.config.cookiePrefix,
        value: data.token,
      });
    }),

  login: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6).trim(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const data = await ctx.db.login({
        collection: 'users',
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Failed to login',
        });
      }

      await generateCookies({
        prefix: ctx.db.config.cookiePrefix,
        value: data.token,
      });

      return data;
    }),
});
