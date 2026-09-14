import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDevices } from '../../context/DeviceContext';
import { cn } from '../../lib/utils';

const routeMeta: Record<string, { label: string; parent?: string }> = {
  '/':              { label: 'Dashboard' },
  '/rooms':         { label: 'Rooms' },
  '/automation':    { label: 'Automation' },
  '/analytics':     { label: 'Analytics' },
  '/notifications': { label: 'Notifications' },
  '/settings':      { label: 'Settings' },
};

export function TopBar() {
  const { user } = useAuth();
  const { unreadCount } = useDevices();
  const location = useLocation();
  const navigate = useNavigate();

  const isRoomDetail = location.pathname.startsWith('/rooms/');
  const meta = routeMeta[location.pathname] ?? { label: 'Room Detail', parent: 'Rooms' };

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <header className="fixed left-60 right-0 top-0 h-16 glass border-b border-surface-border z-20 flex items-center px-6 gap-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm flex-1">
        {(isRoomDetail || meta.parent) && (
          <>
            <button
              onClick={() => navigate('/rooms')}
              className="text-gray-500 hover:text-accent-cyan transition-colors"
            >
              Rooms
            </button>
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </>
        )}
        <span className="font-semibold text-white">{meta.label}</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Date/time */}
        <div className="hidden md:flex flex-col items-end">
          <span className="text-xs font-medium text-white">{timeStr}</span>
          <span className="text-[10px] text-gray-500">{dateStr}</span>
        </div>

        {/* Notification bell */}
        <button
          onClick={() => navigate('/notifications')}
          className="relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-surface-3 transition-all"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className={cn(
              'absolute -top-0.5 -right-0.5 h-4 min-w-4 px-0.5',
              'flex items-center justify-center rounded-full',
              'bg-accent-red text-white text-[9px] font-bold',
              'animate-pulse-slow',
            )}>
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* User avatar */}
        {user && (
          <button
            onClick={() => navigate('/settings')}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-surface-3 transition-colors"
            aria-label="User settings"
          >
            <img
              src={user.avatarUrl ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
              alt={user.name}
              className="h-8 w-8 rounded-lg bg-surface-3"
            />
          </button>
        )}
      </div>
    </header>
  );
}
