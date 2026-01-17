import React from 'react';
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
    <div className="max-w-5xl mx-auto space-y-6 animate-in slide-in-from-bottom-5 duration-700">
      {/* Saludo y CTA Principal */}
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] -mr-40 -mt-40"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
               <span className="text-[10px] font-black bg-blue-600 text-white px-2.5 py-1 rounded-lg uppercase tracking-widest shadow-lg shadow-blue-500/20">Portal Oficial</span>
               <span className="text-[10px] font-black bg-emerald-100 text-emerald-600 px-2.5 py-1 rounded-lg uppercase tracking-widest">Estado: Al Día</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-1">Bienvenido, {client.name}</h1>
            <p className="text-slate-500 font-bold text-sm">Gestionando tu cumplimiento tributario con precisión.</p>
          </div>
          <button className="bg-blue-600 text-white px-10 py-5 rounded-[1.5rem] font-black shadow-2xl shadow-blue-600/30 hover:scale-105 transition-all flex items-center gap-3 uppercase text-xs tracking-widest">
            <FileUp size={20} /> Cargar Documentos Mayo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Línea de Trazabilidad */}
        <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="font-black text-slate-900 uppercase tracking-tight mb-8 flex items-center gap-3">
             <div className="p-2 bg-blue-50 rounded-xl text-blue-600"><Info size={20} /></div> 
             Trazabilidad de tu Declaración Actual
          </h3>
          <div className="relative pl-6">
            <div className="absolute left-[34px] top-2 bottom-2 w-1 bg-slate-100 rounded-full"></div>
            <div className="space-y-10 relative">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-8 group">
                  <div className={`w-10 h-10 rounded-2xl border-4 border-white shadow-xl flex items-center justify-center relative z-10 transition-all ${
                    step.status === 'completed' ? 'bg-emerald-500' : 
                    step.status === 'in_progress' ? 'bg-blue-600 animate-pulse scale-110' : 'bg-slate-200'
                  }`}>
                    {step.status === 'completed' && <CheckCircle size={18} className="text-white" />}
                    {step.status === 'in_progress' && <Clock size={18} className="text-white" />}
                  </div>
                  <div className="flex-1 flex justify-between items-center bg-slate-50/50 p-4 rounded-2xl border border-transparent hover:border-slate-200 transition-all">
                    <div>
                      <p className={`text-sm font-black uppercase tracking-tight ${step.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>{step.label}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{step.date}</p>
                    </div>
                    {step.status === 'in_progress' && (
                      <span className="text-[10px] font-black bg-blue-600 text-white px-3 py-1.5 rounded-full shadow-lg shadow-blue-500/20 uppercase tracking-widest">Gestor trabajando</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alertas y Tiempo */}
        <div className="space-y-6">
           <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-600/10 blur-[50px] rounded-full"></div>
              <Clock size={48} className="text-blue-400 mb-6" />
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Vencimiento SII F29</h4>
              <p className="text-5xl font-black tracking-tighter mb-2">12 DÍAS</p>
              <div className="bg-white/10 px-6 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest">Plazo: 20 de Mayo</div>
           </div>

           <div className="bg-amber-50 border border-amber-200 p-8 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <AlertTriangle size={80} className="text-amber-900" />
              </div>
              <h3 className="font-black uppercase tracking-tight text-sm text-amber-900 mb-6">Acciones Requeridas</h3>
              <ul className="space-y-4 relative z-10">
                {myTasks.filter(t => t.missingDocuments.length > 0).map((task, i) => (
                  <li key={i} className="space-y-3">
                    {task.missingDocuments.map((doc, j) => (
                      <div key={j} className="flex items-center justify-between bg-white p-4 rounded-2xl border border-amber-200 shadow-sm">
                        <span className="text-[10px] font-black text-amber-900 uppercase tracking-tight">{doc}</span>
                        <FileUp size={16} className="text-amber-600" />
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;