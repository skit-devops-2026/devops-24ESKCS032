import { WifiOff, Minus, Plus } from 'lucide-react';
import type { Device, LightState, FanState, ThermostatState, LockState, PlugState } from '../../types';
import { useDevices } from '../../context/DeviceContext';
import { Card } from '../ui/Card';
import { Toggle } from '../ui/Toggle';
import { Badge } from '../ui/Badge';
import { DeviceIcon } from './DeviceIcon';
import { cn } from '../../lib/utils';
import { formatDistanceToNow } from '../../lib/time';

const glowMap: Record<string, string> = {
  LIGHT:      'device-on-glow-light',
  FAN:        'device-on-glow-fan',
  THERMOSTAT: 'device-on-glow-thermo',
  PLUG:       'device-on-glow-plug',
  LOCK:       'device-on-glow-lock',
};

const bgIconMap: Record<string, string> = {
  LIGHT:      'bg-device-light/10 border-device-light/20',
  FAN:        'bg-device-fan/10 border-device-fan/20',
  THERMOSTAT: 'bg-device-thermo/10 border-device-thermo/20',
  LOCK:       'bg-device-lock/10 border-device-lock/20',
  PLUG:       'bg-device-plug/10 border-device-plug/20',
};

// ── Fan speed button ──────────────────────────────────────────────────────────
function SpeedButton({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex-1 py-1 text-xs font-medium rounded-lg transition-all duration-150',
        active
          ? 'bg-device-fan/20 text-device-fan border border-device-fan/40'
          : 'text-gray-500 hover:text-gray-300 hover:bg-surface-3',
      )}
    >
      {label}
    </button>
  );
}

// ── Thermostat mode button ────────────────────────────────────────────────────
const modeConfig = {
  COOL:     { label: 'Cool',   color: 'text-device-fan' },
  HEAT:     { label: 'Heat',   color: 'text-device-thermo' },
  AUTO:     { label: 'Auto',   color: 'text-accent-green' },
  FAN_ONLY: { label: 'Fan',    color: 'text-accent-violet' },
} as const;

// ── Main DeviceCard ───────────────────────────────────────────────────────────
interface DeviceCardProps {
  device: Device;
  compact?: boolean;
}

export function DeviceCard({ device, compact = false }: DeviceCardProps) {
  const {
    toggleDevice, setLightBrightness, setFanSpeed,
    setThermostatTemp, setThermostatMode, toggleLock,
  } = useDevices();

  const isOn = (() => {
    switch (device.type) {
      case 'LIGHT':      return (device.state as LightState).on;
      case 'FAN':        return (device.state as FanState).on;
      case 'THERMOSTAT': return (device.state as ThermostatState).on;
      case 'PLUG':       return (device.state as PlugState).on;
      case 'LOCK':       return !(device.state as LockState).locked; // locked = "off" visually
      default:           return false;
    }
  })();

  const cardGlow = isOn && device.online ? glowMap[device.type] : '';

  return (
    <Card
      className={cn(
        'p-4 transition-all duration-300 border',
        device.online ? 'border-surface-border' : 'border-surface-border opacity-60',
        isOn && device.online ? cardGlow : '',
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className={cn(
            'flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300',
            isOn && device.online ? bgIconMap[device.type] : 'bg-surface-3 border-surface-border',
          )}>
            <DeviceIcon type={device.type} isOn={isOn && device.online} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-tight">{device.name}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">
              {device.online
                ? formatDistanceToNow(device.lastUpdated)
                : <span className="flex items-center gap-1"><WifiOff className="h-3 w-3" /> Offline</span>
              }
            </p>
          </div>
        </div>
        {device.type !== 'LOCK' && (
          <Toggle
            checked={isOn}
            onChange={() => toggleDevice(device.id)}
            disabled={!device.online}
            size="sm"
            id={`toggle-${device.id}`}
          />
        )}
      </div>

      {/* Controls — by type */}
      {device.online && !compact && (
        <div className="mt-3 space-y-3">
          {/* ── LIGHT ── */}
          {device.type === 'LIGHT' && (() => {
            const s = device.state as LightState;
            return isOn ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Brightness</span>
                  <span className="font-mono text-white">{s.brightness}%</span>
                </div>
                <input
                  type="range" min={1} max={100} value={s.brightness}
                  onChange={e => setLightBrightness(device.id, Number(e.target.value))}
                  aria-label="Brightness"
                />
              </div>
            ) : (
              <p className="text-xs text-gray-600 text-center py-2">Off</p>
            );
          })()}

          {/* ── FAN ── */}
          {device.type === 'FAN' && (() => {
            const s = device.state as FanState;
            return isOn ? (
              <div className="flex gap-1">
                {(['LOW', 'MEDIUM', 'HIGH'] as const).map(speed => (
                  <SpeedButton
                    key={speed}
                    label={speed === 'MEDIUM' ? 'Med' : speed.charAt(0) + speed.slice(1).toLowerCase()}
                    active={s.speed === speed}
                    onClick={() => setFanSpeed(device.id, speed)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-600 text-center py-2">Off</p>
            );
          })()}

          {/* ── THERMOSTAT ── */}
          {device.type === 'THERMOSTAT' && (() => {
            const s = device.state as ThermostatState;
            return (
              <div className="space-y-3">
                {/* Temp display */}
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-[10px] text-gray-500">Current</p>
                    <p className="text-lg font-bold text-white font-mono">{s.currentTemp}°</p>
                  </div>
                  {isOn && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setThermostatTemp(device.id, s.targetTemp - 0.5)}
                        className="h-7 w-7 flex items-center justify-center rounded-lg bg-surface-3 hover:bg-surface-4 text-gray-400 hover:text-white transition-colors"
                        aria-label="Decrease temperature"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <div className="text-center">
                        <p className="text-[10px] text-gray-500">Target</p>
                        <p className="text-lg font-bold text-device-thermo font-mono">{s.targetTemp}°</p>
                      </div>
                      <button
                        onClick={() => setThermostatTemp(device.id, s.targetTemp + 0.5)}
                        className="h-7 w-7 flex items-center justify-center rounded-lg bg-surface-3 hover:bg-surface-4 text-gray-400 hover:text-white transition-colors"
                        aria-label="Increase temperature"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                  {!isOn && <p className="text-xs text-gray-600">Off</p>}
                </div>
                {/* Mode selector */}
                {isOn && (
                  <div className="flex gap-1">
                    {(Object.keys(modeConfig) as Array<keyof typeof modeConfig>).map(mode => (
                      <button
                        key={mode}
                        onClick={() => setThermostatMode(device.id, mode)}
                        className={cn(
                          'flex-1 py-1 text-[10px] font-medium rounded-lg transition-all',
                          s.mode === mode
                            ? `bg-surface-3 border border-surface-border ${modeConfig[mode].color}`
                            : 'text-gray-600 hover:text-gray-300 hover:bg-surface-3',
                        )}
                      >
                        {modeConfig[mode].label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

          {/* ── LOCK ── */}
          {device.type === 'LOCK' && (() => {
            const s = device.state as LockState;
            return (
              <button
                onClick={() => toggleLock(device.id)}
                className={cn(
                  'w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-250',
                  'flex items-center justify-center gap-2',
                  s.locked
                    ? 'bg-accent-green/20 border border-accent-green/40 text-accent-green hover:bg-accent-green/30'
                    : 'bg-accent-red/20 border border-accent-red/40 text-accent-red hover:bg-accent-red/30',
                )}
              >
                <DeviceIcon type="LOCK" isOn={!s.locked} size="sm" />
                {s.locked ? 'Locked' : 'Unlocked — Tap to lock'}
              </button>
            );
          })()}

          {/* ── PLUG ── */}
          {device.type === 'PLUG' && (() => {
            const s = device.state as PlugState;
            return isOn ? (
              <div className="flex items-center justify-between px-1">
                <span className="text-xs text-gray-400">Power draw</span>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold font-mono text-accent-violet">{s.wattage}W</span>
                  <Badge variant="violet" size="sm">Live</Badge>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-600 text-center py-2">Off</p>
            );
          })()}
        </div>
      )}
    </Card>
  );
}
