
import { Client, TaxTask, TaskStatus, TaxForm, HistoryEntry } from './types';

export const MOCK_CLIENTS: Client[] = [
  { id: '1', name: 'Inversiones Andes SpA', rut: '76.123.456-K', regimen: 'Propyme General', contactEmail: 'contabilidad@andes.cl', status: 'active', assignedAccountantId: 'u1', createdAt: '2024-01-10' },
  { id: '2', name: 'Tecnología Pacífico Ltda', rut: '77.987.654-2', regimen: 'Propyme Transparente', contactEmail: 'admin@pacifico.tech', status: 'active', assignedAccountantId: 'u2', createdAt: '2024-02-15' },
  { id: '3', name: 'Constructora El Roble', rut: '76.456.789-5', regimen: 'General (14A)', contactEmail: 'pagos@elroble.cl', status: 'active', assignedAccountantId: 'u1', createdAt: '2023-11-20' },
  { id: '4', name: 'Restaurante Sabor Chileno', rut: '76.111.222-3', regimen: 'Propyme General', contactEmail: 'chef@sabor.cl', status: 'active', assignedAccountantId: 'u2', createdAt: '2024-03-01' },
];

export const MOCK_HISTORY: HistoryEntry[] = [
  { id: 'h1', timestamp: '2025-05-08 10:30', userId: 'u1', userName: 'Juan Pérez', clientId: '1', clientName: 'Inversiones Andes SpA', action: 'Subida de Documentos', details: 'Se cargaron 3 facturas de exportación para F29.', category: 'DOC' },
  { id: 'h2', timestamp: '2025-05-08 09:15', userId: 'u2', userName: 'Maria Soto', clientId: '2', clientName: 'Tecnología Pacífico Ltda', action: 'Notificación Enviada', details: 'Recordatorio automático de DJ 1879 enviado por correo.', category: 'SYSTEM' },
  { id: 'h3', timestamp: '2025-05-07 16:45', userId: 'admin', userName: 'Clemente T.', clientId: '4', clientName: 'Restaurante Sabor Chileno', action: 'Cambio de Estado', details: 'Trámite F29 movido de PENDIENTE a EN PROCESO.', category: 'TAX' },
  { id: 'h4', timestamp: '2025-05-07 11:20', userId: 'admin', userName: 'Clemente T.', action: 'Nuevo Cliente', details: 'Se integró a Constructora El Roble a la cartera.', category: 'TEAM' },
];

export const MOCK_TASKS: TaxTask[] = [
  { id: 't1', clientId: '1', formType: TaxForm.F29, deadline: '2025-05-20', status: TaskStatus.IN_PROGRESS, assignedTo: 'Juan Pérez', completionPercentage: 65, missingDocuments: ['Cartolas Banco Abril', 'Facturas Compra Extranjero'] },
  { id: 't2', clientId: '2', formType: TaxForm.F29, deadline: '2025-05-20', status: TaskStatus.WAITING_CLIENT, assignedTo: 'Maria Soto', completionPercentage: 30, missingDocuments: ['Resumen de Boletas de Honorarios'] },
  { id: 't3', clientId: '3', formType: TaxForm.F22, deadline: '2025-04-30', status: TaskStatus.COMPLETED, assignedTo: 'Juan Pérez', completionPercentage: 100, missingDocuments: [] },
  { id: 't4', clientId: '4', formType: TaxForm.F1887, deadline: '2025-03-28', status: TaskStatus.OVERDUE, assignedTo: 'Maria Soto', completionPercentage: 80, missingDocuments: ['Libro de Remuneraciones'] }
];

export const APP_THEME = {
  primary: '#0f172a',
  secondary: '#3b82f6',
  accent: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  background: '#f8fafc'
};
