import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, Cell, PieChart, Pie
} from 'recharts';
import { 
  Users, Clock, FileText, AlertTriangle, Zap, TrendingUp, Calendar, 
  CheckCircle2, Info, ArrowRight
} from 'lucide-react';
import { generateTaxSummary } from '../services/geminiService';
import { MOCK_CLIENTS, MOCK_TASKS } from '../constants';

const Dashboard: React.FC = () => {
  const [aiSummary, setAiSummary] = useState<string>("Generando reporte ejecutivo...");
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    async function loadSummary() {
      const summary = await generateTaxSummary(MOCK_TASKS, MOCK_CLIENTS);
      setAiSummary(summary);
      setIsGenerating(false);
    }
    loadSummary();
  }, []);

  const stats = [
    { label: 'RUTs Activos', value: '42', detail: 'Sincronizados SII', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Cumplimiento F29', value: '88%', detail: 'Periodo Mayo', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Documentos Pendientes', value: '14', detail: 'De 6 clientes', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Alertas Críticas', value: '3', detail: 'Riesgo de Multa', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  const chartData = [
    { name: 'Lun', ingresos: 4500, cumplimiento: 65 },
    { name: 'Mar', ingresos: 5200, cumplimiento: 72 },
    { name: 'Mie', ingresos: 4800, cumplimiento: 68 },
    { name: 'Jue', ingresos: 6100, cumplimiento: 85 },
    { name: 'Vie', ingresos: 5900, cumplimiento: 91 },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">TABLERO DE MANDO</h1>
          <p className="text-slate-500 font-semibold text-sm">Oficina Central • Reporte Consolidado al 20 de Mayo 2025</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-3 shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Sincronización SII: OK</span>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
            <Calendar size={18} /> Exportar Reporte Mensual
          </button>
        </div>
      </div>

      {/* KPI Cards Estilo PowerBI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900 leading-none mb-1">{stat.value}</h3>
              <p className="text-[10px] text-slate-500 font-bold">{stat.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico Principal */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
             <h3 className="font-black text-slate-900 uppercase tracking-tight">Evolución de Cumplimiento Cartera</h3>
             <div className="flex gap-4">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400"><div className="w-2 h-2 rounded-full bg-blue-600"></div> Ingresos Procesados</span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Cumplimiento %</span>
             </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                <Area type="monotone" dataKey="cumplimiento" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="transparent" />
                <Area type="monotone" dataKey="ingresos" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorBlue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Panel AI y Tiempo Restante */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col relative overflow-hidden h-[340px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>
            <div className="flex items-center gap-3 mb-4">
              <Zap size={20} className="text-blue-400" />
              <h3 className="font-black text-sm uppercase tracking-tighter">Resumen Estratégico AI</h3>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar text-xs text-slate-300 leading-relaxed">
              {isGenerating ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-2 bg-slate-800 rounded w-full"></div>
                  <div className="h-2 bg-slate-800 rounded w-5/6"></div>
                  <div className="h-2 bg-slate-800 rounded w-4/6"></div>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{aiSummary}</div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-3xl text-white shadow-lg shadow-orange-500/20">
            <div className="flex justify-between items-start mb-2">
              <Clock size={24} />
              <span className="text-[10px] font-black uppercase tracking-widest bg-black/20 px-2 py-1 rounded">Fecha Crítica</span>
            </div>
            <h4 className="font-black text-xl leading-tight">Vencimiento F29 (IVA)</h4>
            <div className="mt-4 flex items-end gap-2">
              <span className="text-4xl font-black">12</span>
              <span className="text-sm font-bold opacity-80 mb-1 uppercase tracking-tighter">Días restantes</span>
            </div>
            <div className="mt-4 w-full bg-white/20 h-2 rounded-full overflow-hidden">
               <div className="bg-white h-full w-[60%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;