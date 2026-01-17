
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, Cell, PieChart, Pie, Legend, ComposedChart
} from 'recharts';
import { 
  Download, 
  FileText, 
  Mail, 
  Table, 
  Filter, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Calendar,
  ChevronDown,
  Printer,
  Share2
} from 'lucide-react';

const ReportsView: React.FC = () => {
  const [exportLoading, setExportLoading] = useState<string | null>(null);

  const handleExport = (type: string) => {
    setExportLoading(type);
    setTimeout(() => setExportLoading(null), 1500);
  };

  const performanceData = [
    { name: 'Juan Pérez', completado: 45, pendiente: 12, eficiencia: 92 },
    { name: 'Maria Soto', completado: 38, pendiente: 8, eficiencia: 88 },
    { name: 'Clemente T.', completado: 52, pendiente: 5, eficiencia: 96 },
    { name: 'Ana Rojas', completado: 30, pendiente: 15, eficiencia: 75 },
  ];

  const complianceTrends = [
    { mes: 'Ene', f29: 98, renta: 10, promedio: 54 },
    { mes: 'Feb', f29: 95, renta: 15, promedio: 55 },
    { mes: 'Mar', f29: 92, renta: 40, promedio: 66 },
    { mes: 'Abr', f29: 99, renta: 85, promedio: 92 },
    { mes: 'May', f29: 88, renta: 20, promedio: 54 },
  ];

  const statusPieData = [
    { name: 'Al Día', value: 34, color: '#10b981' },
    { name: 'En Proceso', value: 12, color: '#3b82f6' },
    { name: 'Con Observaciones', value: 5, color: '#f59e0b' },
    { name: 'Atrasados', value: 2, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header with Advanced Export Tools */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Analítica de Cartera</h1>
          <p className="text-slate-500 text-sm font-medium">Panel Ejecutivo de Cumplimiento y Gestión Operativa</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <button 
              onClick={() => handleExport('pdf')}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 border-r border-slate-100 transition-colors"
            >
              <FileText size={16} className="text-red-500" /> 
              {exportLoading === 'pdf' ? 'Generando...' : 'PDF'}
            </button>
            <button 
              onClick={() => handleExport('csv')}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 border-r border-slate-100 transition-colors"
            >
              <Table size={16} className="text-green-600" /> 
              {exportLoading === 'csv' ? 'Descargando...' : 'Excel/CSV'}
            </button>
            <button 
              onClick={() => handleExport('email')}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Mail size={16} className="text-blue-500" /> 
              {exportLoading === 'email' ? 'Enviando...' : 'Enviar Reporte'}
            </button>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
            <Filter size={16} /> Filtros Avanzados
          </button>
        </div>
      </div>

      {/* KPI Section - Power BI Look */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tasa de Cumplimiento</p>
          <div className="flex items-end gap-2">
            <h4 className="text-2xl font-black text-slate-900">92.4%</h4>
            <span className="text-[10px] text-green-600 font-bold mb-1 flex items-center gap-0.5">
              <TrendingUp size={10} /> +4.2%
            </span>
          </div>
          <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full w-[92%]"></div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">RUTs Sincronizados</p>
          <div className="flex items-end gap-2">
            <h4 className="text-2xl font-black text-slate-900">142</h4>
            <span className="text-[10px] text-blue-600 font-bold mb-1">Carpetas activas</span>
          </div>
          <div className="mt-3 flex gap-1">
             {[1,1,1,1,1,0.5,0.2].map((v, i) => <div key={i} className="flex-1 bg-blue-100 h-4 rounded-sm" style={{height: `${v*16}px`}}></div>)}
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Efectividad Equipo</p>
          <div className="flex items-end gap-2">
            <h4 className="text-2xl font-black text-slate-900">8.5/10</h4>
            <span className="text-[10px] text-amber-600 font-bold mb-1">SLA Promedio</span>
          </div>
          <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
            <div className="bg-blue-600 w-[60%]"></div>
            <div className="bg-amber-400 w-[25%]"></div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Riesgo Multas</p>
          <div className="flex items-end gap-2">
            <h4 className="text-2xl font-black text-red-600">Bajo</h4>
            <span className="text-[10px] text-slate-500 font-bold mb-1">3 RUTs en alerta</span>
          </div>
          <div className="mt-3 flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-[10px] text-red-500 font-bold">Requiere acción en 48h</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Productivity Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight">Carga de Trabajo y Eficiencia</h3>
              <p className="text-xs text-slate-500">Comparativa de tickets completados vs eficiencia por contador</p>
            </div>
            <div className="flex items-center gap-2">
               <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase"><div className="w-2 h-2 rounded-full bg-blue-600"></div> Completados</span>
               <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase"><div className="w-2 h-2 rounded-full bg-indigo-400"></div> Eficiencia %</span>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 700}} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'}} 
                  cursor={{fill: '#f8fafc'}}
                />
                <Bar yAxisId="left" dataKey="completado" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                <Line yAxisId="right" type="monotone" dataKey="eficiencia" stroke="#6366f1" strokeWidth={4} dot={{r: 4, fill: '#fff', strokeWidth: 2, stroke: '#6366f1'}} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution Pie */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight mb-8">Estado de la Cartera</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-3">
             <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                <span className="text-xs font-bold text-slate-600">Tiempo medio de cierre</span>
                <span className="text-xs font-black text-slate-900">12.4 hrs</span>
             </div>
             <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                <span className="text-xs font-bold text-slate-600">Sincronización SII</span>
                <span className="text-xs font-black text-green-600 flex items-center gap-1"><CheckCircle size={12} /> Óptima</span>
             </div>
          </div>
        </div>
      </div>

      {/* Historical Compliance Area Chart */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h3 className="font-black text-slate-900 text-xl uppercase tracking-tighter">Histórico de Cumplimiento Consolidado</h3>
            <p className="text-sm text-slate-500">Evolución de declaraciones mensuales F29 y Renta Anual</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-slate-50 text-[10px] font-black uppercase rounded-lg border border-slate-200">2024</button>
            <button className="px-3 py-1.5 bg-blue-600 text-[10px] font-black uppercase rounded-lg text-white">2025</button>
          </div>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={complianceTrends}>
              <defs>
                <linearGradient id="colorF29" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRenta" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 700}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
              <Tooltip 
                contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)'}}
              />
              <Area type="monotone" dataKey="f29" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorF29)" />
              <Area type="monotone" dataKey="renta" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorRenta)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Advisory Panel */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-8 rounded-[2rem] text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center shrink-0 border border-white/20 backdrop-blur-xl">
           <TrendingUp size={40} className="text-blue-400" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-black mb-2 flex items-center justify-center md:justify-start gap-2">
            Insight de Inteligencia Tributaria <span className="text-[10px] bg-blue-500 px-2 py-0.5 rounded-full uppercase">Beta</span>
          </h3>
          <p className="text-slate-300 leading-relaxed text-sm">
            "Detectamos una concentración inusual de trámites pendientes en el área de <strong>Propyme General</strong>. 
            Sugerimos reequilibrar la carga de Maria Soto hacia Clemente para asegurar el cumplimiento del F29 antes del día 20. 
            El riesgo de mora ha bajado un 15% respecto al mes anterior."
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <button className="px-6 py-3 bg-white text-slate-900 rounded-2xl font-black text-sm hover:scale-105 transition-all">Optimizar Cartera</button>
          <button className="px-6 py-3 bg-white/10 text-white rounded-2xl font-black text-sm border border-white/20 hover:bg-white/20 transition-all">Ver Recomendaciones</button>
        </div>
      </div>
    </div>
  );
};

export default ReportsView;
