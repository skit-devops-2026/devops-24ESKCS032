import { useState, useMemo } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { TrendingUp, DollarSign, Zap, Clock } from 'lucide-react';
import { MOCK_ENERGY_DATA_90D, MOCK_DEVICE_USAGE } from '../mock/data';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { cn } from '../lib/utils';

type Range = '7d' | '30d' | '90d';

const RANGE_DAYS: Record<Range, number> = { '7d': 7, '30d': 30, '90d': 90 };

// Custom tooltip for recharts
function CustomTooltip({ active, payload, label }: {
  active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl px-3 py-2 text-xs shadow-card">
      <p className="text-gray-400 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }} className="font-mono">
          {p.name}: {typeof p.value === 'number' ? p.value.toFixed(2) : p.value}
        </p>
      ))}
    </div>
  );
}

export function Analytics() {
  const [range, setRange] = useState<Range>('30d');

  const energyData = useMemo(() => {
    const days = RANGE_DAYS[range];
    return MOCK_ENERGY_DATA_90D.slice(-days);
  }, [range]);

  const totalKwh  = energyData.reduce((s, d) => s + d.kwh, 0).toFixed(1);
  const totalCost = energyData.reduce((s, d) => s + d.cost, 0).toFixed(2);
  const avgKwh    = (energyData.reduce((s, d) => s + d.kwh, 0) / energyData.length).toFixed(1);
  const peakKwh   = Math.max(...energyData.map(d => d.kwh)).toFixed(1);

  // Format date label based on range
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    if (range === '7d')  return d.toLocaleDateString('en-US', { weekday: 'short' });
    if (range === '30d') return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // For 30d and 90d, sample to avoid overcrowding
  const chartData = useMemo(() => {
    const step = range === '90d' ? 3 : range === '30d' ? 2 : 1;
    return energyData.filter((_, i) => i % step === 0).map(d => ({
      ...d,
      date: formatDate(d.date),
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [energyData, range]);

  const summaryStats = [
    { label: 'Total Energy', value: `${totalKwh} kWh`, icon: Zap,         color: 'cyan' as const },
    { label: 'Total Cost',   value: `$${totalCost}`,    icon: DollarSign,  color: 'green' as const },
    { label: 'Daily Average',value: `${avgKwh} kWh`,   icon: TrendingUp,  color: 'amber' as const },
    { label: 'Peak Day',     value: `${peakKwh} kWh`,  icon: Clock,       color: 'violet' as const },
  ];

  const statColors = {
    cyan:   'text-accent-cyan',
    green:  'text-accent-green',
    amber:  'text-accent-amber',
    violet: 'text-accent-violet',
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-sm text-gray-400 mt-1">Energy usage and device statistics</p>
        </div>
        {/* Range selector */}
        <div className="flex gap-1 bg-surface-2 rounded-xl p-1 border border-surface-border">
          {(['7d', '30d', '90d'] as Range[]).map(r => (
            <button
              key={r}
              id={`range-${r}`}
              onClick={() => setRange(r)}
              className={cn(
                'px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
                range === r
                  ? 'bg-accent-cyan text-surface-0 shadow-glow-cyan'
                  : 'text-gray-400 hover:text-white',
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon className={cn('h-4 w-4', statColors[color])} />
              <span className="text-xs text-gray-400">{label}</span>
            </div>
            <p className={cn('text-xl font-bold font-mono', statColors[color])}>{value}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Last {range}</p>
          </Card>
        ))}
      </div>

      {/* Energy line chart */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-white">Daily Energy Consumption</h2>
          <Badge variant="cyan" size="sm">kWh / day</Badge>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} width={32} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone" dataKey="kwh" name="kWh"
              stroke="#22d3ee" strokeWidth={2} dot={false}
              activeDot={{ r: 4, fill: '#22d3ee', stroke: '#0a0e1a', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Cost chart */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-white">Daily Cost</h2>
          <Badge variant="green" size="sm">USD / day</Badge>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} width={36} tickFormatter={v => `$${v}`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="cost" name="Cost ($)" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Device usage breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar chart */}
        <Card className="p-5">
          <h2 className="text-sm font-semibold text-white mb-5">Device Usage (hours/day)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MOCK_DEVICE_USAGE} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis
                type="category" dataKey="deviceName"
                tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} width={100}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="hoursOn" name="Hours on" fill="#8b5cf6" radius={[0, 4, 4, 0]} maxBarSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Cost breakdown table */}
        <Card className="p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Cost Breakdown by Device</h2>
          <div className="space-y-2">
            {[...MOCK_DEVICE_USAGE]
              .sort((a, b) => b.costUSD - a.costUSD)
              .map(d => (
                <div key={d.deviceId} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-gray-300 truncate">{d.deviceName}</p>
                      <p className="text-xs font-mono text-accent-green shrink-0 ml-2">${d.costUSD.toFixed(2)}</p>
                    </div>
                    <div className="h-1.5 bg-surface-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent-cyan to-accent-violet rounded-full"
                        style={{ width: `${(d.costUSD / MOCK_DEVICE_USAGE[0].costUSD) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
