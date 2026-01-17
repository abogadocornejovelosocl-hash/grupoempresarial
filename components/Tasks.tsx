
import React from 'react';
import { MOCK_TASKS, MOCK_CLIENTS } from '../constants';
import { TaskStatus, UserRole } from '../types';
import { MoreHorizontal, FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface TasksProps {
  role: UserRole;
  clientId?: string;
}

const Tasks: React.FC<TasksProps> = ({ role, clientId }) => {
  // CRITICAL: Filter data if user is a client
  const filteredTasks = role === 'CLIENT' 
    ? MOCK_TASKS.filter(t => t.clientId === clientId)
    : MOCK_TASKS;

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED: return <CheckCircle2 className="text-green-500" size={18} />;
      case TaskStatus.PENDING: return <Clock className="text-slate-400" size={18} />;
      case TaskStatus.IN_PROGRESS: return <Clock className="text-blue-500" size={18} />;
      case TaskStatus.WAITING_CLIENT: return <AlertCircle className="text-amber-500" size={18} />;
      case TaskStatus.OVERDUE: return <AlertCircle className="text-red-500" size={18} />;
    }
  };

  const getStatusBadgeClass = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED: return 'bg-green-50 text-green-700 border-green-200';
      case TaskStatus.PENDING: return 'bg-slate-50 text-slate-600 border-slate-200';
      case TaskStatus.IN_PROGRESS: return 'bg-blue-50 text-blue-700 border-blue-200';
      case TaskStatus.WAITING_CLIENT: return 'bg-amber-50 text-amber-700 border-amber-200';
      case TaskStatus.OVERDUE: return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">
          {role === 'CLIENT' ? 'Mis Trámites y Obligaciones' : 'Gestión de Trámites (Tickets)'}
        </h1>
        <div className="flex gap-2">
          {role !== 'CLIENT' && <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50">Filtrar</button>}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-md">Exportar Excel</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <tr>
              {role !== 'CLIENT' && <th className="px-6 py-4">Cliente / RUT</th>}
              <th className="px-6 py-4">Trámite / Formulario</th>
              {role !== 'CLIENT' && <th className="px-6 py-4">Responsable</th>}
              <th className="px-6 py-4">Progreso</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4 text-center">Plazo</th>
              {role !== 'CLIENT' && <th className="px-6 py-4 text-center">Acciones</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTasks.map((task) => {
              const client = MOCK_CLIENTS.find(c => c.id === task.clientId);
              return (
                <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
                  {role !== 'CLIENT' && (
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{client?.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{client?.rut}</p>
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-slate-100 rounded-lg">
                        <FileText size={14} className="text-slate-600" />
                      </div>
                      <span className="text-sm font-bold text-slate-800">{task.formType}</span>
                    </div>
                  </td>
                  {role !== 'CLIENT' && (
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-black border border-blue-200">
                          {task.assignedTo.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-xs font-semibold text-slate-700">{task.assignedTo}</span>
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4">
                    <div className="w-32 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${task.completionPercentage === 100 ? 'bg-green-500' : 'bg-blue-500'}`} 
                        style={{ width: `${task.completionPercentage}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] font-black text-slate-500 mt-1 block uppercase tracking-tighter">{task.completionPercentage}% COMPLETADO</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-tight ${getStatusBadgeClass(task.status)}`}>
                      {getStatusIcon(task.status)}
                      {task.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-xs font-black ${task.status === TaskStatus.OVERDUE ? 'text-red-600' : 'text-slate-900'}`}>
                      {task.deadline}
                    </span>
                  </td>
                  {role !== 'CLIENT' && (
                    <td className="px-6 py-4 text-center">
                      <button className="text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreHorizontal size={20} />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredTasks.length === 0 && (
          <div className="p-12 text-center text-slate-400 font-medium">
            No hay trámites registrados para este RUT en el periodo actual.
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 mb-4 uppercase text-sm tracking-tight">Documentación Faltante</h3>
          <div className="space-y-3">
            {filteredTasks.filter(t => t.missingDocuments.length > 0).map(task => (
              <div key={task.id} className="p-4 bg-amber-50 border border-amber-100 rounded-xl relative overflow-hidden">
                <div className="flex justify-between items-start mb-2 relative z-10">
                  <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">
                    {task.formType}
                  </span>
                  {role !== 'CLIENT' && (
                    <button className="text-[10px] bg-amber-200 px-2 py-1 rounded-lg text-amber-800 font-black hover:bg-amber-300 transition-all">
                      NOTIFICAR CLIENTE
                    </button>
                  )}
                </div>
                <ul className="text-xs text-amber-800 space-y-1 relative z-10 font-medium">
                  {task.missingDocuments.map((doc, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <AlertCircle size={10} className="shrink-0" />
                      {doc}
                    </li>
                  ))}
                </ul>
                <div className="absolute top-0 right-0 p-2 opacity-5">
                   <AlertCircle size={48} className="text-amber-900" />
                </div>
              </div>
            ))}
            {filteredTasks.filter(t => t.missingDocuments.length > 0).length === 0 && (
              <div className="flex flex-col items-center justify-center py-6 text-slate-400">
                <CheckCircle2 size={32} className="text-emerald-500 mb-2" />
                <p className="text-xs font-bold uppercase">Toda la documentación está al día</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
          <div className="w-16 h-16 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center mb-4 border border-blue-500/20">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="font-black text-lg uppercase tracking-tighter">Cumplimiento Global {role === 'CLIENT' ? 'RUT' : 'Cartera'}</h3>
          <p className="text-xs text-slate-400 mb-6">Estado de sincronización con el SII</p>
          <div className="w-full max-w-xs bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
            <div className="bg-blue-600 h-full w-[85%]"></div>
          </div>
          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">85% Completado satisfactoriamente</p>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
