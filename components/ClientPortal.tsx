import React from 'react';
// Added FileText to the imports from lucide-react
import { FileUp, Clock, CheckCircle, AlertTriangle, Download, ChevronRight, Info, FileText } from 'lucide-react';
import { MOCK_TASKS, MOCK_CLIENTS } from '../constants';
import { TaskStatus } from '../types';

interface ClientPortalProps {
  clientId: string;
}

const ClientPortal: React.FC<ClientPortalProps> = ({ clientId }) => {
  const client = MOCK_CLIENTS.find(c => c.id === clientId) || MOCK_CLIENTS[0];
  const myTasks = MOCK_TASKS.filter(t => t.clientId === clientId);

  const steps = [
    { label: 'Recepción de Documentos', status: 'completed', date: '01 May' },
    { label: 'Carga de Compras y Ventas', status: 'completed', date: '05 May' },
    { label: 'Conciliación Bancaria', status: 'in_progress', date: 'Hoy' },
    { label: 'Declaración F29', status: 'pending', date: '20 May' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <span className="text-[10px] font-black bg-blue-100 text-blue-600 px-2 py-0.5 rounded uppercase tracking-widest">Portal Oficial</span>
               <span className="text-[10px] font-black bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded uppercase tracking-widest">Cumplimiento: 85%</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">¡Hola, {client.name}!</h1>
            <p className="text-slate-500 font-medium mt-1">Tu auditor asignado es <span className="text-blue-600 font-bold">Juan Pérez</span></p>
          </div>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-blue-600/20 hover:scale-105 transition-all flex items-center gap-2 uppercase text-xs tracking-widest border-none cursor-pointer">
            <FileUp size={18} /> Subir Documentos Mes Mayo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Qué está pasando - Timeline */}
        <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2">
             <Info size={18} className="text-blue-500" /> Trazabilidad de tu proceso actual
          </h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100"></div>
            <div className="space-y-8 relative">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-6 group">
                  <div className={`w-8 h-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center relative z-10 ${
                    step.status === 'completed' ? 'bg-emerald-500' : 
                    step.status === 'in_progress' ? 'bg-blue-600 animate-pulse' : 'bg-slate-200'
                  }`}>
                    {step.status === 'completed' && <CheckCircle size={14} className="text-white" />}
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <p className={`text-sm font-black uppercase tracking-tight ${step.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>{step.label}</p>
                      <p className="text-[10px] font-bold text-slate-400">{step.date}</p>
                    </div>
                    {step.status === 'in_progress' && (
                      <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2 py-1 rounded">TRABAJANDO AHORA</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tiempo Restante y Alertas */}
        <div className="space-y-6">
           <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col items-center justify-center text-center">
              <Clock size={32} className="text-blue-400 mb-4" />
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Próximo Vencimiento SII</h4>
              <p className="text-4xl font-black tracking-tighter mb-2">12 DÍAS</p>
              <p className="text-xs font-bold bg-white/10 px-4 py-1.5 rounded-full border border-white/10">VENCE 20 DE MAYO</p>
           </div>

           <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl relative overflow-hidden">
              <div className="flex items-center gap-3 text-amber-700 mb-4">
                <AlertTriangle size={24} />
                <h3 className="font-black uppercase tracking-tight text-sm">Pendientes para hoy</h3>
              </div>
              <ul className="space-y-3">
                {myTasks.filter(t => t.missingDocuments.length > 0).map((task, i) => (
                  <li key={i} className="space-y-2">
                    {task.missingDocuments.map((doc, j) => (
                      <div key={j} className="flex items-center justify-between bg-white/70 p-3 rounded-xl border border-amber-200">
                        <span className="text-[10px] font-black text-amber-900 uppercase">{doc}</span>
                        <FileUp size={14} className="text-amber-600" />
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
           </div>
        </div>
      </div>

      {/* Trámites en Curso */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
           <h3 className="font-black text-slate-900 uppercase tracking-tighter">Estado de Trámites Vigentes</h3>
           <button className="text-[10px] font-black text-blue-600 flex items-center gap-1 uppercase tracking-widest">Descargar Todo <Download size={12} /></button>
        </div>
        <div className="divide-y divide-slate-100">
          {myTasks.map(task => (
            <div key={task.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${task.status === TaskStatus.COMPLETED ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                  {/* Fixed missing FileText icon import */}
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-tight">{task.formType}</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Ref: {task.id}</p>
                </div>
              </div>
              <div className="flex-1 max-w-xs">
                <div className="flex justify-between text-[10px] font-black mb-1.5 uppercase tracking-tighter">
                  <span className="text-slate-400">Progreso del Trámite</span>
                  <span className="text-slate-900">{task.completionPercentage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-700 ${task.completionPercentage === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{width: `${task.completionPercentage}%`}}></div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                 <span className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-tight ${
                    task.status === TaskStatus.COMPLETED ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-blue-50 text-blue-600 border-blue-200'
                 }`}>
                   {task.status.replace('_', ' ')}
                 </span>
                 <button className="p-2 text-slate-300 hover:text-slate-600"><ChevronRight size={20} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;