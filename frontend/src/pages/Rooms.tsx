import { useState } from 'react';
import { Search } from 'lucide-react';
import { useDevices } from '../context/DeviceContext';
import { RoomCard } from '../components/rooms/RoomCard';

export function Rooms() {
  const { rooms } = useDevices();
  const [search, setSearch] = useState('');

  const filtered = rooms.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Rooms</h1>
          <p className="text-sm text-gray-400 mt-1">{rooms.length} rooms in Main Residence</p>
        </div>
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            id="room-search"
            type="text"
            placeholder="Search rooms…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-xl text-sm text-white placeholder-gray-600
                       bg-surface-2 border border-surface-border
                       focus:outline-none focus:ring-2 focus:ring-accent-cyan/40 focus:border-accent-cyan/50
                       w-56 transition-colors"
          />
        </div>
      </div>

      {/* Room grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(room => <RoomCard key={room.id} room={room} />)}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-4xl mb-3">🏠</p>
          <p className="text-gray-400 text-sm">No rooms match "{search}"</p>
        </div>
      )}
    </div>
  );
}
