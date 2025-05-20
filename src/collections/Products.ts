import type { CollectionConfig } from 'payload';

export const Products: CollectionConfig = {
  slug: 'products',
  fields: [
    { name: 'name', required: true, type: 'text' },
    {
      name: 'price',
      type: 'number',
      required: true,
      admin: {
        description: 'in USD',
      },
    },
    { name: 'description', type: 'text' },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'refundPolicy',
      type: 'select',
      options: ['30-day', '14-day', '3-day', '1-day', 'no-refunds'],
      defaultValue: '30-day',
    },
  ],
};
