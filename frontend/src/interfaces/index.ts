export interface Transaction {
  is_delete: boolean;
  _id: string;
  rfc: string;
  folio: string;
  retirement_date: Date;
  status: Status;
  amount: number;
  comision: number;
  __v: number;
}

export interface User {
  _id: string;
  rfc: string;
  name: string;
  last_name: string;
  status: string;
}

export enum Status {
  Completed = "COMPLETED",
  Failed = "FAILED",
  Pending = "PENDING",
}

export enum StatusLabel {
  COMPLETED = "Completada",
  FAILED = "Fallida",
  PENDING = "Pendiente",
}
