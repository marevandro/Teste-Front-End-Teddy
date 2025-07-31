export function formatToBRL(value: string): string {
  const numeric = value.replace(/\D/g, '');
  const number = parseFloat((parseInt(numeric || '0', 10) / 100).toFixed(2));
  
  return number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

export function parseBRLToNumber(value: string): string {
  return value.replace(/\D/g, '');
}