import CheckoutUi from '@/modules/checkout/ui/checkout-ui';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  return <CheckoutUi tenantSlug={slug} />;
}
