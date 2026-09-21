import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { cn } from '../lib/utils.ts';

describe('Classname (cn) Utility', () => {
  it('should join single and multiple class names', () => {
    assert.equal(cn('btn', 'btn-primary'), 'btn btn-primary');
  });

  it('should handle conditional and falsy values', () => {
    assert.equal(cn('base', false && 'hidden', null, undefined, 'active'), 'base active');
  });

  it('should resolve conflicting Tailwind CSS classes with tailwind-merge', () => {
    assert.equal(cn('p-4', 'p-2'), 'p-2');
    assert.equal(cn('text-red-500', 'text-blue-500'), 'text-blue-500');
  });
});
