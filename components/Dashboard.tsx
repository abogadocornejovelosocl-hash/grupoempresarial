
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend
} from 'recharts';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Users, 
  Clock, 
  FileText, 
  AlertTriangle,
  Zap
} from 'lucide-react';
import { generateTaxSummary } from '../services/geminiService';
import { MOCK_CLIENTS, MOCK_TASKS } from '../constants';
import { TaskStatus } from '../types';

const Dashboard: React.FC = () => {
  const [aiSummary, setAiSummary] = useState<string>("Generando resumen inteligente...");
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
    { label: 'Total Clientes', value: '42', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', change: '+2 este mes' },
    { label: 'Tareas Pendientes', value: '18', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', change: '-5 hoy' },
    { label: 'F29 Completados', value: '85%', icon: FileText, color: 'text-green-600', bg: 'bg-green-50', change: '+10% vs abr' },
    { label: 'Alertas Críticas', value: '3', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', change: 'Revisión inmediata' },
  ];

  const complianceData = [
    { name: 'Lun', compliance: 65 },
    { name: 'Mar', compliance: 72 },
    { name: 'Mie', compliance: 68 },
    { name: 'Jue', compliance: 85 },
    { name: 'Vie', compliance: 91 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Centro de Control</h1>
          <p className="text-slate-500 font-medium">Oficina Central - Gestión de Cumplimiento Tributario</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
          <Zap size={18} />
          Nuevo Trámite Express
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase ${stat.change.includes('+') ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-slate-900 text-xl tracking-tight uppercase">Productividad Semanal Cartera</h3>
            <select className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500">
              <option>Esta semana</option>
              <option>Cierre anterior</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)'}}
                />
                <Line type="monotone" dataKey="compliance" stroke="#3b82f6" strokeWidth={5} dot={{r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/30">
              <Zap size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-black text-lg leading-tight uppercase tracking-tighter">Reporte Ejecutivo AI</h3>
              <p className="text-[10px] text-blue-400 font-bold tracking-widest uppercase">Inteligencia de Cartera</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar prose prose-invert prose-sm">
            {isGenerating ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-3 bg-slate-800 rounded w-3/4"></div>
                <div className="h-3 bg-slate-800 rounded"></div>
                <div className="h-3 bg-slate-800 rounded w-5/6"></div>
                <div className="h-3 bg-slate-800 rounded w-1/2"></div>
              </div>
            ) : (
              <div className="text-slate-300 text-xs font-medium leading-relaxed whitespace-pre-wrap">
                {aiSummary}
              </div>
            )}
          </div>
          <button className="mt-6 w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 border-none">
            Enviar Alertas Consolidadas
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
