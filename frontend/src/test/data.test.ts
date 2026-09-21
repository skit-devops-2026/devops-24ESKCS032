import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { MOCK_USERS, MOCK_ROOMS, MOCK_DEVICES, MOCK_HOMES } from '../mock/data.ts';

describe('Mock Data Integrity', () => {
  it('should provide default admin and regular user accounts', () => {
    assert.ok(MOCK_USERS.length >= 2);
    const admin = MOCK_USERS.find(u => u.role === 'ADMIN');
    const user = MOCK_USERS.find(u => u.role === 'USER');

    assert.ok(admin, 'Admin user should exist');
    assert.equal(admin?.email, 'admin@smarthome.io');
    assert.ok(user, 'Standard user should exist');
    assert.equal(user?.email, 'user@smarthome.io');
  });

  it('should contain valid rooms linked to a home', () => {
    assert.ok(MOCK_ROOMS.length > 0);
    const homeIds = new Set(MOCK_HOMES.map(h => h.id));
    for (const room of MOCK_ROOMS) {
      assert.ok(room.id, 'Room must have an ID');
      assert.ok(room.name, 'Room must have a name');
      assert.ok(homeIds.has(room.homeId), `Room ${room.id} must reference a valid home`);
    }
  });

  it('should contain valid devices linked to existing rooms', () => {
    assert.ok(MOCK_DEVICES.length > 0);
    const roomIds = new Set(MOCK_ROOMS.map(r => r.id));
    const validTypes = ['LIGHT', 'FAN', 'THERMOSTAT', 'LOCK', 'PLUG'];

    for (const device of MOCK_DEVICES) {
      assert.ok(device.id, 'Device must have an ID');
      assert.ok(device.name, 'Device must have a name');
      assert.ok(validTypes.includes(device.type), `Device type ${device.type} must be valid`);
      assert.ok(roomIds.has(device.roomId), `Device ${device.id} must reference a valid room`);
      assert.ok(device.state, 'Device must have a state object');
    }
  });
});
