
import React from 'react';
import { FileUp, Clock, CheckCircle, AlertTriangle, MessageSquare, Download } from 'lucide-react';
import { MOCK_TASKS, MOCK_CLIENTS } from '../constants';
import { TaskStatus } from '../types';

interface ClientPortalProps {
  clientId: string;
}

const ClientPortal: React.FC<ClientPortalProps> = ({ clientId }) => {
  // CRITICAL: Filter data to ONLY this client
  const client = MOCK_CLIENTS.find(c => c.id === clientId) || MOCK_CLIENTS[0];
  const myTasks = MOCK_TASKS.filter(t => t.clientId === clientId);

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">¡Hola, {client.name}!</h1>
          <p className="text-slate-500 mt-1 font-medium italic">Tu cumplimiento tributario está bajo control.</p>
        </div>
        <div className="flex gap-3 relative z-10">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center gap-2 uppercase text-xs tracking-widest">
            <FileUp size={20} /> Subir Documentos
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl relative overflow-hidden">
          <div className="flex items-center gap-3 text-amber-700 mb-4 relative z-10">
            <AlertTriangle size={24} />
            <h3 className="font-black uppercase tracking-tight">Pendiente de tu parte</h3>
          </div>
          <p className="text-sm text-amber-800 leading-relaxed relative z-10 font-medium">
            Tu auditor ha solicitado:
          </p>
          <ul className="mt-4 space-y-2 relative z-10">
            {myTasks.length > 0 && myTasks[0].missingDocuments.map((doc, i) => (
              <li key={i} className="flex items-center gap-2 text-xs font-black text-amber-900 bg-white/70 p-2 rounded-lg border border-amber-200 uppercase tracking-tighter">
                <FileUp size={14} className="text-amber-600" /> {doc}
              </li>
            ))}
            {(!myTasks.length || myTasks[0].missingDocuments.length === 0) && (
              <li className="text-xs text-amber-700 italic">No tienes documentos pendientes hoy.</li>
            )}
          </ul>
          <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12">
            <AlertTriangle size={80} className="text-amber-900" />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl text-center relative overflow-hidden">
          <div className="flex items-center justify-center gap-3 text-blue-700 mb-4">
            <Clock size={24} />
            <h3 className="font-black uppercase tracking-tight">Próximo Plazo</h3>
          </div>
          <div className="py-4 relative z-10">
            <p className="text-5xl font-black text-blue-900 tracking-tighter">20</p>
            <p className="text-xs font-black text-blue-700 uppercase tracking-widest mt-1">Mayo 2025</p>
            <p className="text-[10px] text-blue-500 mt-2 font-bold bg-white/50 px-3 py-1 rounded-full inline-block">DECLARACIÓN MENSUAL F29</p>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl relative overflow-hidden">
          <div className="flex items-center gap-3 text-emerald-700 mb-4">
            <CheckCircle size={24} />
            <h3 className="font-black uppercase tracking-tight">Histórico de Documentos</h3>
          </div>
          <div className="space-y-3 mt-4">
            <div className="flex items-center justify-between text-[10px] font-black bg-white/70 p-3 rounded-xl border border-emerald-200 uppercase tracking-tight">
              <span>DJ 1887 Sueldos</span>
              <Download size={14} className="text-emerald-600 cursor-pointer hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-center justify-between text-[10px] font-black bg-white/70 p-3 rounded-xl border border-emerald-200 uppercase tracking-tight opacity-60">
              <span>F22 Renta 2024</span>
              <Download size={14} className="text-emerald-600 cursor-pointer hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-black text-slate-900 uppercase tracking-tight">Estado de mis trámites</h3>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sincronizado con SII • Hoy 10:45 AM</span>
        </div>
        <div className="divide-y divide-slate-50">
          {myTasks.map(task => (
            <div key={task.id} className="p-6 flex items-center justify-between hover:bg-slate-50/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${task.status === TaskStatus.COMPLETED ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                  {task.status === TaskStatus.COMPLETED ? <CheckCircle /> : <Clock />}
                </div>
                <div>
                  <p className="font-black text-slate-900 uppercase text-sm tracking-tight">{task.formType}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Auditor: {task.assignedTo}</span>
                    <span className="text-xs text-slate-300">•</span>
                    <button className="text-[10px] text-blue-600 font-black uppercase tracking-widest hover:underline">Soporte Directo</button>
                  </div>
                </div>
              </div>
              <div className="w-48">
                <div className="flex justify-between text-[10px] font-black mb-1 uppercase tracking-tighter">
                  <span className="text-slate-400">PROGRESO DEL TRÁMITE</span>
                  <span className="text-slate-900">{task.completionPercentage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-700 ${task.completionPercentage === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{width: `${task.completionPercentage}%`}}></div>
                </div>
              </div>
            </div>
          ))}
          {myTasks.length === 0 && (
            <div className="p-12 text-center text-slate-400 font-medium">No hay trámites activos para este periodo.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;
