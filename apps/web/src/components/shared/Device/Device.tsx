import { isMobile as deviceIsMobile } from 'react-device-detect';
import { useEffect, useState } from 'react';
import { ReactNode } from 'react';

//For local testing, set to a non-null value to override whether the device is mobile or not.
const override: boolean | null = true;
export const Device = ({
  children,
  showForMobile,
  showForDesktop,
}: {
  children: ReactNode;
  showForMobile?: boolean;
  showForDesktop?: boolean;
}): JSX.Element => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    if (override !== null) {
      setIsMobile(override);
    }
    if (deviceIsMobile) {
      setIsMobile(true);
    }
  }, []);

  const missingDefinition = !showForMobile && !showForDesktop;
  const show = (isMobile && showForMobile) || (!isMobile && showForDesktop) || missingDefinition;
  return show ? <>{children}</> : <></>;
};
