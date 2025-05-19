'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signupSchema, SignUpSchema } from '../validation/signup-schema';
import {
  Form,
  FormControl,
  FormDescription,
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

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
});

export default function SignUpView() {
  const form = useForm<SignUpSchema>({
    mode: 'all',
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation(
    trpc.auth.register.mutationOptions()
  );

  function onSubmit(values: SignUpSchema) {
    mutate(values, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
        toast.success('Account created');
        router.push('/');
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  }

  const username = form.watch('username');
  const usernameErrors = form.formState.errors.username;
  const usernamePreview = username && !usernameErrors;

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
                href="/sign-in"
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'sm' }),
                  'text-base border-none underline',
                  isPending && 'pointer-events-none'
                )}
              >
                Sign in
              </Link>
            </div>
            <h1 className="text-4xl font-medium">
              Join over 1,765 creators earning money funroad.
            </h1>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={isPending}
                      placeholder="jhon example"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription
                    className={cn('hidden', usernamePreview && 'block')}
                  >
                    Your store will be available at&nbsp;
                    <strong>{username}</strong>.shop.co.id
                  </FormDescription>
                </FormItem>
              )}
            />
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
              Create Account
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
