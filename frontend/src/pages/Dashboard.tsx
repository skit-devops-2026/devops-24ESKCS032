import { useNavigate } from 'react-router-dom';
import { Activity, Zap, Cpu, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useDevices } from '../context/DeviceContext';
import { RoomCard } from '../components/rooms/RoomCard';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { DeviceIcon } from '../components/devices/DeviceIcon';
import { formatDistanceToNow } from '../lib/time';
import { cn } from '../lib/utils';
import type { Device, LightState, FanState, ThermostatState, PlugState } from '../types';

function isDeviceOn(device: Device): boolean {
  switch (device.type) {
    case 'LIGHT':      return (device.state as LightState).on;
    case 'FAN':        return (device.state as FanState).on;
    case 'THERMOSTAT': return (device.state as ThermostatState).on;
    case 'PLUG':       return (device.state as PlugState).on;
    default:           return false;
  }
}

export function Dashboard() {
  const { user } = useAuth();
  const { devices, rooms, rules, deviceLogs, notifications } = useDevices();
  const navigate = useNavigate();

  const totalDevices = devices.length;
  const activeDevices = devices.filter(d => d.online && isDeviceOn(d)).length;
  const activeRules = rules.filter(r => r.enabled).length;
  const unreadNotifs = notifications.filter(n => !n.read).length;

  // Estimated energy: sum up plug wattage, add estimates for others
  const estimatedWatts = devices
    .filter(d => d.online && isDeviceOn(d))
    .reduce((sum, d) => {
      if (d.type === 'PLUG') return sum + (d.state as PlugState).wattage;
      if (d.type === 'THERMOSTAT') return sum + 1000;
      if (d.type === 'LIGHT') return sum + 10;
      if (d.type === 'FAN') return sum + 50;
      return sum;
    }, 0);
  const estimatedKwh = (estimatedWatts / 1000).toFixed(2);

  const stats = [
    { label: 'Total Devices',  value: totalDevices,   sub: 'across all rooms',  icon: Cpu,        color: 'cyan' as const },
    { label: 'Active Now',     value: activeDevices,   sub: 'devices running',   icon: Activity,   color: 'green' as const },
    { label: 'Active Rules',   value: activeRules,     sub: 'automations on',    icon: Zap,        color: 'amber' as const },
    { label: 'Power Draw',     value: `${estimatedKwh}kW`, sub: 'estimated live', icon: ShieldCheck, color: 'violet' as const },
  ];

  const statColors = {
    cyan:   { bg: 'bg-accent-cyan/10 border-accent-cyan/20',    icon: 'text-accent-cyan',   val: 'text-accent-cyan' },
    green:  { bg: 'bg-accent-green/10 border-accent-green/20',  icon: 'text-accent-green',  val: 'text-accent-green' },
    amber:  { bg: 'bg-accent-amber/10 border-accent-amber/20',  icon: 'text-accent-amber',  val: 'text-accent-amber' },
    violet: { bg: 'bg-accent-violet/10 border-accent-violet/20',icon: 'text-accent-violet', val: 'text-accent-violet' },
  };

  // Active triggered rules
  const firingRules = rules.filter(r => r.enabled && r.lastTriggered);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Good {getTimeGreeting()}, {user?.name.split(' ')[0]} 👋
        </h1>
        <p className="text-sm text-gray-400 mt-1">Here's what's happening at home right now.</p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, sub, icon: Icon, color }) => {
          const c = statColors[color];
          return (
            <Card key={label} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-400 mb-1">{label}</p>
                  <p className={cn('text-2xl font-bold', c.val)}>{value}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{sub}</p>
                </div>
                <div className={cn('flex h-9 w-9 items-center justify-center rounded-xl border', c.bg)}>
                  <Icon className={cn('h-5 w-5', c.icon)} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Room grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-white">Rooms</h2>
          <button
            onClick={() => navigate('/rooms')}
            className="text-xs text-accent-cyan hover:text-accent-cyan-dim transition-colors"
          >
            View all →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map(room => <RoomCard key={room.id} room={room} />)}
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent activity */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">Recent Activity</h2>
            <Badge variant="gray" size="sm">{deviceLogs.length} events</Badge>
          </div>
          <Card className="divide-y divide-surface-border overflow-hidden">
            {deviceLogs.slice(0, 5).map(log => {
              const device = devices.find(d => d.id === log.deviceId);
              if (!device) return null;
              const wasOn = isDeviceOn({ ...device, state: log.newState });
              return (
                <div key={log.id} className="flex items-center gap-3 px-4 py-3 hover:bg-surface-3 transition-colors">
                  <div className={cn(
                    'h-8 w-8 shrink-0 flex items-center justify-center rounded-lg border',
                    'bg-surface-3 border-surface-border',
                  )}>
                    <DeviceIcon type={device.type} isOn={wasOn} size="sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white truncate">
                      {log.deviceName}
                      <span className="text-gray-500 font-normal"> · {log.roomName}</span>
                    </p>
                    <p className="text-[10px] text-gray-500">
                      {log.triggeredBy === 'AUTOMATION' ? '⚡ Automation' : '👤 Manual'}
                      {' · '}{formatDistanceToNow(log.timestamp)}
                    </p>
                  </div>
                  <Badge variant={wasOn ? 'green' : 'gray'} size="sm" dot>
                    {wasOn ? 'ON' : 'OFF'}
                  </Badge>
                </div>
              );
            })}
          </Card>
        </div>

        {/* Active automations */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">Active Automations</h2>
            <button
              onClick={() => navigate('/automation')}
              className="text-xs text-accent-cyan hover:text-accent-cyan-dim transition-colors"
            >
              Manage →
            </button>
          </div>
          <Card className="divide-y divide-surface-border overflow-hidden">
            {firingRules.slice(0, 4).map(rule => (
              <div key={rule.id} className="flex items-center gap-3 px-4 py-3 hover:bg-surface-3 transition-colors">
                <div className="h-8 w-8 shrink-0 flex items-center justify-center rounded-lg bg-accent-cyan/10 border border-accent-cyan/20">
                  <Zap className="h-4 w-4 text-accent-cyan" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{rule.name}</p>
                  <p className="text-[10px] text-gray-500 truncate">{rule.description}</p>
                </div>
                {rule.lastTriggered && (
                  <span className="text-[10px] text-gray-500 shrink-0">
                    {formatDistanceToNow(rule.lastTriggered)}
                  </span>
                )}
              </div>
            ))}
            {firingRules.length === 0 && (
              <p className="px-4 py-6 text-xs text-gray-500 text-center">No active automations</p>
            )}
          </Card>
        </div>
      </div>

      {/* Unread notifications banner */}
      {unreadNotifs > 0 && (
        <Card
          hover
          onClick={() => navigate('/notifications')}
          className="p-4 border-accent-amber/30 bg-accent-amber/5"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">🔔</span>
            <div>
              <p className="text-sm font-medium text-white">
                You have {unreadNotifs} unread notification{unreadNotifs > 1 ? 's' : ''}
              </p>
              <p className="text-xs text-gray-400">Click to view</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

function getTimeGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 18) return 'afternoon';
  return 'evening';
}
