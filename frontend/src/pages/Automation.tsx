import { useState } from 'react';
import { Plus, Zap } from 'lucide-react';
import { useDevices } from '../context/DeviceContext';
import { RuleCard } from '../components/automation/RuleCard';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Card } from '../components/ui/Card';

export function Automation() {
  const { rules } = useDevices();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filtered = rules.filter(r => {
    if (filter === 'active')   return r.enabled;
    if (filter === 'inactive') return !r.enabled;
    return true;
  });

  const activeCount = rules.filter(r => r.enabled).length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Automation Rules</h1>
          <p className="text-sm text-gray-400 mt-1">
            {activeCount} of {rules.length} rules active
          </p>
        </div>
        <Button variant="primary" size="md" onClick={() => setAddModalOpen(true)} id="add-rule-btn">
          <Plus className="h-4 w-4" />
          Add Rule
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-accent-cyan">{rules.length}</p>
          <p className="text-xs text-gray-400 mt-0.5">Total Rules</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-accent-green">{activeCount}</p>
          <p className="text-xs text-gray-400 mt-0.5">Active</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-accent-amber">
            {rules.reduce((s, r) => s + r.triggerCount, 0)}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">Total Triggers</p>
        </Card>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['all', 'active', 'inactive'] as const).map(f => (
          <button
            key={f}
            id={`filter-${f}`}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filter === f
                ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Rules list */}
      <div className="space-y-3">
        {filtered.map(rule => <RuleCard key={rule.id} rule={rule} />)}
        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <Zap className="h-8 w-8 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No {filter} rules</p>
          </div>
        )}
      </div>

      {/* Add Rule Modal */}
      <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)} title="Add Automation Rule">
        <div className="space-y-4">
          <div>
            <label htmlFor="rule-name" className="block text-xs text-gray-400 mb-1.5">Rule name</label>
            <input
              id="rule-name"
              type="text"
              placeholder="e.g., Night Mode"
              className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-gray-600
                         bg-surface-2 border border-surface-border
                         focus:outline-none focus:ring-2 focus:ring-accent-cyan/40"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="rule-condition-metric" className="block text-xs text-gray-400 mb-1.5">Condition metric</label>
              <select
                id="rule-condition-metric"
                className="w-full px-3 py-2.5 rounded-xl text-sm text-white
                           bg-surface-2 border border-surface-border
                           focus:outline-none focus:ring-2 focus:ring-accent-cyan/40"
              >
                <option value="time">Time</option>
                <option value="temperature">Temperature</option>
                <option value="motion">Motion</option>
                <option value="idle_time">Idle time</option>
              </select>
            </div>
            <div>
              <label htmlFor="rule-condition-value" className="block text-xs text-gray-400 mb-1.5">Value</label>
              <input
                id="rule-condition-value"
                type="text"
                placeholder="e.g., 23:00"
                className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-gray-600
                           bg-surface-2 border border-surface-border
                           focus:outline-none focus:ring-2 focus:ring-accent-cyan/40"
              />
            </div>
          </div>
          <div>
            <label htmlFor="rule-action" className="block text-xs text-gray-400 mb-1.5">Action</label>
            <select
              id="rule-action"
              className="w-full px-3 py-2.5 rounded-xl text-sm text-white
                         bg-surface-2 border border-surface-border
                         focus:outline-none focus:ring-2 focus:ring-accent-cyan/40"
            >
              <option value="turn_on">Turn ON device</option>
              <option value="turn_off">Turn OFF device</option>
              <option value="lock">Lock door</option>
              <option value="set_temp">Set temperature</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" className="flex-1" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              id="save-rule-btn"
              onClick={() => setAddModalOpen(false)}
            >
              Save Rule
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
