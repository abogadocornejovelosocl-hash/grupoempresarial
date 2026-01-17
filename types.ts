
export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_CLIENT = 'WAITING_CLIENT',
  COMPLETED = 'COMPLETED',
  OVERDUE = 'OVERDUE'
}

export enum TaxForm {
  F29 = 'F29 (Mensual)',
  F22 = 'F22 (Renta Anual)',
  F1879 = 'DJ 1879 (Retenciones)',
  F1947 = 'DJ 1947 (Propyme)',
  F1887 = 'DJ 1887 (Sueldos)'
}

export type UserRole = 'ADMIN' | 'ACCOUNTANT' | 'CLIENT';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  clientId?: string;
  avatar?: string;
}

export interface Client {
  id: string;
  name: string;
  rut: string;
  regimen: string;
  contactEmail: string;
  status: 'active' | 'inactive';
  assignedAccountantId: string;
  createdAt: string;
}

export interface TaxTask {
  id: string;
  clientId: string;
  formType: TaxForm;
  deadline: string;
  status: TaskStatus;
  assignedTo: string;
  completionPercentage: number;
  missingDocuments: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: string;
  userId: string; // Quien lo hizo
  userName: string;
  clientId?: string; // Para qué cliente
  clientName?: string;
  action: string;
  details: string;
  category: 'DOC' | 'TAX' | 'TEAM' | 'SYSTEM';
}
