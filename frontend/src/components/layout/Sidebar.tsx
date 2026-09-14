import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, DoorOpen, Zap, BarChart3, Bell, Settings, LogOut, Wifi,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDevices } from '../../context/DeviceContext';
import { cn } from '../../lib/utils';

const navItems = [
  { to: '/',              icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/rooms',         icon: DoorOpen,        label: 'Rooms' },
  { to: '/automation',    icon: Zap,             label: 'Automation' },
  { to: '/analytics',     icon: BarChart3,       label: 'Analytics' },
  { to: '/notifications', icon: Bell,            label: 'Notifications' },
  { to: '/settings',      icon: Settings,        label: 'Settings' },
];

export function Sidebar() {
  const { user, logout } = useAuth();
  const { unreadCount } = useDevices();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 flex flex-col glass border-r border-surface-border z-30">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-surface-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-cyan/20 border border-accent-cyan/30 shadow-glow-cyan">
          <Wifi className="h-5 w-5 text-accent-cyan" />
        </div>
        <div>
          <p className="text-sm font-bold text-white leading-tight">SmartHome</p>
          <p className="text-xs text-gray-500">Main Residence</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium',
                'transition-all duration-150 relative',
                isActive
                  ? 'bg-accent-cyan/10 text-accent-cyan active-indicator'
                  : 'text-gray-400 hover:text-white hover:bg-surface-3',
              )
            }
          >
            <span className="relative">
              <Icon className="h-5 w-5 shrink-0" />
              {label === 'Notifications' && unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-4 min-w-4 px-0.5 flex items-center justify-center rounded-full bg-accent-red text-white text-[9px] font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      {user && (
        <div className="border-t border-surface-border p-3">
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-surface-3 transition-colors group">
            <img
              src={user.avatarUrl ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
              alt={user.name}
              className="h-8 w-8 rounded-lg bg-surface-3 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user.name}</p>
              <p className="text-[10px] text-gray-500 truncate">
                <span className={cn(
                  'inline-block w-1.5 h-1.5 rounded-full mr-1',
                  user.role === 'ADMIN' ? 'bg-accent-amber' : 'bg-accent-green',
                )} />
                {user.role}
              </p>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 rounded-lg text-gray-500 hover:text-accent-red hover:bg-accent-red/10 opacity-0 group-hover:opacity-100 transition-all"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
