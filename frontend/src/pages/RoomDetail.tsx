import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, PowerOff, WifiOff } from 'lucide-react';
import { useDevices } from '../context/DeviceContext';
import { DeviceCard } from '../components/devices/DeviceCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import type { Device, LightState, FanState, ThermostatState, PlugState } from '../types';
import { cn } from '../lib/utils';

function isDeviceOn(device: Device): boolean {
  switch (device.type) {
    case 'LIGHT':      return (device.state as LightState).on;
    case 'FAN':        return (device.state as FanState).on;
    case 'THERMOSTAT': return (device.state as ThermostatState).on;
    case 'PLUG':       return (device.state as PlugState).on;
    default:           return false;
  }
}

export function RoomDetail() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { rooms, getRoomDevices, toggleDevice } = useDevices();

  const room = rooms.find(r => r.id === roomId);
  const devices = roomId ? getRoomDevices(roomId) : [];
  const activeCount = devices.filter(d => d.online && isDeviceOn(d)).length;
  const offlineCount = devices.filter(d => !d.online).length;

  if (!room) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-4xl mb-3">🏠</p>
        <p className="text-gray-400">Room not found</p>
        <Button variant="ghost" className="mt-4" onClick={() => navigate('/rooms')}>
          Back to Rooms
        </Button>
      </div>
    );
  }

  const handleAllOff = () => {
    devices.forEach(d => {
      if (d.type !== 'LOCK' && d.online && isDeviceOn(d)) toggleDevice(d.id);
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Back + header */}
      <div>
        <button
          onClick={() => navigate('/rooms')}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-4 transition-colors group"
          aria-label="Back to rooms"
        >
          <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
          All Rooms
        </button>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{room.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-white">{room.name}</h1>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Badge variant={activeCount > 0 ? 'cyan' : 'gray'} dot={activeCount > 0}>
                  {activeCount} active
                </Badge>
                <Badge variant="gray">{devices.length} total</Badge>
                {offlineCount > 0 && (
                  <Badge variant="orange">
                    <WifiOff className="h-3 w-3" />
                    {offlineCount} offline
                  </Badge>
                )}
              </div>
            </div>
          </div>
          {activeCount > 0 && (
            <Button variant="danger" size="sm" onClick={handleAllOff} id="room-all-off">
              <PowerOff className="h-4 w-4" />
              Turn all off
            </Button>
          )}
        </div>
      </div>

      {/* Device type filters (visual labels only for Week 1) */}
      <div className="flex gap-2 flex-wrap">
        {['All', 'Lights', 'Fans', 'Thermostats', 'Locks', 'Plugs'].map(f => (
          <Badge key={f} variant="gray" size="md" className="cursor-pointer hover:text-white transition-colors">
            {f}
          </Badge>
        ))}
      </div>

      {/* Device grid */}
      {devices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {devices.map(device => (
            <div key={device.id} className={cn('animate-fade-in', !device.online && 'opacity-70')}>
              <DeviceCard device={device} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-4xl mb-3">💡</p>
          <p className="text-gray-400 text-sm">No devices in this room yet</p>
        </div>
      )}
    </div>
  );
}
