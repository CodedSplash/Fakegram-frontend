import { NotificationsContext } from '@/app/providers/@x/withNotifications';
import { AlertProps } from '@mui/material';
import { useCallback, useContext, useMemo } from 'react';

interface IAlertData {
  text: string;
  alertTitle?: string;
  variant?: AlertProps['variant'];
  severity: AlertProps['severity'];
  icon?: AlertProps['icon'];
  onClose?: AlertProps['onClose'];
  onClick?: AlertProps['onClick'];
  action?: AlertProps['action'];
}

export type AlertsType = IAlertData[];

type notificationsDataType = Omit<IAlertData, 'severity'>;

export const useNotifications = () => {
  const notificationsContext = useContext(NotificationsContext);

  const success = useCallback(
    (data: notificationsDataType, delay: number = 5000) => {
      if (notificationsContext) {
        notificationsContext((prev) => [...prev, { ...data, severity: 'success' }]);
        setTimeout(() => notificationsContext((prev) => [...prev.slice(1)]), delay);
      }
    },
    [notificationsContext],
  );

  const info = useCallback(
    (data: notificationsDataType, delay: number = 5000) => {
      if (notificationsContext) {
        notificationsContext((prev) => [...prev, { ...data, severity: 'info' }]);
        setTimeout(() => notificationsContext((prev) => [...prev.slice(1)]), delay);
      }
    },
    [notificationsContext],
  );

  const warning = useCallback(
    (data: notificationsDataType, delay: number = 5000) => {
      if (notificationsContext) {
        notificationsContext((prev) => [...prev, { ...data, severity: 'warning' }]);
        setTimeout(() => notificationsContext((prev) => [...prev.slice(1)]), delay);
      }
    },
    [notificationsContext],
  );

  const error = useCallback(
    (data: notificationsDataType, delay: number = 5000) => {
      if (notificationsContext) {
        notificationsContext((prev) => [...prev, { ...data, severity: 'error' }]);
        setTimeout(() => notificationsContext((prev) => [...prev.slice(1)]), delay);
      }
    },
    [notificationsContext],
  );

  return useMemo(() => ({ success, info, warning, error }), [success, info, warning, error]);
};
