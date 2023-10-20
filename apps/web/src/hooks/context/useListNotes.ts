'use client';

import { useListNotesQuery } from '@context/redux/api/notes/notes.slice';
import { useEffect, useRef } from 'react';
import { User } from '#interfaces/user';

export const useListNotes = (user: User | null | undefined) => {
  const args = useListNotesQuery({ userId: user?.id || '' }, { skip: !user?.id });

  const { isError, error } = args;

  const isErrorRef = useRef<boolean>(isError);
  useEffect(() => {
    if (isErrorRef.current !== isError) {
      isErrorRef.current = isError;
      if (isError) {
        console.error('Note List Error:', error);
      }
    }
  });

  return args;
};
