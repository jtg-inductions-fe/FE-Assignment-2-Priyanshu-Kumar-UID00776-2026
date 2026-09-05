/**
 * Defined the allowed alert styles
 */
export type NotificationSeverity = 'success' | 'error' | 'warning' | 'info';

/**
 * Notification state
 */
export type NotificationState = {
    open: boolean;
    message: string;
    severity: NotificationSeverity;
};
