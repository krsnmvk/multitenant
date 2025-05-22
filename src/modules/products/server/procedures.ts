import * as z from 'zod';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import { Where } from 'payload';
import { Category } from '@/payload-types';

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const where: Where = {};

      if (input.minPrice) {
        where.price = {
          ...where.price,
          greater_than_equal: input.minPrice,
        };
      }

      if (input.maxPrice) {
        where.price = {
          ...where.price,
          less_than_equal: input.maxPrice,
        };
      }

      if (input.category) {
        const categoriesData = await ctx.db.find({
          collection: 'categories',
          limit: 1,
          depth: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });

        const formattedData = categoriesData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs || []).map((doc) => ({
            ...(doc as Category),
            subcategories: undefined,
          })),
        }));

        const parent = formattedData[0];
        const sub = [];

        if (parent) {
          sub.push(
            ...parent.subcategories.map((subcategory) => subcategory.slug)
          );

          where['category.slug'] = {
            in: [parent.slug, ...sub],
          };
        }
      }

      const data = await ctx.db.find({
        collection: 'products',
        depth: 1,
        where,
      });

      return data;
    }),
});
