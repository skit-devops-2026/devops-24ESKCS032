import type {
  Device,
  Room,
  Home,
  User,
  AutomationRule,
  AppNotification,
  DeviceLog,
  EnergyDataPoint,
  DeviceUsageDataPoint,
} from '../types';

// ─── Users ────────────────────────────────────────────────────────────────────

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Alex Johnson',
    email: 'admin@smarthome.io',
    role: 'ADMIN',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  },
  {
    id: 'u2',
    name: 'Jordan Lee',
    email: 'user@smarthome.io',
    role: 'USER',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
  },
];

// ─── Homes ────────────────────────────────────────────────────────────────────

export const MOCK_HOMES: Home[] = [
  { id: 'h1', name: 'Main Residence', ownerId: 'u1', address: '42 Maple St, Springfield' },
];

// ─── Rooms ────────────────────────────────────────────────────────────────────

export const MOCK_ROOMS: Room[] = [
  { id: 'r1', name: 'Living Room',  homeId: 'h1', icon: '🛋️' },
  { id: 'r2', name: 'Bedroom',      homeId: 'h1', icon: '🛏️' },
  { id: 'r3', name: 'Kitchen',      homeId: 'h1', icon: '🍳' },
  { id: 'r4', name: 'Bathroom',     homeId: 'h1', icon: '🚿' },
  { id: 'r5', name: 'Home Office',  homeId: 'h1', icon: '💻' },
  { id: 'r6', name: 'Garage',       homeId: 'h1', icon: '🚗' },
];

// ─── Devices ──────────────────────────────────────────────────────────────────

export const MOCK_DEVICES: Device[] = [
  // Living Room
  {
    id: 'd1', name: 'Ceiling Light', type: 'LIGHT', roomId: 'r1', online: true,
    lastUpdated: new Date(Date.now() - 120000).toISOString(),
    state: { on: true, brightness: 75, colorTemp: 3500 },
  },
  {
    id: 'd2', name: 'Floor Lamp', type: 'LIGHT', roomId: 'r1', online: true,
    lastUpdated: new Date(Date.now() - 300000).toISOString(),
    state: { on: false, brightness: 50, colorTemp: 2700 },
  },
  {
    id: 'd3', name: 'Standing Fan', type: 'FAN', roomId: 'r1', online: true,
    lastUpdated: new Date(Date.now() - 600000).toISOString(),
    state: { on: true, speed: 'MEDIUM' },
  },
  {
    id: 'd4', name: 'Smart TV Plug', type: 'PLUG', roomId: 'r1', online: true,
    lastUpdated: new Date(Date.now() - 900000).toISOString(),
    state: { on: true, wattage: 120 },
  },
  // Bedroom
  {
    id: 'd5', name: 'Bedside Lamp', type: 'LIGHT', roomId: 'r2', online: true,
    lastUpdated: new Date(Date.now() - 3600000).toISOString(),
    state: { on: false, brightness: 30, colorTemp: 2700 },
  },
  {
    id: 'd6', name: 'Ceiling Fan', type: 'FAN', roomId: 'r2', online: true,
    lastUpdated: new Date(Date.now() - 7200000).toISOString(),
    state: { on: true, speed: 'LOW' },
  },
  {
    id: 'd7', name: 'AC Thermostat', type: 'THERMOSTAT', roomId: 'r2', online: true,
    lastUpdated: new Date(Date.now() - 1800000).toISOString(),
    state: { on: true, targetTemp: 22, currentTemp: 24.5, mode: 'COOL' },
  },
  {
    id: 'd8', name: 'Main Door Lock', type: 'LOCK', roomId: 'r2', online: true,
    lastUpdated: new Date(Date.now() - 43200000).toISOString(),
    state: { locked: true, lastChanged: new Date(Date.now() - 43200000).toISOString() },
  },
  // Kitchen
  {
    id: 'd9', name: 'Kitchen Light', type: 'LIGHT', roomId: 'r3', online: true,
    lastUpdated: new Date(Date.now() - 60000).toISOString(),
    state: { on: true, brightness: 100, colorTemp: 5000 },
  },
  {
    id: 'd10', name: 'Refrigerator Plug', type: 'PLUG', roomId: 'r3', online: true,
    lastUpdated: new Date(Date.now() - 86400000).toISOString(),
    state: { on: true, wattage: 150 },
  },
  {
    id: 'd11', name: 'Exhaust Fan', type: 'FAN', roomId: 'r3', online: false,
    lastUpdated: new Date(Date.now() - 3600000).toISOString(),
    state: { on: false, speed: 'HIGH' },
  },
  // Bathroom
  {
    id: 'd12', name: 'Vanity Light', type: 'LIGHT', roomId: 'r4', online: true,
    lastUpdated: new Date(Date.now() - 7200000).toISOString(),
    state: { on: false, brightness: 80, colorTemp: 4000 },
  },
  // Home Office
  {
    id: 'd13', name: 'Desk Lamp', type: 'LIGHT', roomId: 'r5', online: true,
    lastUpdated: new Date(Date.now() - 1500000).toISOString(),
    state: { on: true, brightness: 90, colorTemp: 5500 },
  },
  {
    id: 'd14', name: 'PC Plug', type: 'PLUG', roomId: 'r5', online: true,
    lastUpdated: new Date(Date.now() - 900000).toISOString(),
    state: { on: true, wattage: 350 },
  },
  // Garage
  {
    id: 'd15', name: 'Garage Light', type: 'LIGHT', roomId: 'r6', online: true,
    lastUpdated: new Date(Date.now() - 21600000).toISOString(),
    state: { on: false, brightness: 100, colorTemp: 6500 },
  },
  {
    id: 'd16', name: 'Garage Door Lock', type: 'LOCK', roomId: 'r6', online: true,
    lastUpdated: new Date(Date.now() - 7200000).toISOString(),
    state: { locked: true, lastChanged: new Date(Date.now() - 7200000).toISOString() },
  },
];

// ─── Automation Rules ─────────────────────────────────────────────────────────

export const MOCK_RULES: AutomationRule[] = [
  {
    id: 'rule1',
    name: 'Night Mode',
    description: 'Turn off all lights at 11 PM',
    condition: { metric: 'time', operator: '==', value: '23:00' },
    action: { deviceId: 'd1', command: 'turn_off' },
    enabled: true,
    lastTriggered: new Date(Date.now() - 86400000).toISOString(),
    triggerCount: 47,
  },
  {
    id: 'rule2',
    name: 'Overheat Guard',
    description: 'Turn on bedroom fan if thermostat > 26°C',
    condition: { metric: 'temperature', operator: '>', value: 26 },
    action: { deviceId: 'd6', command: 'turn_on' },
    enabled: true,
    lastTriggered: new Date(Date.now() - 3600000).toISOString(),
    triggerCount: 12,
  },
  {
    id: 'rule3',
    name: 'Morning Lights',
    description: 'Turn on kitchen light at 7 AM on weekdays',
    condition: { metric: 'time', operator: '==', value: '07:00' },
    action: { deviceId: 'd9', command: 'turn_on' },
    enabled: true,
    lastTriggered: new Date(Date.now() - 57600000).toISOString(),
    triggerCount: 23,
  },
  {
    id: 'rule4',
    name: 'Away Mode',
    description: 'Lock all doors when no motion for 30 min',
    condition: { metric: 'motion', operator: '==', value: 'none' },
    action: { deviceId: 'd8', command: 'lock' },
    enabled: false,
    triggerCount: 5,
  },
  {
    id: 'rule5',
    name: 'Energy Saver',
    description: 'Turn off office PC plug if idle > 2 hours',
    condition: { metric: 'idle_time', operator: '>', value: 120 },
    action: { deviceId: 'd14', command: 'turn_off' },
    enabled: true,
    lastTriggered: new Date(Date.now() - 172800000).toISOString(),
    triggerCount: 8,
  },
];

// ─── Notifications ────────────────────────────────────────────────────────────

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1', type: 'AUTOMATION', read: false,
    title: 'Overheat Guard Triggered',
    message: 'Bedroom fan turned on automatically — temperature reached 27°C',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    deviceId: 'd6', ruleId: 'rule2',
  },
  {
    id: 'n2', type: 'WARNING', read: false,
    title: 'Garage Door Unlocked',
    message: 'Garage door lock has been unlocked for over 2 hours',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    deviceId: 'd16',
  },
  {
    id: 'n3', type: 'AUTOMATION', read: false,
    title: 'Night Mode Activated',
    message: 'All living room lights turned off at 11:00 PM',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    ruleId: 'rule1',
  },
  {
    id: 'n4', type: 'INFO', read: true,
    title: 'Device Offline',
    message: 'Kitchen exhaust fan went offline. Check the device connection.',
    timestamp: new Date(Date.now() - 3700000).toISOString(),
    deviceId: 'd11',
  },
  {
    id: 'n5', type: 'AUTOMATION', read: true,
    title: 'Morning Lights On',
    message: 'Kitchen light turned on automatically at 7:00 AM',
    timestamp: new Date(Date.now() - 57600000).toISOString(),
    ruleId: 'rule3',
  },
  {
    id: 'n6', type: 'ALERT', read: true,
    title: 'High Energy Usage',
    message: 'Today\'s energy usage is 25% above your weekly average',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'n7', type: 'INFO', read: true,
    title: 'New Device Added',
    message: 'Garage Door Lock successfully paired with SmartHome',
    timestamp: new Date(Date.now() - 604800000).toISOString(),
    deviceId: 'd16',
  },
  {
    id: 'n8', type: 'AUTOMATION', read: true,
    title: 'Energy Saver Triggered',
    message: 'PC plug turned off — office idle for 2+ hours',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    ruleId: 'rule5',
  },
];

// ─── Device Logs (recent activity) ───────────────────────────────────────────

export const MOCK_DEVICE_LOGS: DeviceLog[] = [
  {
    id: 'log1', deviceId: 'd6', deviceName: 'Ceiling Fan', roomName: 'Bedroom',
    previousState: { on: false, speed: 'LOW' },
    newState: { on: true, speed: 'LOW' },
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    triggeredBy: 'AUTOMATION',
  },
  {
    id: 'log2', deviceId: 'd1', deviceName: 'Ceiling Light', roomName: 'Living Room',
    previousState: { on: true, brightness: 75, colorTemp: 3500 },
    newState: { on: false, brightness: 75, colorTemp: 3500 },
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    triggeredBy: 'AUTOMATION',
  },
  {
    id: 'log3', deviceId: 'd9', deviceName: 'Kitchen Light', roomName: 'Kitchen',
    previousState: { on: false, brightness: 100, colorTemp: 5000 },
    newState: { on: true, brightness: 100, colorTemp: 5000 },
    timestamp: new Date(Date.now() - 57600000).toISOString(),
    triggeredBy: 'AUTOMATION',
  },
  {
    id: 'log4', deviceId: 'd13', deviceName: 'Desk Lamp', roomName: 'Home Office',
    previousState: { on: false, brightness: 90, colorTemp: 5500 },
    newState: { on: true, brightness: 90, colorTemp: 5500 },
    timestamp: new Date(Date.now() - 1500000).toISOString(),
    triggeredBy: 'USER',
  },
  {
    id: 'log5', deviceId: 'd7', deviceName: 'AC Thermostat', roomName: 'Bedroom',
    previousState: { on: false, targetTemp: 22, currentTemp: 26, mode: 'COOL' },
    newState: { on: true, targetTemp: 22, currentTemp: 26, mode: 'COOL' },
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    triggeredBy: 'USER',
  },
];

// ─── Analytics ────────────────────────────────────────────────────────────────

function generateEnergyData(days: number): EnergyDataPoint[] {
  const data: EnergyDataPoint[] = [];
  const base = Date.now() - days * 86400000;
  for (let i = 0; i < days; i++) {
    const d = new Date(base + i * 86400000);
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const kwh = parseFloat((isWeekend ? 8 + Math.random() * 6 : 5 + Math.random() * 4).toFixed(2));
    data.push({
      date: d.toISOString().slice(0, 10),
      kwh,
      cost: parseFloat((kwh * 0.12).toFixed(2)),
    });
  }
  return data;
}

export const MOCK_ENERGY_DATA_90D: EnergyDataPoint[] = generateEnergyData(90);

export const MOCK_DEVICE_USAGE: DeviceUsageDataPoint[] = [
  { deviceId: 'd1',  deviceName: 'Ceiling Light',     hoursOn: 8.5,  energyKwh: 0.85, costUSD: 0.10 },
  { deviceId: 'd3',  deviceName: 'Standing Fan',      hoursOn: 6.0,  energyKwh: 0.30, costUSD: 0.04 },
  { deviceId: 'd4',  deviceName: 'Smart TV Plug',     hoursOn: 5.0,  energyKwh: 0.60, costUSD: 0.07 },
  { deviceId: 'd6',  deviceName: 'Ceiling Fan',       hoursOn: 9.0,  energyKwh: 0.45, costUSD: 0.05 },
  { deviceId: 'd7',  deviceName: 'AC Thermostat',     hoursOn: 7.0,  energyKwh: 7.00, costUSD: 0.84 },
  { deviceId: 'd9',  deviceName: 'Kitchen Light',     hoursOn: 4.0,  energyKwh: 0.40, costUSD: 0.05 },
  { deviceId: 'd10', deviceName: 'Refrigerator Plug', hoursOn: 24.0, energyKwh: 3.60, costUSD: 0.43 },
  { deviceId: 'd13', deviceName: 'Desk Lamp',         hoursOn: 10.0, energyKwh: 0.50, costUSD: 0.06 },
  { deviceId: 'd14', deviceName: 'PC Plug',           hoursOn: 8.0,  energyKwh: 2.80, costUSD: 0.34 },
];
