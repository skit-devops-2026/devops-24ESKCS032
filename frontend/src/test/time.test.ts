import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { formatDistanceToNow, formatTimestamp } from '../lib/time.ts';

describe('Time Utility Functions', () => {
  it('should return "just now" for timestamps less than 60 seconds ago', () => {
    const recent = new Date(Date.now() - 15 * 1000).toISOString();
    assert.equal(formatDistanceToNow(recent), 'just now');
  });

  it('should return minutes ago for timestamps under an hour', () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    assert.equal(formatDistanceToNow(fiveMinutesAgo), '5m ago');
  });

  it('should return hours ago for timestamps under 24 hours', () => {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    assert.equal(formatDistanceToNow(twoHoursAgo), '2h ago');
  });

  it('should return days ago for timestamps older than 24 hours', () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
    assert.equal(formatDistanceToNow(threeDaysAgo), '3d ago');
  });

  it('should format ISO timestamp into a readable date string', () => {
    const isoString = '2026-01-15T10:30:00.000Z';
    const formatted = formatTimestamp(isoString);
    assert.ok(formatted.length > 0);
    assert.match(formatted, /Jan/);
  });
});
