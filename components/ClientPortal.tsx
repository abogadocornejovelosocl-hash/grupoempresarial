import React from 'react';
import { FileUp, Clock, CheckCircle, AlertTriangle, Info, ArrowRight, Download } from 'lucide-react';
import { MOCK_TASKS, MOCK_CLIENTS } from '../constants';

interface ClientPortalProps {
  clientId: string;
}

const ClientPortal: React.FC<ClientPortalProps> = ({ clientId }) => {
  const client = MOCK_CLIENTS.find(c => c.id === clientId) || MOCK_CLIENTS[0];
  const myTasks = MOCK_TASKS.filter(t => t.clientId === clientId);

  const steps = [
    { label: 'Recepción Documentaria', status: 'completed', date: '01 May', desc: 'Facturas y boletas recibidas' },
    { label: 'Carga en Registro SII', status: 'completed', date: '05 May', desc: 'Sincronización con RCV exitosa' },
    { label: 'Conciliación Bancaria', status: 'in_progress', date: 'En Proceso', desc: 'Validando cartolas contra registros' },
    { label: 'Declaración e Impuesto', status: 'pending', date: '20 May', desc: 'Pendiente de cálculo final' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in slide-in-from-bottom-5 duration-700">
      {/* Header Ejecutivo */}
      <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
               <span className="text-[9px] font-black bg-slate-900 text-white px-2.5 py-1 rounded-md uppercase tracking-widest">Portal Exclusivo</span>
               <span className="text-[9px] font-black bg-emerald-100 text-emerald-600 px-2.5 py-1 rounded-md uppercase tracking-widest font-mono">ESTADO: AL DÍA</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-1">¡Buen día, {client.name.split(' ')[0]}!</h1>
            <p className="text-slate-500 font-bold text-sm">Gestionando tu cumplimiento tributario con transparencia total.</p>
          </div>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-blue-600/20 hover:scale-105 transition-all flex items-center gap-3 uppercase text-[10px] tracking-widest">
            <FileUp size={18} /> Subir Documentos Pendientes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trazabilidad (Timeline) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-10">
             <h3 className="font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Info size={16} /></div> 
                Trazabilidad del Proceso: Mayo
             </h3>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SII F29</span>
          </div>
          
          <div className="relative pl-4">
            <div className="absolute left-[23px] top-2 bottom-2 w-1 bg-slate-100 rounded-full"></div>
            <div className="space-y-12 relative">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-8">
                  <div className={`w-6 h-6 rounded-full border-4 border-white shadow-md relative z-10 transition-all ${
                    step.status === 'completed' ? 'bg-emerald-500' : 
                    step.status === 'in_progress' ? 'bg-blue-600 animate-pulse' : 'bg-slate-200'
                  }`}></div>
                  <div className="flex-1 flex justify-between items-center bg-slate-50/50 p-5 rounded-2xl border border-transparent hover:border-slate-200 transition-all">
                    <div>
                      <p className={`text-xs font-black uppercase tracking-tight ${step.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>{step.label}</p>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">{step.desc}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{step.date}</p>
                       {step.status === 'in_progress' && <span className="text-[8px] font-black text-blue-600 uppercase">En Auditoría</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Widgets de Estado */}
        <div className="space-y-6">
           <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-600/5 blur-[40px]"></div>
              <Clock size={40} className="text-blue-400 mb-6" />
              <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Próximo Vencimiento SII</h4>
              <p className="text-4xl font-black tracking-tighter mb-2">12 DÍAS</p>
              <div className="bg-white/10 px-4 py-1.5 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-widest">Vence: 20 de Mayo</div>
           </div>

           <div className="bg-amber-50 border border-amber-200 p-8 rounded-3xl">
              <h3 className="font-black uppercase tracking-tight text-xs text-amber-900 mb-6 flex items-center gap-2">
                <AlertTriangle size={16} /> Acción Requerida
              </h3>
              <div className="space-y-3">
                {myTasks.filter(t => t.missingDocuments.length > 0).map((task, i) => (
                  <div key={i} className="space-y-2">
                    {task.missingDocuments.map((doc, j) => (
                      <div key={j} className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-amber-200 shadow-sm">
                        <span className="text-[10px] font-black text-amber-900 uppercase tracking-tight">{doc}</span>
                        <ArrowRight size={14} className="text-amber-600" />
                      </div>
                    ))}
                  </div>
                ))}
                {myTasks.every(t => t.missingDocuments.length === 0) && (
                   <p className="text-[10px] font-bold text-amber-800 text-center uppercase tracking-widest">Sin acciones pendientes</p>
                )}
              </div>
           </div>

           <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center">
              <Download size={24} className="mx-auto text-slate-400 mb-4" />
              <h4 className="text-xs font-black uppercase tracking-tight text-slate-900 mb-1">Tu Carpeta Tributaria</h4>
              <p className="text-[10px] text-slate-500 font-medium mb-4">Accede a tus documentos históricos y certificados del SII.</p>
              <button className="w-full py-2.5 border border-slate-200 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">Abrir Repositorio</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;