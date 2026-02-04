import { describe, it, expect } from 'vitest';
import { validateDate, validateIPV6 } from './validators';

// First function to test: validateDate
describe('validators', () => {
  // test the validateDate function
  describe('validateDate', () => {
    it('should return a Date object for valid French date format', () => {
      const result = validateDate('31/12/2023');
      expect(result).toBeInstanceOf(Date);
      expect(result?.getFullYear()).toBe(2023);
      expect(result?.getMonth()).toBe(11); // December is 11 (0-indexed)
      expect(result?.getDate()).toBe(31);
    });

    it('should return null for invalid date', () => {
      expect(validateDate('32/12/2023')).toBeNull(); // Invalid day
      expect(validateDate('31/13/2023')).toBeNull(); // Invalid month
      expect(validateDate('31/12/abc')).toBeNull(); // Invalid year
    });

    it('should return null for invalid format', () => {
      expect(validateDate('12-31-2023')).toBeNull();
      expect(validateDate('2023/12/31')).toBeNull();
      expect(validateDate('')).toBeNull();
    });

    it('should handle leap years correctly', () => {
      expect(validateDate('29/02/2024')).toBeInstanceOf(Date); // 2024 is leap year
      expect(validateDate('29/02/2023')).toBeNull(); // 2023 is not leap year
    });

    it('should validate different months with correct days', () => {
      expect(validateDate('31/01/2023')).toBeInstanceOf(Date); // January has 31 days
      expect(validateDate('30/04/2023')).toBeInstanceOf(Date); // April has 30 days
      expect(validateDate('31/04/2023')).toBeNull(); // April does not have 31 days
    });
  });

  describe('validateIPV6', () => {
    it('should return true for valid IPv6 addresses', () => {
      expect(validateIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
      expect(validateIPV6('::1')).toBe(true);
      expect(validateIPV6('::ffff:192.0.2.1')).toBe(true);
      expect(validateIPV6('2001:db8::1')).toBe(true);
    });

    it('should return false for invalid IPv6 addresses', () => {
      expect(validateIPV6('192.168.1.1')).toBe(false); // IPv4
      expect(validateIPV6('2001:0db8:85a3:0000:0000:8a2e:0370')).toBe(false); // Too few groups
      expect(validateIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334:1234')).toBe(false); // Too many groups
      expect(validateIPV6('gggg:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(false); // Invalid characters
      expect(validateIPV6('')).toBe(false);
    });
  });
});