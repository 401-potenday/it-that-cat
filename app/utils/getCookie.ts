'use server';
import { cookies } from 'next/headers';

const getCookie = async (name: string) => {
  const cookieStore = cookies();
  const cookie = cookieStore.get(name);

  return cookie;
};

export default getCookie;
