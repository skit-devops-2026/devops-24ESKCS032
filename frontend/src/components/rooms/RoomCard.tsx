import { useNavigate } from 'react-router-dom';
import { PowerOff } from 'lucide-react';
import type { Room, Device, LightState, FanState, ThermostatState, PlugState } from '../../types';
import { useDevices } from '../../context/DeviceContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { DeviceIcon } from '../devices/DeviceIcon';
import { cn } from '../../lib/utils';

function isDeviceOn(device: Device): boolean {
  switch (device.type) {
    case 'LIGHT':      return (device.state as LightState).on;
    case 'FAN':        return (device.state as FanState).on;
    case 'THERMOSTAT': return (device.state as ThermostatState).on;
    case 'PLUG':       return (device.state as PlugState).on;
    case 'LOCK':       return false;
    default:           return false;
  }
}

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const { getRoomDevices, toggleDevice } = useDevices();
  const navigate = useNavigate();
  const devices = getRoomDevices(room.id);
  const activeCount = devices.filter(d => d.online && isDeviceOn(d)).length;
  const offlineCount = devices.filter(d => !d.online).length;

  const handleAllOff = (e: React.MouseEvent) => {
    e.stopPropagation();
    devices.forEach(d => {
      if (d.type !== 'LOCK' && d.online && isDeviceOn(d)) {
        toggleDevice(d.id);
      }
    });
  };

  return (
    <Card
      hover
      onClick={() => navigate(`/rooms/${room.id}`)}
      className="p-5 group"
    >
      {/* Room header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{room.icon}</span>
            <h3 className="font-semibold text-white text-base">{room.name}</h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={activeCount > 0 ? 'cyan' : 'gray'}
              size="sm"
              dot={activeCount > 0}
            >
              {activeCount} active
            </Badge>
            {offlineCount > 0 && (
              <Badge variant="orange" size="sm">{offlineCount} offline</Badge>
            )}
          </div>
        </div>
        {activeCount > 0 && (
          <button
            onClick={handleAllOff}
            title="Turn all off"
            className={cn(
              'p-2 rounded-xl text-gray-500 hover:text-accent-red hover:bg-accent-red/10',
              'transition-all opacity-0 group-hover:opacity-100',
            )}
            aria-label="Turn all devices off in this room"
          >
            <PowerOff className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Device mini-grid */}
      <div className="flex flex-wrap gap-2">
        {devices.map(d => {
          const on = d.online && isDeviceOn(d);
          return (
            <div
              key={d.id}
              title={d.name}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-lg border transition-all',
                on
                  ? 'bg-accent-cyan/10 border-accent-cyan/30'
                  : 'bg-surface-3 border-surface-border',
                !d.online && 'opacity-40',
              )}
            >
              <DeviceIcon type={d.type} isOn={on} size="sm" />
            </div>
          );
        })}
        {devices.length === 0 && (
          <p className="text-xs text-gray-600 py-1">No devices</p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-surface-border flex items-center justify-between">
        <span className="text-xs text-gray-500">{devices.length} device{devices.length !== 1 ? 's' : ''}</span>
        <span className="text-xs text-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity">
          View room →
        </span>
      </div>
    </Card>
  );
}
