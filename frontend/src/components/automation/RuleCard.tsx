import { Zap, Clock, Hash } from 'lucide-react';
import type { AutomationRule } from '../../types';
import { useDevices } from '../../context/DeviceContext';
import { Card } from '../ui/Card';
import { Toggle } from '../ui/Toggle';
import { Badge } from '../ui/Badge';
import { formatDistanceToNow } from '../../lib/time';
import { cn } from '../../lib/utils';

interface RuleCardProps {
  rule: AutomationRule;
}

const conditionLabel = (rule: AutomationRule) =>
  `${rule.condition.metric} ${rule.condition.operator} ${rule.condition.value}`;

const actionLabel = (rule: AutomationRule) =>
  rule.action.command.replace(/_/g, ' ');

export function RuleCard({ rule }: RuleCardProps) {
  const { toggleRule, getDevice } = useDevices();
  const device = getDevice(rule.action.deviceId);

  return (
    <Card className={cn(
      'p-4 border transition-all duration-300',
      rule.enabled ? 'border-surface-border' : 'border-surface-border opacity-60',
    )}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border',
            rule.enabled
              ? 'bg-accent-cyan/10 border-accent-cyan/30'
              : 'bg-surface-3 border-surface-border',
          )}>
            <Zap className={cn('h-5 w-5', rule.enabled ? 'text-accent-cyan' : 'text-gray-600')} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-sm font-semibold text-white">{rule.name}</p>
              {rule.enabled && <Badge variant="cyan" size="sm" dot>Active</Badge>}
            </div>
            <p className="text-xs text-gray-400">{rule.description}</p>
          </div>
        </div>
        <Toggle
          checked={rule.enabled}
          onChange={() => toggleRule(rule.id)}
          size="sm"
          id={`rule-toggle-${rule.id}`}
        />
      </div>

      {/* Condition → Action */}
      <div className="mt-4 flex items-center gap-2 text-xs">
        <div className="flex-1 rounded-lg bg-surface-3 border border-surface-border px-3 py-2">
          <p className="text-gray-500 mb-0.5">IF</p>
          <p className="font-mono text-accent-amber">{conditionLabel(rule)}</p>
        </div>
        <div className="text-gray-600 text-lg font-bold">→</div>
        <div className="flex-1 rounded-lg bg-surface-3 border border-surface-border px-3 py-2">
          <p className="text-gray-500 mb-0.5">THEN</p>
          <p className="font-mono text-accent-cyan capitalize">{actionLabel(rule)}</p>
          {device && <p className="text-gray-600 truncate">{device.name}</p>}
        </div>
      </div>

      {/* Footer meta */}
      <div className="mt-3 flex items-center justify-between text-[10px] text-gray-500">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {rule.lastTriggered ? formatDistanceToNow(rule.lastTriggered) : 'Never triggered'}
        </span>
        <span className="flex items-center gap-1">
          <Hash className="h-3 w-3" />
          {rule.triggerCount} trigger{rule.triggerCount !== 1 ? 's' : ''}
        </span>
      </div>
    </Card>
  );
}
