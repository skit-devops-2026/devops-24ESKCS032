// ─── User & Auth ────────────────────────────────────────────────────────────

export type UserRole = 'ADMIN' | 'USER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

// ─── Home / Room / Device Hierarchy ─────────────────────────────────────────

export interface Home {
  id: string;
  name: string;
  ownerId: string;
  address?: string;
}

export interface Room {
  id: string;
  name: string;
  homeId: string;
  icon: string; // emoji or icon name
}

export type DeviceType = 'LIGHT' | 'FAN' | 'THERMOSTAT' | 'LOCK' | 'PLUG';

export interface LightState {
  on: boolean;
  brightness: number; // 0–100
  colorTemp: number;  // 2700–6500 K
}

export interface FanState {
  on: boolean;
  speed: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface ThermostatState {
  on: boolean;
  targetTemp: number;  // °C
  currentTemp: number; // °C (simulated sensor)
  mode: 'COOL' | 'HEAT' | 'AUTO' | 'FAN_ONLY';
}

export interface LockState {
  locked: boolean;
  lastChanged: string; // ISO timestamp
}

export interface PlugState {
  on: boolean;
  wattage: number; // current draw in W
}

export type DeviceState =
  | LightState
  | FanState
  | ThermostatState
  | LockState
  | PlugState;

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  roomId: string;
  state: DeviceState;
  online: boolean;
  lastUpdated: string; // ISO timestamp
}

// ─── Device Log ──────────────────────────────────────────────────────────────

export interface DeviceLog {
  id: string;
  deviceId: string;
  deviceName: string;
  roomName: string;
  previousState: DeviceState;
  newState: DeviceState;
  timestamp: string;
  triggeredBy: 'USER' | 'AUTOMATION';
}

// ─── Automation Rules ─────────────────────────────────────────────────────────

export type ConditionOperator = '>' | '<' | '>=' | '<=' | '==' | '!=';

export interface RuleCondition {
  metric: string;       // e.g. "temperature", "time", "device.on"
  operator: ConditionOperator;
  value: string | number;
}

export interface RuleAction {
  deviceId: string;
  command: string;      // e.g. "turn_on", "turn_off", "set_temp"
  params?: Record<string, unknown>;
}

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  condition: RuleCondition;
  action: RuleAction;
  enabled: boolean;
  lastTriggered?: string; // ISO timestamp
  triggerCount: number;
}

// ─── Notifications ────────────────────────────────────────────────────────────

export type NotificationType = 'AUTOMATION' | 'WARNING' | 'INFO' | 'ALERT';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  deviceId?: string;
  ruleId?: string;
}

// ─── Analytics ────────────────────────────────────────────────────────────────

export interface EnergyDataPoint {
  date: string; // "YYYY-MM-DD"
  kwh: number;
  cost: number; // USD
}

export interface DeviceUsageDataPoint {
  deviceId: string;
  deviceName: string;
  hoursOn: number;
  energyKwh: number;
  costUSD: number;
}
