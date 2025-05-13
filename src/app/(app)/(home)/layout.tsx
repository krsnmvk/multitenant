import { Props } from '@/utils/props';
import Navbar from './_components/navbar';
import Footer from './_components/footer';

export default function HomeLayout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
}
