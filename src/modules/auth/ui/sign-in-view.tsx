'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { signinSchema, SignInSchema } from '../validation/signin-schema';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
});

export default function SignInView() {
  const form = useForm<SignInSchema>({
    mode: 'all',
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation(trpc.auth.login.mutationOptions());

  function onSubmit(values: SignInSchema) {
    mutate(values, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
        toast.success('Login successfully');
        router.push('/');
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="bg-[#f4f4f0] min-h-screen w-full lg:col-span-3 overflow-y-hidden">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 p-4 lg:p-16"
          >
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/"
                className={cn(
                  'text-2xl font-semibold',
                  poppins.className,
                  isPending && 'pointer-events-none'
                )}
              >
                funroad
              </Link>
              <Link
                prefetch
                href="/sign-up"
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'sm' }),
                  'text-base border-none underline',
                  isPending && 'pointer-events-none'
                )}
              >
                Sign up
              </Link>
            </div>
            <h1 className="text-4xl font-medium">Welcome back to funroad</h1>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      disabled={isPending}
                      placeholder="jhon@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={isPending}
                      placeholder="******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isPending}
              variant="elevated"
              size="lg"
              className="bg-black text-white hover:bg-pink-400 hover:text-primary"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
      <div
        className="min-h-screen w-full lg:col-span-2 hidden lg:block"
        style={{
          backgroundImage: "url('/auth-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
}
