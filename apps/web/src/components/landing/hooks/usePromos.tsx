import { useEffect, useRef, useState } from 'react';
import { Promo } from '#interfaces/promo';

export interface UsePromoArgs {
  isLoggedIn: boolean | undefined;
}
export const usePromos = ({ isLoggedIn }: UsePromoArgs) => {
  const [promos, setPromos] = useState<Promo[]>([]);
  const stickyLogin = useRef<boolean | undefined>(undefined);

  useEffect(() => {
    if (isLoggedIn !== stickyLogin.current) {
      stickyLogin.current = isLoggedIn;
      if (!isLoggedIn && !promos.includes(Promo.signup)) {
        setTimeout(() => setPromos((prev: Promo[]) => [...prev, Promo.signup]), 5000);
      }
    }
  }, [isLoggedIn, promos]);
  const closePromo = (promo: Promo) => {
    setPromos((prev: Promo[]) => prev.filter((promoItem) => promoItem !== promo));
  };

  return { promos, setPromos, closePromo };
};
