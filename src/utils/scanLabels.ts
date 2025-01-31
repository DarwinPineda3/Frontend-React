import { TFunction } from 'i18next';

export const getScanTypeLabels = (t: TFunction): Record<number, string> => ({
  1: t('settings.scheduled_scans.scan_types.network_vulnerability'),
  2: t('settings.scheduled_scans.scan_types.web_vulnerability'),
  3: t('settings.scheduled_scans.scan_types.wordpress_vulnerability'),
  4: t('settings.scheduled_scans.scan_types.network_observability'),
});

export const getExecutionFrequencyLabels = (t: TFunction): Record<number, string> => ({
  1: t('settings.scheduled_scans.execution_frequencies.every_day'),
});
