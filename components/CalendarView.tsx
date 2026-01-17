
import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info } from 'lucide-react';
import { MOCK_TASKS, MOCK_CLIENTS } from '../constants';

const CalendarView: React.FC = () => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const monthName = "Mayo 2025";

  const getDeadlinesForDay = (day: number) => {
    const dateStr = `2025-05-${day.toString().padStart(2, '0')}`;
    return MOCK_TASKS.filter(t => t.deadline === dateStr);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Calendario Tributario SII</h1>
        <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          <button className="p-1 hover:bg-slate-100 rounded-lg"><ChevronLeft size={20} /></button>
          <span className="font-bold text-slate-700 min-w-32 text-center">{monthName}</span>
          <button className="p-1 hover:bg-slate-100 rounded-lg"><ChevronRight size={20} /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(d => (
          <div key={d} className="bg-slate-50 p-4 text-center text-xs font-bold text-slate-500 uppercase">{d}</div>
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={`empty-${i}`} className="bg-white p-4 h-32 opacity-25"></div>
        ))}
        {days.map(day => {
          const tasks = getDeadlinesForDay(day);
          const isToday = day === 8; // Simulating today is May 8th
          return (
            <div key={day} className={`bg-white p-3 h-32 border-t border-slate-100 transition-colors hover:bg-slate-50 relative ${isToday ? 'ring-2 ring-blue-500 ring-inset' : ''}`}>
              <span className={`text-sm font-bold ${isToday ? 'text-blue-600' : 'text-slate-400'}`}>{day}</span>
              <div className="mt-2 space-y-1 overflow-y-auto max-h-20 custom-scrollbar">
                {tasks.map(t => {
                  const client = MOCK_CLIENTS.find(c => c.id === t.clientId);
                  return (
                    <div key={t.id} className="text-[10px] p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 flex flex-col">
                      <span className="font-bold truncate">{client?.name}</span>
                      <span className="opacity-75">{t.formType}</span>
                    </div>
                  );
                })}
                {day === 20 && (
                  <div className="text-[10px] p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-100 flex flex-col font-bold">
                    Vencimiento F29 (Pago)
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-xl flex items-start gap-4">
        <div className="p-3 bg-blue-500/20 rounded-xl">
          <Info className="text-blue-300" />
        </div>
        <div>
          <h3 className="font-bold text-lg">Recordatorio SII</h3>
          <p className="text-blue-100 text-sm mt-1">
            Recuerda que este mes el plazo para facturas exentas vence el día 10. 
            El sistema ya envió notificaciones automáticas a 15 clientes que aún no cargan sus folios.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
