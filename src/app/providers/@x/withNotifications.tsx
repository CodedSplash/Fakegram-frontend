'use client';

import { AlertsType } from '@/shared/ui';
import { Alert, AlertTitle, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { createContext, Dispatch, FC, ReactNode, ReactPortal, SetStateAction, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
}

export const NotificationsContext = createContext<Dispatch<SetStateAction<AlertsType>> | null>(null);

export const NotificationsProvider: FC<Props> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertsType>([]);
  const [alertPortal, setAlertPortal] = useState<ReactPortal | null>(null);

  useEffect(() => {
    if (alerts.length > 5) setAlerts((prev) => [...prev.slice(1)]);

    setAlertPortal(
      createPortal(
        <Box className={'notificationsContainer'}>
          <motion.ul initial='hidden' animate='visible' transition={{ duration: 2 }}>
            {alerts.map((alert, index) => (
              <motion.li
                className={'notificationsLi'}
                variants={{ visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: -100 } }}
                key={`${alert.severity}${alert.text}${index}${Date.now()}`}
              >
                <Alert
                  variant={alert.variant || 'filled'}
                  severity={alert.severity}
                  icon={alert.icon || undefined}
                  onClose={alert.onClose || undefined}
                  onClick={alert.onClick || undefined}
                  action={alert.action || undefined}
                >
                  {alert.alertTitle && <AlertTitle>{alert.alertTitle}</AlertTitle>}
                  {alert.text}
                </Alert>
              </motion.li>
            ))}
          </motion.ul>
        </Box>,
        document.body,
      ),
    );
  }, [alerts]);

  return (
    <>
      {alertPortal}
      <NotificationsContext.Provider value={setAlerts}>{children}</NotificationsContext.Provider>
    </>
  );
};
