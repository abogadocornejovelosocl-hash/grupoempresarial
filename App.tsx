
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Tasks from './components/Tasks';
import CalendarView from './components/CalendarView';
import ReportsView from './components/ReportsView';
import TeamView from './components/TeamView';
import ClientPortal from './components/ClientPortal';
import HistoryView from './components/HistoryView';
import ClientsView from './components/ClientsView';
import LandingPage from './components/LandingPage';
import { getTaxAssistantResponse } from './services/geminiService';
import { UserRole, User } from './types';
import { MOCK_CLIENTS } from './constants';
import { 
  Bell, 
  Search, 
  ChevronRight,
  MessageSquare,
  Send,
  Loader2,
  LogOut
} from 'lucide-react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [role, setRole] = useState<UserRole>('ADMIN');
  
  // Simulación de usuario logueado
  const [currentUser] = useState<User>({
    id: 'u-admin',
    name: 'Clemente T.',
    email: 'clemente@grupoempresarial.cl',
    role: 'ADMIN'
  });

  // Simulación de cliente logueado
  const currentClient = MOCK_CLIENTS[0];

  const [showChatAssistant, setShowChatAssistant] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    {role: 'ai', text: `Bienvenido a Grupo Empresarial. Soy tu consultor AI. ¿Tienes dudas sobre el cumplimiento de ${role === 'CLIENT' ? currentClient.name : 'tu oficina'}?`}
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');
    setIsTyping(true);

    try {
      const response = await getTaxAssistantResponse(userMessage);
      setChatMessages(prev => [...prev, { role: 'ai', text: response }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'ai', text: 'Lo siento, hubo un error procesando tu consulta.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const renderContent = () => {
    if (role === 'CLIENT') {
      switch (activeView) {
        case 'client-portal': return <ClientPortal clientId={currentClient.id} />;
        case 'tasks': return <Tasks role={role} clientId={currentClient.id} />;
        case 'history': return <HistoryView role={role} clientId={currentClient.id} />;
        default: return <ClientPortal clientId={currentClient.id} />;
      }
    }

    switch (activeView) {
      case 'dashboard': return <Dashboard />;
      case 'tasks': return <Tasks role={role} />;
      case 'calendar': return <CalendarView />;
      case 'reports': return <ReportsView />;
      case 'team': return <TeamView />;
      case 'history': return <HistoryView role={role} />;
      case 'clients': return <ClientsView />;
      default: return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <LandingPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex animate-in fade-in duration-500">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        role={role} 
        setRole={(newRole) => {
          setRole(newRole);
          setActiveView(newRole === 'CLIENT' ? 'client-portal' : 'dashboard');
        }} 
      />
      
      <main className="flex-1 ml-64 p-8 relative min-h-screen">
        <header className="flex items-center justify-between mb-8 sticky top-0 z-30 bg-slate-50/80 backdrop-blur-md py-4 border-b border-slate-200/50">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="font-medium">{role === 'CLIENT' ? `Portal: ${currentClient.name}` : 'Grupo Empresarial (Administración)'}</span>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-bold uppercase tracking-widest text-[10px] bg-slate-200 px-2 py-0.5 rounded">{activeView}</span>
          </div>
          
          <div className="flex items-center gap-4">
            {role !== 'CLIENT' && (
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar RUT o transacción..." 
                  className="bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64 shadow-sm"
                />
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              </div>
            )}
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors shadow-sm relative">
              <Bell size={20} /><span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors border border-red-100"
              title="Cerrar Sesión"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>

        {/* Floating AI Assistant */}
        <button 
          onClick={() => setShowChatAssistant(!showChatAssistant)}
          className={`fixed bottom-8 right-8 w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 z-50 hover:scale-110 ${showChatAssistant ? 'bg-slate-900 text-white' : 'bg-blue-600 text-white'}`}
        >
          {showChatAssistant ? <ChevronRight size={28} /> : <MessageSquare size={28} />}
        </button>

        {showChatAssistant && (
          <div className="fixed bottom-28 right-8 w-[400px] bg-white rounded-3xl shadow-2xl border border-slate-200 z-50 overflow-hidden flex flex-col h-[550px] animate-in slide-in-from-bottom-10 fade-in duration-300">
            <div className="p-5 bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex items-center gap-4">
              <div className="p-2 bg-white/20 rounded-xl">
                <MessageSquare size={20} />
              </div>
              <div>
                <p className="font-bold text-sm">Consultor AI - Grupo Empresarial</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] opacity-80 uppercase font-black tracking-widest">En línea</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-5 overflow-y-auto bg-slate-50 space-y-4 custom-scrollbar">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-lg' 
                      : 'bg-white border border-slate-200 text-slate-700 shadow-sm rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-blue-600" />
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Analizando RUT...</span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
              <div className="relative">
                <input 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  type="text" 
                  placeholder="Escribe tu consulta tributaria..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-5 pr-12 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-inner"
                />
                <button type="submit" className="absolute right-3 top-3 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
