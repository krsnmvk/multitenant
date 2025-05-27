import Navbar from '@/modules/checkout/components/navbar';
import Footer from '@/modules/tenants/components/footer';

type Props = {
  children: Readonly<React.ReactNode>;
  params: Promise<{ slug: string }>;
};

export default async function TenantsCheckoutLayout({
  children,
  params,
}: Props) {
  const { slug } = await params;

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f4f0]">
      <Navbar slug={slug} />
      <div className="flex-1">
        <div className="max-w-(--breakpoint-xl) mx-auto">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
