import type { CollectionConfig } from 'payload';

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'slug',
  },
  fields: [
    {
      name: 'name',
      required: true,
      type: 'text',
      label: 'Store Name',
      admin: {
        description: "This is the name of the store name (e.g Krisno's Store)",
      },
    },
    {
      name: 'slug',
      required: true,
      type: 'text',
      index: true,
      admin: {
        description:
          'This is the subdomain for the store name (e.g. [slug].funroad.com)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'stripeAccountId',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'stripeDetailsSubmitted',
      type: 'checkbox',
      admin: {
        readOnly: true,
        description:
          'You cannot create products until you submit your stripe details',
      },
    },
  ],
};
