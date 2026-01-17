
import React, { useState } from 'react';
import { MOCK_CLIENTS } from '../constants';
import { Plus, Search, Building2, Mail, Hash, UserCheck, Shield, ChevronRight, X } from 'lucide-react';

const ClientsView: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Cartera de Clientes</h1>
          <p className="text-slate-500 text-sm">Gestiona los RUTs y asignaciones de tu oficina.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
        >
          <Plus size={20} /> Nuevo Cliente / RUT
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Régimen Mayoritario</p>
          <h4 className="text-xl font-bold text-slate-900">Propyme General</h4>
          <p className="text-xs text-green-600 font-bold mt-1">65% de la cartera</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estado General</p>
          <h4 className="text-xl font-bold text-slate-900">Sincronizados</h4>
          <p className="text-xs text-blue-600 font-bold mt-1">Todos al día con SII</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="relative w-96">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input type="text" placeholder="Buscar por Nombre, RUT o Email..." className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" />
          </div>
        </div>

        <div className="divide-y divide-slate-50">
          {MOCK_CLIENTS.map((client) => (
            <div key={client.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{client.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase">{client.rut}</span>
                    <span className="text-xs text-slate-300">•</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                      <Shield size={12} className="text-blue-500" /> {client.regimen}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 hidden md:flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Mail size={12} /> {client.contactEmail}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                  <UserCheck size={12} className="text-emerald-500" /> Resp: Juan Pérez
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white hover:border-blue-500 transition-all">Ver Histórico</button>
                <button className="p-2 text-slate-400 hover:text-blue-600"><ChevronRight size={20} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Ingreso de Cliente */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-900">Integrar Nuevo Cliente</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white rounded-xl text-slate-400 transition-colors"><X size={20} /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Razón Social</label>
                  <input type="text" placeholder="Ej: Transportes Chile S.A." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">RUT Empresa</label>
                  <input type="text" placeholder="76.000.000-0" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Régimen Tributario</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Propyme General (14 D3)</option>
                  <option>Propyme Transparente (14 D8)</option>
                  <option>Régimen General (14 A)</option>
                  <option>Renta Presunta</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contador Asignado</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Juan Pérez (Senior)</option>
                  <option>Maria Soto (Auditora)</option>
                  <option>Ana Rojas (Asistente)</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all">Cancelar</button>
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all">Guardar e Iniciar Onboarding</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsView;
