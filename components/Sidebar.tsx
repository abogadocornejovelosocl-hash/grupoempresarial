
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  CheckSquare, 
  BarChart3, 
  Settings,
  Users2,
  History
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, role, setRole }) => {
  const managerItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'clients', label: 'Clientes / RUTs', icon: Users },
    { id: 'tasks', label: 'Gestión / Tickets', icon: CheckSquare },
    { id: 'team', label: 'Mi Equipo', icon: Users2 },
    { id: 'calendar', label: 'Calendario SII', icon: Calendar },
    { id: 'history', label: 'Historial / Trazabilidad', icon: History },
    { id: 'reports', label: 'Analítica de Cartera', icon: BarChart3 },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  const clientItems = [
    { id: 'client-portal', label: 'Mi Empresa', icon: LayoutDashboard },
    { id: 'tasks', label: 'Mis Trámites', icon: CheckSquare },
    { id: 'history', label: 'Mi Historial', icon: History },
    { id: 'settings', label: 'Mis Datos', icon: Settings },
  ];

  const menuItems = role === 'CLIENT' ? clientItems : managerItems;

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800 z-40">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20">
          G
        </div>
        <div>
          <span className="font-bold text-lg tracking-tight block leading-none">Grupo</span>
          <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Empresarial</span>
        </div>
      </div>
      
      <div className="px-6 pb-4">
        <div className="bg-slate-800 p-1 rounded-xl flex">
          <button 
            onClick={() => setRole('ADMIN')}
            className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${role !== 'CLIENT' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}
          >
            Gestor
          </button>
          <button 
            onClick={() => setRole('CLIENT')}
            className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${role === 'CLIENT' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}
          >
            Cliente
          </button>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                isActive 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent'
              }`}
            >
              <Icon size={18} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-6 flex items-center gap-3 border-t border-slate-800 bg-slate-900/50">
        <img 
          src={role === 'CLIENT' ? "https://picsum.photos/seed/client/40/40" : "https://picsum.photos/seed/user/40/40"} 
          alt="User" 
          className="rounded-full border-2 border-slate-700 w-8 h-8" 
        />
        <div className="overflow-hidden">
          <p className="text-xs font-semibold truncate text-slate-200">{role === 'CLIENT' ? 'Inversiones Andes' : 'Clemente T.'}</p>
          <p className="text-[9px] text-slate-500 uppercase font-bold tracking-tighter">
            {role === 'CLIENT' ? 'RUT 76.123.456-K' : 'Director General'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
