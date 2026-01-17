
import React from 'react';
import { MOCK_HISTORY } from '../constants';
import { UserRole } from '../types';
import { History, User, FileText, Bell, ShieldCheck, Search, Filter } from 'lucide-react';

interface HistoryViewProps {
  role: UserRole;
  clientId?: string;
}

const HistoryView: React.FC<HistoryViewProps> = ({ role, clientId }) => {
  // CRITICAL: Filter log entries if user is a client
  const filteredHistory = role === 'CLIENT'
    ? MOCK_HISTORY.filter(h => h.clientId === clientId)
    : MOCK_HISTORY;

  const getCategoryStyles = (cat: string) => {
    switch(cat) {
      case 'DOC': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'TAX': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'TEAM': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'SYSTEM': return 'bg-slate-50 text-slate-600 border-slate-100';
      default: return 'bg-slate-50';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch(cat) {
      case 'DOC': return <FileText size={14} />;
      case 'TAX': return <ShieldCheck size={14} />;
      case 'TEAM': return <User size={14} />;
      case 'SYSTEM': return <Bell size={14} />;
      default: return <History size={14} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {role === 'CLIENT' ? 'Mi Historial de Relación' : 'Historial de Actividad (Oficina)'}
          </h1>
          <p className="text-slate-500 text-sm">
            {role === 'CLIENT' 
              ? 'Trazabilidad completa de las gestiones realizadas en tu RUT.' 
              : 'Trazabilidad completa de acciones por gestor y cliente.'}
          </p>
        </div>
        {role !== 'CLIENT' && (
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold text-slate-600">
              <Filter size={16} /> Filtrar por RUT
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-4">
           <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input type="text" placeholder="Buscar en el historial..." className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Fecha / Hora</th>
                <th className="px-6 py-4">Responsable</th>
                {role !== 'CLIENT' && <th className="px-6 py-4">Cliente / RUT</th>}
                <th className="px-6 py-4">Acción</th>
                <th className="px-6 py-4">Detalles</th>
                <th className="px-6 py-4">Categoría</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {filteredHistory.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">{entry.timestamp}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[8px] font-black border border-slate-300">
                        {entry.userName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-bold text-slate-700">{entry.userName}</span>
                    </div>
                  </td>
                  {role !== 'CLIENT' && (
                    <td className="px-6 py-4">
                      {entry.clientName ? (
                        <span className="text-blue-600 font-bold hover:underline cursor-pointer">{entry.clientName}</span>
                      ) : (
                        <span className="text-slate-400 italic font-medium">Gestión Interna</span>
                      )}
                    </td>
                  )}
                  <td className="px-6 py-4">
                    <span className="font-black text-slate-900 uppercase text-[10px] tracking-tight">{entry.action}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 max-w-xs truncate font-medium">{entry.details}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] font-black uppercase ${getCategoryStyles(entry.category)}`}>
                      {getCategoryIcon(entry.category)}
                      {entry.category}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredHistory.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic">No hay registros históricos disponibles para este RUT.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryView;
