import React, { useState, useEffect } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Bar, Line, ComposedChart, Cell, PieChart, Pie, Legend
} from 'recharts';
import { 
  Users, Clock, AlertTriangle, Zap, Calendar, 
  ArrowUpRight, ArrowDownRight, Activity, TrendingUp,
  FileBarChart, CheckCircle2, MoreVertical
} from 'lucide-react';
import { generateTaxSummary } from '../services/geminiService';
import { MOCK_CLIENTS, MOCK_TASKS } from '../constants';

const Dashboard: React.FC = () => {
  const [aiSummary, setAiSummary] = useState<string>("Analizando indicadores financieros...");
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
    { label: 'Cartera Total', value: '42 RUTs', trend: '+12%', trendType: 'up', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Cumplimiento F29', value: '94.2%', trend: '+3.4%', trendType: 'up', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Documentos Pendientes', value: '18', trend: '-5', trendType: 'down', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Alertas de Multa', value: '2', trend: 'Crítico', trendType: 'up', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  const mainChartData = [
    { name: 'Sem 1', real: 24, cumplimiento: 60, meta: 30 },
    { name: 'Sem 2', real: 32, cumplimiento: 46, meta: 30 },
    { name: 'Sem 3', real: 45, cumplimiento: 85, meta: 30 },
    { name: 'Sem 4', real: 58, cumplimiento: 92, meta: 30 },
  ];

  const distributionData = [
    { name: 'Declarado', value: 32, color: '#10b981' },
    { name: 'En Proceso', value: 8, color: '#3b82f6' },
    { name: 'Pendiente', value: 2, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-700">
      {/* Power BI Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center">
            <TrendingUp className="text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">ANALÍTICA DE CUMPLIMIENTO SII</h1>
            <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Dashboard Ejecutivo • Actualizado hace 5 min</p>
          </div>
        </div>
        <div className="flex gap-3">
           <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
              <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">Cierre Mensual F29</p>
              <p className="text-sm font-black text-red-600 leading-none italic">Vence en 12 días</p>
           </div>
           <button className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
              <Calendar size={20} />
           </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="kpi-card p-5">
            <div className="flex justify-between items-start mb-3">
               <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                 <stat.icon size={20} />
               </div>
               <div className={`flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-full ${stat.trendType === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                 {stat.trend}
               </div>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Composed Chart - High Density */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
             <div>
                <h3 className="font-black text-slate-900 uppercase tracking-tight text-lg">Evolución de Procesamiento</h3>
                <p className="text-xs text-slate-400 font-bold italic">Trámites liquidados vs % Eficiencia operativa</p>
             </div>
             <div className="flex gap-4">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-tighter"><div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div> Trámites</span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-tighter"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div> Eficiencia %</span>
             </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={mainChartData}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="real" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                <Line type="monotone" dataKey="cumplimiento" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#fff', strokeWidth: 2, stroke: '#10b981'}} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight Sidebar */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col border border-white/5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-[60px] -mr-16 -mt-16"></div>
          <div className="flex items-center gap-3 mb-6 relative z-10">
             <Zap className="text-blue-400" size={18} />
             <h3 className="text-xs font-black uppercase tracking-widest text-blue-100">Reporte Ejecutivo IA</h3>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 text-[11px] text-slate-400 leading-relaxed font-medium">
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
          <button className="mt-6 w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 transition-all rounded-xl text-[10px] font-black uppercase tracking-widest relative z-10">
            Descargar Reporte PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
           <h3 className="font-black text-slate-900 uppercase tracking-tight mb-6 text-sm">Distribución de Cartera</h3>
           <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={distributionData} innerRadius={50} outerRadius={70} paddingAngle={8} dataKey="value">
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
           </div>
           <div className="grid grid-cols-3 gap-2 mt-4">
              {distributionData.map((d, i) => (
                <div key={i} className="text-center">
                   <p className="text-[9px] font-black text-slate-400 uppercase mb-0.5">{d.name}</p>
                   <p className="text-sm font-black text-slate-900">{d.value}</p>
                </div>
              ))}
           </div>
        </div>

        <div className="lg:col-span-2 bg-blue-600 p-8 rounded-3xl text-white flex flex-col md:flex-row items-center gap-10 shadow-xl shadow-blue-500/20 relative overflow-hidden">
           <div className="absolute inset-0 bg-indigo-900/20 skew-x-12 translate-x-1/2"></div>
           <div className="shrink-0 relative">
              <div className="w-32 h-32 rounded-full border-[8px] border-white/10 flex items-center justify-center">
                 <div className="text-center">
                    <span className="text-3xl font-black block">12</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-blue-200">Días</span>
                 </div>
              </div>
              <div className="absolute inset-0 w-32 h-32 rounded-full border-[8px] border-emerald-400 border-t-transparent animate-spin-slow"></div>
           </div>
           <div className="relative z-10 text-center md:text-left">
              <h3 className="text-xl font-black tracking-tight mb-2 uppercase">Próximo Hito: Cierre IVA F29</h3>
              <p className="text-blue-100 font-medium leading-relaxed mb-6 text-xs max-w-md">
                Hemos detectado 8 clientes que aún no cargan sus facturas de compra exentas. 
                El sistema enviará un recordatorio automático en 2 horas si no hay cambios.
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                 <button className="px-5 py-2.5 bg-white text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">Notificar Críticos</button>
                 <button className="px-5 py-2.5 bg-blue-500/30 text-white rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10">Ver Detalle</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;