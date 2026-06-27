import { describe, it, expect } from 'vitest';
import { journalFormSchema } from '@/lib/validations';

describe('Journal Validation', () => {
  it('should fail when journal is empty', () => {
    const result = journalFormSchema.safeParse({ content: '' });
    expect(result.success).toBe(false);
  });

  it('should fail when journal is below minimum length', () => {
    const result = journalFormSchema.safeParse({ content: 'Too short' });
    expect(result.success).toBe(false);
  });

  it('should fail gracefully when journal is extremely large', () => {
    const hugeContent = 'a'.repeat(6000); // Exceeds max 5000
    const result = journalFormSchema.safeParse({ content: hugeContent });
    expect(result.success).toBe(false);
  });

  it('should pass validation for a valid journal', () => {
    const validContent = 'Today I felt really stressed about my upcoming physics exam, but I managed to study for 3 hours.';
    const result = journalFormSchema.safeParse({ content: validContent });
    expect(result.success).toBe(true);
  });
});
