export const formatCurrency = (value: string | number | null | undefined): string => {
  if (value == null) {
    return '$ 0,00';
  }

  value = value.toString().replace(/\D/g, '') || '0';

  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return '$ 0,00';

  return `$ ${(numericValue / 100).toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
