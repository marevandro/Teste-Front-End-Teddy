import { formatToBRL, parseBRLToNumber } from "../utils/formatters";

const normalizarEspacos = (str: string) => str.replace(/\s/g, ' ');

describe('Funções de formatação monetária', () => {
  describe('formatToBRL', () => {
    it('deve formatar valores inteiros para moeda BRL', () => {
      expect(normalizarEspacos(formatToBRL('1000'))).toBe('R$ 10,00');
      expect(normalizarEspacos(formatToBRL('50000'))).toBe('R$ 500,00');
    });

    it('deve formatar valores decimais para moeda BRL', () => {
      expect(normalizarEspacos(formatToBRL('1234'))).toBe('R$ 12,34');
      expect(normalizarEspacos(formatToBRL('9999'))).toBe('R$ 99,99');
    });

    it('deve lidar com string vazia', () => {
      expect(normalizarEspacos(formatToBRL(''))).toBe('R$ 0,00');
    });

    it('deve lidar com caracteres não numéricos', () => {
      expect(normalizarEspacos(formatToBRL('1a2b3c4'))).toBe('R$ 12,34');
      expect(normalizarEspacos(formatToBRL('R$ 10,50'))).toBe('R$ 10,50');
    });
  });

  describe('parseBRLToNumber', () => {
    it('deve extrair apenas dígitos de string formatada em BRL', () => {
      expect(parseBRLToNumber('R$ 10,00')).toBe('1000');
      expect(parseBRLToNumber('R$ 1.234,56')).toBe('123456');
    });

    it('deve extrair dígitos de strings parcialmente formatadas', () => {
      expect(parseBRLToNumber('10,50')).toBe('1050');
      expect(parseBRLToNumber('1.234')).toBe('1234');
    });

    it('deve lidar com string vazia', () => {
      expect(parseBRLToNumber('')).toBe('');
    });

    it('deve retornar apenas dígitos de conteúdo misto', () => {
      expect(parseBRLToNumber('a1b2c3')).toBe('123');
      expect(parseBRLToNumber('R$ 1.2,3.4')).toBe('1234');
    });
  });
});