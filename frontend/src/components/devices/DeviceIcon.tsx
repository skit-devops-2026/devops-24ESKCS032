import { Lightbulb, Wind, Thermometer, Lock, Plug, type LucideProps } from 'lucide-react';
import type { DeviceType } from '../../types';
import { cn } from '../../lib/utils';

interface DeviceIconProps {
  type: DeviceType;
  isOn: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const iconMap: Record<DeviceType, React.ComponentType<LucideProps>> = {
  LIGHT:      Lightbulb,
  FAN:        Wind,
  THERMOSTAT: Thermometer,
  LOCK:       Lock,
  PLUG:       Plug,
};

const onColorMap: Record<DeviceType, string> = {
  LIGHT:      'text-device-light',
  FAN:        'text-device-fan',
  THERMOSTAT: 'text-device-thermo',
  LOCK:       'text-device-lock',
  PLUG:       'text-device-plug',
};

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

const animationMap: Record<DeviceType, string> = {
  FAN:        'animate-spin-slow',
  LIGHT:      'animate-bounce-light',
  THERMOSTAT: '',
  LOCK:       '',
  PLUG:       '',
};

export function DeviceIcon({ type, isOn, size = 'md', className }: DeviceIconProps) {
  const Icon = iconMap[type];
  return (
    <Icon
      className={cn(
        sizeMap[size],
        'transition-colors duration-250',
        isOn ? onColorMap[type] : 'text-gray-600',
        isOn ? animationMap[type] : '',
        className,
      )}
    />
  );
}
