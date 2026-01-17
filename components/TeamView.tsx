
import React from 'react';
import { UserPlus, Mail, Phone, Shield, Briefcase, ChevronRight } from 'lucide-react';

const TeamView: React.FC = () => {
  const team = [
    { id: 'u1', name: 'Juan Pérez', role: 'Contador Senior', clients: 12, tasks: 5, performance: 94, avatar: 'https://picsum.photos/seed/juan/40' },
    { id: 'u2', name: 'Maria Soto', role: 'Auditora', clients: 8, tasks: 3, performance: 88, avatar: 'https://picsum.photos/seed/maria/40' },
    { id: 'u3', name: 'Ana Rojas', role: 'Asistente Contable', clients: 15, tasks: 12, performance: 72, avatar: 'https://picsum.photos/seed/ana/40' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestión de Equipo</h1>
          <p className="text-slate-500 text-sm">Administra los accesos de tu oficina y monitorea la carga de trabajo.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
          <UserPlus size={18} /> Invitar Colaborador
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div key={member.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full border-2 border-slate-100" />
                <div>
                  <h3 className="font-bold text-slate-900">{member.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{member.role}</p>
                </div>
              </div>
              <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400"><Shield size={16} /></button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-3 rounded-xl">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Clientes</p>
                <div className="flex items-center gap-2">
                  <Briefcase size={14} className="text-blue-500" />
                  <span className="font-bold text-slate-900">{member.clients}</span>
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Tickets</p>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{member.tasks}</span>
                  <span className="text-[10px] text-amber-600 bg-amber-50 px-1 rounded font-bold">Pendientes</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-500">Eficiencia de Cumplimiento</span>
                <span className="font-bold text-slate-900">{member.performance}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${member.performance > 90 ? 'bg-green-500' : 'bg-blue-500'}`} 
                  style={{ width: `${member.performance}%` }}
                ></div>
              </div>
            </div>

            <button className="w-full mt-6 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
              Ver Detalle de Carga <ChevronRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamView;
