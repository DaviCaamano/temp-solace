'use client';

import { useCallback } from 'react';
import { LocalStorage } from '@interface/cookie';
import add from 'date-fns/add';
import { useEditor } from '@hooks/context/useEditor';
import { useRouter } from 'next/navigation';
const MINIMUM_CONTENT_WORTH_SAVING = 2;
export const LoginLink = ({ show }: { show: boolean }) => {
  const router = useRouter();
  const { editor } = useEditor();

  const onClick = useCallback(() => {
    if (editor.content?.length > MINIMUM_CONTENT_WORTH_SAVING) {
      localStorage.setItem(LocalStorage.editorContent, editor.content);
      localStorage.setItem(LocalStorage.expiration, add(new Date(), { days: 7 }).toString());
    }
    router.push('https://temp-solace-web.vercel.app/api/auth/login');
  }, [editor.content, router]);

  return (
    <span
      className={`absolute right-5 text-xl text-latte cursor-pointer hover:underline fade_7 ${
        !show && 'fadeOut pointer-events-none'
      }`}
      onClick={onClick}
    >
      Login
    </span>
  );
};
