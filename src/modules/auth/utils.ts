import 'server-only';

import { cookies as getCookies } from 'next/headers';

type Props = {
  prefix: string;
  value: string;
};

export async function generateCookies({ prefix, value }: Props) {
  const cookies = await getCookies();

  cookies.set({
    name: `${prefix}-token`,
    value: value,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
}
