export type Role =
  RolAdmin
  | RolManager
  | RolPartner
  | RolCleaner
  | { key: number, role: string };

export class RoleGeneric { readonly key: number | undefined; readonly role: string | undefined; }
export class RolAdmin extends RoleGeneric { override readonly key = 1; override readonly role= 'Administrador'; }
export class RolManager extends RoleGeneric { override readonly key = 2; override readonly role= 'Gerente'; }
export class RolPartner extends RoleGeneric { override readonly key = 3; override readonly role= 'Socio'; }
export class RolCleaner extends RoleGeneric { override readonly key = 4; override readonly role= 'Cleaner'; }

