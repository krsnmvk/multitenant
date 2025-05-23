import * as z from 'zod';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import { Sort, Where } from 'payload';
import { Category, Media } from '@/payload-types';
import { DEFAULT_VALUE, sortValues } from '../constant';

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_VALUE),
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const where: Where = {};
      let sort: Sort = '-createdAt';

      if (input.sort === 'curated') {
        sort = '-createdAt';
      }

      if (input.sort === 'hot_and_new') {
        sort = '+createdAt';
      }

      if (input.sort === 'trending') {
        sort = '-createdAt';
      }

      if (input.minPrice && input.maxPrice) {
        where.price = {
          ...where.price,
          greater_than_equal: input.minPrice,
          less_than_equal: input.maxPrice,
        };
      } else if (input.minPrice) {
        where.price = {
          ...where.price,
          greater_than_equal: input.minPrice,
        };
      } else if (input.maxPrice) {
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

      if (input.tags && input.tags.length > 0) {
        where['tags.name'] = {
          in: input.tags,
        };
      }

      const data = await ctx.db.find({
        collection: 'products',
        depth: 1,
        where,
        sort,
        page: input.cursor,
        limit: input.limit,
      });

      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
        })),
      };
    }),
});
