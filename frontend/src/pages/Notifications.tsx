import { useState } from 'react';
import { CheckCheck } from 'lucide-react';
import { useDevices } from '../context/DeviceContext';
import { NotificationItem } from '../components/notifications/NotificationItem';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import type { NotificationType } from '../types';
import { cn } from '../lib/utils';

type FilterType = 'ALL' | NotificationType;

const filterOptions: { label: string; value: FilterType }[] = [
  { label: 'All',        value: 'ALL' },
  { label: 'Automation', value: 'AUTOMATION' },
  { label: 'Warnings',   value: 'WARNING' },
  { label: 'Alerts',     value: 'ALERT' },
  { label: 'Info',       value: 'INFO' },
];

export function Notifications() {
  const { notifications, markAllRead, unreadCount } = useDevices();
  const [filter, setFilter] = useState<FilterType>('ALL');

  const filtered = notifications.filter(n =>
    filter === 'ALL' ? true : n.type === filter,
  );

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">Notifications</h1>
            {unreadCount > 0 && <Badge variant="red" size="sm">{unreadCount} new</Badge>}
          </div>
          <p className="text-sm text-gray-400 mt-1">{notifications.length} total notifications</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllRead} id="mark-all-read">
            <CheckCheck className="h-4 w-4" />
            Mark all read
          </Button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {filterOptions.map(({ label, value }) => {
          const count = value === 'ALL'
            ? notifications.filter(n => !n.read).length
            : notifications.filter(n => n.type === value && !n.read).length;
          return (
            <button
              key={value}
              id={`notif-filter-${value.toLowerCase()}`}
              onClick={() => setFilter(value)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                filter === value
                  ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30'
                  : 'text-gray-400 hover:text-white',
              )}
            >
              {label}
              {count > 0 && (
                <span className="bg-accent-red text-white text-[9px] font-bold px-1 py-0.5 rounded-full min-w-[16px] text-center">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Notification list */}
      <div className="space-y-2">
        {filtered.length > 0
          ? filtered.map(n => <NotificationItem key={n.id} notification={n} />)
          : (
            <div className="py-20 text-center">
              <p className="text-4xl mb-3">🔕</p>
              <p className="text-gray-400 text-sm">No {filter !== 'ALL' ? filter.toLowerCase() : ''} notifications</p>
            </div>
          )
        }
      </div>
    </div>
  );
}
