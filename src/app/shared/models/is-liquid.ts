export type IsLiquid =
  LiquidY
  | LiquidN
  | { key: number, liquid: string | boolean };

export class LiquidGeneric { readonly key: number | undefined; readonly liquid: string | boolean | undefined; }
export class LiquidY extends LiquidGeneric { override readonly key = 1; override readonly liquid = 'SI'; }
export class LiquidN extends LiquidGeneric { override readonly key = 2; override readonly liquid = 'NO'; }