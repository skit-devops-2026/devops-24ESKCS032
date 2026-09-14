import React, { createContext, useContext, useState, useCallback } from 'react';
import type {
  Device, Room, AutomationRule, AppNotification, DeviceLog,
  LightState, FanState, ThermostatState, LockState, PlugState,
} from '../types';
import {
  MOCK_DEVICES, MOCK_ROOMS, MOCK_RULES, MOCK_NOTIFICATIONS, MOCK_DEVICE_LOGS,
} from '../mock/data';

interface DeviceContextType {
  devices: Device[];
  rooms: Room[];
  rules: AutomationRule[];
  notifications: AppNotification[];
  deviceLogs: DeviceLog[];
  unreadCount: number;
  // Actions
  toggleDevice: (deviceId: string) => void;
  setLightBrightness: (deviceId: string, brightness: number) => void;
  setFanSpeed: (deviceId: string, speed: 'LOW' | 'MEDIUM' | 'HIGH') => void;
  setThermostatTemp: (deviceId: string, temp: number) => void;
  setThermostatMode: (deviceId: string, mode: ThermostatState['mode']) => void;
  toggleLock: (deviceId: string) => void;
  toggleRule: (ruleId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
  dismissNotification: (id: string) => void;
  getRoomDevices: (roomId: string) => Device[];
  getDevice: (deviceId: string) => Device | undefined;
}

const DeviceContext = createContext<DeviceContextType | null>(null);

function logChange(
  logs: DeviceLog[],
  device: Device,
  newState: Device['state'],
  roomName: string,
): DeviceLog[] {
  const entry: DeviceLog = {
    id: `log_${Date.now()}`,
    deviceId: device.id,
    deviceName: device.name,
    roomName,
    previousState: device.state,
    newState,
    timestamp: new Date().toISOString(),
    triggeredBy: 'USER',
  };
  return [entry, ...logs].slice(0, 50); // keep last 50
}

export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const [devices, setDevices] = useState<Device[]>(MOCK_DEVICES);
  const [rooms] = useState<Room[]>(MOCK_ROOMS);
  const [rules, setRules] = useState<AutomationRule[]>(MOCK_RULES);
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);
  const [deviceLogs, setDeviceLogs] = useState<DeviceLog[]>(MOCK_DEVICE_LOGS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getRoomDevices = useCallback(
    (roomId: string) => devices.filter(d => d.roomId === roomId),
    [devices],
  );

  const getDevice = useCallback(
    (deviceId: string) => devices.find(d => d.id === deviceId),
    [devices],
  );

  const updateDevice = useCallback((deviceId: string, updater: (d: Device) => Device) => {
    setDevices(prev =>
      prev.map(d => (d.id === deviceId ? { ...updater(d), lastUpdated: new Date().toISOString() } : d)),
    );
  }, []);

  const getRoomName = useCallback(
    (roomId: string) => rooms.find(r => r.id === roomId)?.name ?? 'Unknown Room',
    [rooms],
  );

  const toggleDevice = useCallback((deviceId: string) => {
    setDevices(prev => prev.map(d => {
      if (d.id !== deviceId) return d;
      let newState: Device['state'];
      switch (d.type) {
        case 'LIGHT':    newState = { ...(d.state as LightState),    on: !(d.state as LightState).on }; break;
        case 'FAN':      newState = { ...(d.state as FanState),      on: !(d.state as FanState).on }; break;
        case 'THERMOSTAT': newState = { ...(d.state as ThermostatState), on: !(d.state as ThermostatState).on }; break;
        case 'PLUG':     newState = { ...(d.state as PlugState),     on: !(d.state as PlugState).on }; break;
        case 'LOCK':     return d; // locks use toggleLock
        default:         return d;
      }
      setDeviceLogs(logs => logChange(logs, d, newState, getRoomName(d.roomId)));
      return { ...d, state: newState, lastUpdated: new Date().toISOString() };
    }));
  }, [getRoomName]);

  const setLightBrightness = useCallback((deviceId: string, brightness: number) => {
    updateDevice(deviceId, d => ({ ...d, state: { ...(d.state as LightState), brightness } }));
  }, [updateDevice]);

  const setFanSpeed = useCallback((deviceId: string, speed: 'LOW' | 'MEDIUM' | 'HIGH') => {
    updateDevice(deviceId, d => ({ ...d, state: { ...(d.state as FanState), speed } }));
  }, [updateDevice]);

  const setThermostatTemp = useCallback((deviceId: string, targetTemp: number) => {
    updateDevice(deviceId, d => ({ ...d, state: { ...(d.state as ThermostatState), targetTemp } }));
  }, [updateDevice]);

  const setThermostatMode = useCallback((deviceId: string, mode: ThermostatState['mode']) => {
    updateDevice(deviceId, d => ({ ...d, state: { ...(d.state as ThermostatState), mode } }));
  }, [updateDevice]);

  const toggleLock = useCallback((deviceId: string) => {
    setDevices(prev => prev.map(d => {
      if (d.id !== deviceId) return d;
      const ls = d.state as LockState;
      const newState: LockState = { locked: !ls.locked, lastChanged: new Date().toISOString() };
      setDeviceLogs(logs => logChange(logs, d, newState, getRoomName(d.roomId)));
      return { ...d, state: newState, lastUpdated: new Date().toISOString() };
    }));
  }, [getRoomName]);

  const toggleRule = useCallback((ruleId: string) => {
    setRules(prev => prev.map(r => (r.id === ruleId ? { ...r, enabled: !r.enabled } : r)));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <DeviceContext.Provider value={{
      devices, rooms, rules, notifications, deviceLogs, unreadCount,
      toggleDevice, setLightBrightness, setFanSpeed,
      setThermostatTemp, setThermostatMode, toggleLock,
      toggleRule, markNotificationRead, markAllRead, dismissNotification,
      getRoomDevices, getDevice,
    }}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevices() {
  const ctx = useContext(DeviceContext);
  if (!ctx) throw new Error('useDevices must be used inside DeviceProvider');
  return ctx;
}
