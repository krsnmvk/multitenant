import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';

export default function Home() {
  return (
    <div className="p-5 space-y-5">
      <Button variant="elevated">I am a button</Button>
      <Input placeholder="I am an input" />
      <Progress value={60} />
      <Textarea placeholder="I am an textarea" />
      <Checkbox />
    </div>
  );
}
