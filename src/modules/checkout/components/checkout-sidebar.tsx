import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/format-currency';
import { CircleXIcon } from 'lucide-react';

type Props = {
  total: number;
  onCheckout: () => void;
  isCanceled?: boolean;
  isPending?: boolean;
};

export default function CheckoutSidebar({
  onCheckout,
  total,
  isCanceled,
  isPending,
}: Props) {
  return (
    <div className="border rounded-md flex flex-col bg-white overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h4 className="font-medium text-lg">Total</h4>
        <span className="font-medium text-lg">{formatCurrency(total)}</span>
      </div>
      <div className="p-4 flex items-center justify-center">
        <Button
          onClick={onCheckout}
          disabled={isPending}
          variant="elevated"
          size="lg"
          className="bg-primary text-white hover:bg-pink-400 hover:text-primary w-full"
        >
          Checkout
        </Button>
      </div>
      {isCanceled && (
        <div className="p-4 flex items-center justify-center border-t">
          <div className="bg-red-100 w-full border border-red-400 font-medium px-4 py-3 rounded flex items-center">
            <div className="flex items-center">
              <CircleXIcon className="size-6 fill-red-500 text-red-100" />
              <span>Checkout failed, please try again</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
