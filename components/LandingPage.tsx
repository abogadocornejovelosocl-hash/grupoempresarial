
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Newspaper, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  ChevronRight,
  Globe,
  Zap,
  DollarSign,
  Briefcase
} from 'lucide-react';
import { getTaxAssistantResponse } from '../services/geminiService';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [newsSummary, setNewsSummary] = useState<string>("Sincronizando últimas circulares del SII...");
  
  useEffect(() => {
    async function loadNews() {
      const summary = await getTaxAssistantResponse("Resume las 3 noticias tributarias más importantes de Chile en Mayo 2025 de forma muy breve para una landing page.");
      setNewsSummary(summary);
    }
    loadNews();
  }, []);

  const indicators = [
    { label: 'UF (Unidad de Fomento)', value: '$37.452,12', trend: '+0.15%' },
    { label: 'UTM (Mayo)', value: '$65.443,00', trend: 'Fijo' },
    { label: 'Dólar Observado', value: '$924,50', trend: '-2.40%' },
    { label: 'IPC (Abril)', value: '0.5%', trend: 'Anual 4.0%' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">G</div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter leading-none">Grupo</span>
              <span className="text-[10px] text-blue-600 font-black uppercase tracking-widest">Empresarial</span>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-6 text-sm font-bold text-slate-500">
              <a href="#" className="hover:text-blue-600">Servicios</a>
              <a href="#" className="hover:text-blue-600">Indicadores</a>
              <a href="#" className="hover:text-blue-600">Noticias</a>
            </div>
            <button 
              onClick={onLogin}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2"
            >
              Acceder al Portal <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6 animate-bounce">
            <Zap size={12} /> Gestión Tributaria 2025
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6 leading-[1.1]">
            Cumplimiento Sin Esfuerzo.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Resultados Con Certeza.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium mb-10">
            La plataforma líder para oficinas contables en Chile. Centraliza RUTs, automatiza plazos y mantén a tus clientes siempre informados.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button onClick={onLogin} className="w-full md:w-auto px-10 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-2xl shadow-blue-600/30 hover:scale-105 transition-all">
              EMPEZAR AHORA
            </button>
            <button className="w-full md:w-auto px-10 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all">
              AGENDAR ASESORÍA
            </button>
          </div>
        </div>
      </header>

      {/* Real-time Economic Indicators */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {indicators.map((ind, i) => (
            <div key={i} className={`flex flex-col ${i !== indicators.length -1 ? 'md:border-r border-slate-100' : ''}`}>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{ind.label}</span>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-black text-slate-900 leading-none">{ind.value}</span>
                <span className={`text-[10px] font-bold pb-0.5 ${ind.trend.includes('-') ? 'text-red-500' : ind.trend.includes('+') ? 'text-green-500' : 'text-slate-400'}`}>
                  {ind.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Potencia tu Oficina Contable</h2>
          <p className="text-slate-500 font-medium">Diseñado específicamente para la normativa chilena.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: ShieldCheck, title: "Plazos SII", desc: "Sincronización automática de vencimientos para F29, F22 y Declaraciones Juradas." },
            { icon: Clock, title: "Trazabilidad Total", desc: "Historial detallado de cada gestión, documento subido y comunicación con el cliente." },
            { icon: Briefcase, title: "Gestión de RUTs", desc: "Controla múltiples empresas desde un solo panel con analítica de carga de trabajo." }
          ].map((feat, i) => (
            <div key={i} className="group flex flex-col items-center text-center p-8 rounded-3xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <feat.icon size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tighter">{feat.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* News & AI Insights */}
      <section className="bg-slate-900 py-32 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
              <Globe size={12} /> Centro de Noticias
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">
              Mantente al día con la <br />
              <span className="text-blue-500">Actualidad Tributaria</span>
            </h2>
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
                 <div className="flex items-center gap-3 mb-4 text-blue-400">
                    <Zap size={20} />
                    <span className="font-black uppercase text-xs tracking-widest">Resumen AI - Hoy</span>
                 </div>
                 <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                    {newsSummary}
                 </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
             <div className="bg-white p-8 rounded-[2rem] text-slate-900 shadow-2xl rotate-2">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Newspaper size={24} /></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SII Chile</span>
                </div>
                <h4 className="font-black text-lg mb-2 uppercase tracking-tight leading-tight">Nuevas directrices para el IVA en servicios digitales</h4>
                <p className="text-slate-500 text-xs font-medium mb-6">Circular N° 14 actualiza los criterios de fiscalización para plataformas extranjeras...</p>
                <button className="text-blue-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">Leer más <ChevronRight size={14} /></button>
             </div>
             <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2rem] text-white shadow-2xl -rotate-2">
                <h4 className="font-black text-2xl mb-4 tracking-tighter uppercase leading-none">Operación Renta 2025</h4>
                <p className="text-blue-100 text-sm font-medium mb-6">Revisa los nuevos plazos y formularios para el proceso de este año.</p>
                <div className="flex -space-x-3 mb-6">
                  {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-blue-700 bg-blue-400 flex items-center justify-center font-bold text-xs">U{i}</div>)}
                </div>
                <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-black text-xs uppercase tracking-widest">Descargar Guía</button>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-20 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center font-bold text-white">G</div>
            <div className="text-left">
              <span className="font-black text-xl tracking-tighter block leading-none text-slate-900">Grupo</span>
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Empresarial</span>
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium">© 2025 Grupo Empresarial SpA. Todos los derechos reservados.</p>
          <div className="mt-6 flex justify-center gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-blue-600">Privacidad</a>
            <a href="#" className="hover:text-blue-600">Términos</a>
            <a href="#" className="hover:text-blue-600">Soporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
