import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ClipboardList, MessageSquarePlus, Phone, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useAuth } from '@/src/context/AuthContext';

export const BottomNav: React.FC = () => {
  const { user } = useAuth();

  const navItems = [
    { icon: Home, label: 'Utama', path: '/' },
    { icon: ClipboardList, label: 'Servis', path: '/services' },
    { icon: MessageSquarePlus, label: 'Aduan', path: '/complaint' },
    { icon: Phone, label: 'Hubungi', path: '/contact' },
    { icon: User, label: user ? 'Profil' : 'Akaun', path: user ? '/profile' : '/login' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 bottom-nav-shadow safe-area-bottom z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center w-full h-full transition-colors",
                isActive ? "text-primary" : "text-slate-400"
              )
            }
          >
            <item.icon size={24} className={cn("mb-1")} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

