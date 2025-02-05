import { TFunction } from 'i18next';

export const getScanTypeLabels = (t: TFunction): Record<number, string> => ({
  1: t('settings.scheduled_scans.scan_types.network_vulnerability'),
  2: t('settings.scheduled_scans.scan_types.web_vulnerability'),
  3: t('settings.scheduled_scans.scan_types.wordpress_vulnerability'),
  4: t('settings.scheduled_scans.scan_types.network_observability'),
});

export const getExecutionFrequencyLabels = (t: TFunction): Record<number, string> => ({
  1: t('settings.scheduled_scans.execution_frequencies.every_day'),
  2: t('settings.scheduled_scans.execution_frequencies.weekly'),
  3: t('settings.scheduled_scans.execution_frequencies.monthly'),
});

export const getDaysOfWeekLabels = (t: TFunction): Record<number, string> => ({
  1: t('settings.scheduled_scans.form.days.monday'),
  2: t('settings.scheduled_scans.form.days.tuesday'),
  3: t('settings.scheduled_scans.form.days.wednesday'),
  4: t('settings.scheduled_scans.form.days.thursday'),
  5: t('settings.scheduled_scans.form.days.friday'),
  6: t('settings.scheduled_scans.form.days.saturday'),
  7: t('settings.scheduled_scans.form.days.sunday'),
});
