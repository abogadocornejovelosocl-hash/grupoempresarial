import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, Cell, PieChart, Pie, ComposedChart, Legend
} from 'recharts';
import { 
  Users, Clock, FileText, AlertTriangle, Zap, TrendingUp, Calendar, 
  CheckCircle2, ArrowUpRight, ArrowDownRight, Activity
} from 'lucide-react';
import { generateTaxSummary } from '../services/geminiService';
import { MOCK_CLIENTS, MOCK_TASKS } from '../constants';

const Dashboard: React.FC = () => {
  const [aiSummary, setAiSummary] = useState<string>("Analizando indicadores de cartera...");
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
    { label: 'Cartera Total', value: '42', trend: '+2', trendType: 'up', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Cumplimiento F29', value: '88.5%', trend: '+4.1%', trendType: 'up', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Pendientes Cliente', value: '14', trend: '-3', trendType: 'down', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Riesgo Crítico', value: '3', trend: '+1', trendType: 'up', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  const mainChartData = [
    { name: 'Lun', esperado: 4000, real: 2400, cumplimiento: 60 },
    { name: 'Mar', esperado: 3000, real: 1398, cumplimiento: 46 },
    { name: 'Mie', esperado: 2000, real: 9800, cumplimiento: 85 },
    { name: 'Jue', esperado: 2780, real: 3908, cumplimiento: 75 },
    { name: 'Vie', esperado: 1890, real: 4800, cumplimiento: 92 },
    { name: 'Sab', esperado: 2390, real: 3800, cumplimiento: 88 },
  ];

  const distributionData = [
    { name: 'Al Día', value: 32, color: '#10b981' },
    { name: 'Atrasado', value: 7, color: '#f59e0b' },
    { name: 'En Riesgo', value: 3, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-700">
      {/* Header Estilo Power BI */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">ANÁLISIS DE CUMPLIMIENTO</h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Corte de Datos: 20 Mayo 2025 • Sincronizado con SII</p>
        </div>
        <div className="flex gap-3">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Próximo Hito: F29</span>
              <span className="text-sm font-black text-blue-600 leading-none">Vence en 12 días</span>
           </div>
           <button className="bg-slate-900 text-white p-3 rounded-2xl hover:bg-slate-800 transition-all">
              <Calendar size={20} />
           </button>
        </div>
      </div>

      {/* KPI Cards Modernas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 kpi-shadow hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-4">
               <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                 <stat.icon size={24} />
               </div>
               <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full ${stat.trendType === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                 {stat.trendType === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                 {stat.trend}
               </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 leading-none">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Barras Compuesto */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 kpi-shadow">
          <div className="flex items-center justify-between mb-8">
             <div>
                <h3 className="font-black text-slate-900 uppercase tracking-tight">Efectividad Operativa Semanal</h3>
                <p className="text-xs text-slate-400 font-bold">Relación entre Trámites Esperados vs Realizados</p>
             </div>
             <div className="flex gap-4">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase"><div className="w-2 h-2 rounded-full bg-blue-600"></div> Real</span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> % Cumplimiento</span>
             </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={mainChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="real" fill="#3b82f6" radius={[8, 8, 0, 0]} barSize={40} />
                <Line type="monotone" dataKey="cumplimiento" stroke="#10b981" strokeWidth={4} dot={{r: 4, fill: '#fff', strokeWidth: 2, stroke: '#10b981'}} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight & Time Gauges */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] kpi-shadow relative overflow-hidden h-full flex flex-col">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 rounded-full blur-[80px] -mr-24 -mt-24"></div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
               <Zap className="text-blue-400" size={20} />
               <h3 className="text-sm font-black uppercase tracking-tighter text-blue-100">Reporte Ejecutivo AI</h3>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 text-xs text-slate-300 leading-relaxed font-medium">
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
            <button className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 relative z-10">
              Notificar a Cartera Riesgosa
            </button>
          </div>
        </div>
      </div>

      {/* Grid Inferior: Distribución y Tiempo Restante */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 kpi-shadow">
           <h3 className="font-black text-slate-900 uppercase tracking-tight mb-6">Estado de Documentación</h3>
           <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={distributionData} innerRadius={60} outerRadius={80} paddingAngle={10} dataKey="value">
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
                   <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">{d.name}</p>
                   <p className="text-lg font-black text-slate-900">{d.value}</p>
                </div>
              ))}
           </div>
        </div>

        <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-8 kpi-shadow">
           <div className="shrink-0 relative">
              <div className="w-32 h-32 rounded-full border-[12px] border-white/10 flex items-center justify-center">
                 <span className="text-3xl font-black">12</span>
              </div>
              <div className="absolute inset-0 w-32 h-32 rounded-full border-[12px] border-emerald-400 border-t-transparent -rotate-45"></div>
           </div>
           <div>
              <h3 className="text-2xl font-black tracking-tighter mb-2 uppercase">Cuenta Regresiva F29</h3>
              <p className="text-blue-100 font-medium leading-tight mb-4 text-sm">
                Quedan 12 días para el cierre mensual. 14 clientes aún no han cargado sus cartolas bancarias de Abril.
              </p>
              <div className="flex gap-2">
                 <button className="px-5 py-2.5 bg-white text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl">Enviar Recordatorio Masivo</button>
                 <button className="px-5 py-2.5 bg-blue-500/30 text-white rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10">Ver Detalles</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;