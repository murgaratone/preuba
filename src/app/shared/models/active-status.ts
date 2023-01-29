export type Status =
  ActiveStatus
  | InactiveStatus
  | { key: number, status: string | boolean };

export class StatusGeneric { readonly key: number | undefined; readonly status: string | boolean | undefined; }
export class ActiveStatus extends StatusGeneric { override readonly key = 1; override readonly status = 'ACTIVO'; }
export class InactiveStatus extends StatusGeneric { override readonly key = 2; override readonly status = 'INACTIVO'; }