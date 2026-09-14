import { useState } from 'react';
import { User, Bell, Shield, Palette, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Toggle } from '../components/ui/Toggle';
import { cn } from '../lib/utils';

const sections = [
  { id: 'profile',       label: 'Profile',       icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security',      label: 'Security',      icon: Shield },
  { id: 'appearance',    label: 'Appearance',    icon: Palette },
];

export function Settings() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');

  // Mock editable profile state
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [saved, setSaved] = useState(false);

  // Notification preferences
  const [notifPrefs, setNotifPrefs] = useState({
    automationTriggers: true,
    deviceOffline:      true,
    highEnergyUsage:    true,
    deviceLeftOn:       false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-gray-400 mt-1">Manage your account and preferences</p>
      </div>

      <div className="flex gap-6 flex-col md:flex-row">
        {/* Sidebar nav */}
        <nav className="md:w-48 shrink-0">
          <Card className="p-2">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                id={`settings-nav-${id}`}
                onClick={() => setActiveSection(id)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                  activeSection === id
                    ? 'bg-accent-cyan/10 text-accent-cyan'
                    : 'text-gray-400 hover:text-white hover:bg-surface-3',
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </button>
            ))}
          </Card>
        </nav>

        {/* Content */}
        <div className="flex-1 animate-fade-in">
          {/* Profile */}
          {activeSection === 'profile' && (
            <Card className="p-6 space-y-5">
              <h2 className="text-base font-semibold text-white">Profile Information</h2>

              {/* Avatar */}
              <div className="flex items-center gap-4">
                <img
                  src={user?.avatarUrl ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
                  alt="Avatar"
                  className="h-16 w-16 rounded-2xl bg-surface-3"
                />
                <div>
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <Badge variant={user?.role === 'ADMIN' ? 'amber' : 'cyan'} size="sm" className="mt-1">
                    {user?.role}
                  </Badge>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="settings-name" className="block text-xs text-gray-400 mb-1.5">Full name</label>
                  <input
                    id="settings-name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white
                               bg-surface-2 border border-surface-border
                               focus:outline-none focus:ring-2 focus:ring-accent-cyan/40"
                  />
                </div>
                <div>
                  <label htmlFor="settings-email" className="block text-xs text-gray-400 mb-1.5">Email address</label>
                  <input
                    id="settings-email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white
                               bg-surface-2 border border-surface-border
                               focus:outline-none focus:ring-2 focus:ring-accent-cyan/40"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Home</label>
                  <input
                    type="text"
                    defaultValue="Main Residence"
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white
                               bg-surface-2 border border-surface-border
                               focus:outline-none focus:ring-2 focus:ring-accent-cyan/40"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button variant="primary" size="md" onClick={handleSave} id="save-profile-btn">
                  <Save className="h-4 w-4" />
                  {saved ? 'Saved!' : 'Save Changes'}
                </Button>
                {saved && <Badge variant="green" dot>Changes saved</Badge>}
              </div>
            </Card>
          )}

          {/* Notifications */}
          {activeSection === 'notifications' && (
            <Card className="p-6 space-y-5">
              <h2 className="text-base font-semibold text-white">Notification Preferences</h2>
              <div className="space-y-4">
                {(Object.entries(notifPrefs) as Array<[keyof typeof notifPrefs, boolean]>).map(([key, val]) => {
                  const labels: Record<string, { title: string; desc: string }> = {
                    automationTriggers: { title: 'Automation triggers',  desc: 'Notify when a rule fires' },
                    deviceOffline:      { title: 'Device offline',       desc: 'Alert when a device goes offline' },
                    highEnergyUsage:    { title: 'High energy usage',    desc: 'Daily energy spike alerts' },
                    deviceLeftOn:       { title: 'Device left on',       desc: 'Notify when device runs > 8h' },
                  };
                  const meta = labels[key];
                  return (
                    <div key={key} className="flex items-center justify-between py-3 border-b border-surface-border last:border-0">
                      <div>
                        <p className="text-sm font-medium text-white">{meta.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{meta.desc}</p>
                      </div>
                      <Toggle
                        checked={val}
                        onChange={v => setNotifPrefs(p => ({ ...p, [key]: v }))}
                        id={`notif-pref-${key}`}
                      />
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Security */}
          {activeSection === 'security' && (
            <Card className="p-6 space-y-5">
              <h2 className="text-base font-semibold text-white">Security</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="current-password" className="block text-xs text-gray-400 mb-1.5">Current password</label>
                  <input
                    id="current-password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-gray-600
                               bg-surface-2 border border-surface-border
                               focus:outline-none focus:ring-2 focus:ring-accent-cyan/40"
                  />
                </div>
                <div>
                  <label htmlFor="new-password" className="block text-xs text-gray-400 mb-1.5">New password</label>
                  <input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-gray-600
                               bg-surface-2 border border-surface-border
                               focus:outline-none focus:ring-2 focus:ring-accent-cyan/40"
                  />
                </div>
                <Button variant="primary" size="md" id="change-password-btn">
                  Update password
                </Button>
              </div>

              <div className="mt-4 pt-4 border-t border-surface-border">
                <h3 className="text-sm font-medium text-white mb-3">Active sessions</h3>
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-3 border border-surface-border">
                  <div>
                    <p className="text-xs font-medium text-white">Current session</p>
                    <p className="text-[10px] text-gray-500">macOS · Chrome · Just now</p>
                  </div>
                  <Badge variant="green" dot size="sm">Active</Badge>
                </div>
              </div>
            </Card>
          )}

          {/* Appearance */}
          {activeSection === 'appearance' && (
            <Card className="p-6 space-y-5">
              <h2 className="text-base font-semibold text-white">Appearance</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-white mb-3">Color theme</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Midnight',  bg: 'bg-gradient-to-br from-surface-0 to-surface-2', active: true },
                      { label: 'Ocean',     bg: 'bg-gradient-to-br from-blue-950 to-blue-900',    active: false },
                      { label: 'Forest',    bg: 'bg-gradient-to-br from-green-950 to-green-900',  active: false },
                    ].map(theme => (
                      <button
                        key={theme.label}
                        className={cn(
                          'rounded-xl p-3 border text-xs font-medium transition-all',
                          theme.bg,
                          theme.active
                            ? 'border-accent-cyan text-accent-cyan'
                            : 'border-surface-border text-gray-400 hover:border-gray-500',
                        )}
                      >
                        {theme.label}
                        {theme.active && ' ✓'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-surface-border">
                  <div>
                    <p className="text-sm font-medium text-white">Compact mode</p>
                    <p className="text-xs text-gray-500">Reduce card padding and spacing</p>
                  </div>
                  <Toggle checked={false} onChange={() => {}} id="compact-mode-toggle" />
                </div>
                <div className="flex items-center justify-between py-3 border-t border-surface-border">
                  <div>
                    <p className="text-sm font-medium text-white">Reduce animations</p>
                    <p className="text-xs text-gray-500">Disable micro-animations</p>
                  </div>
                  <Toggle checked={false} onChange={() => {}} id="reduce-animations-toggle" />
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
