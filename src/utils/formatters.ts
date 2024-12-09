export const formatCurrency = (value: string | number): string => {
  value = value.toString().replace(/\D/g, '') || '0';

  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return '$ 0,00';

  return `$ ${(numericValue / 100).toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
