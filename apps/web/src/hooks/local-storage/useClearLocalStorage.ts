import { useEffect } from 'react';
import { LocalStorage } from '@interface/cookie';

/**
 * Clear local storage if expired (expiration stored in enum Key [LocalStorage.expiration]
 */
export const useClearLocalStorage = () => {
  useEffect(() => {
    const expiration = localStorage.getItem(LocalStorage.expiration);
    if (expiration && Date.now() > new Date(expiration).getTime()) {
      localStorage.clear();
    }
  }, []);
};
