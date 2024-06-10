export enum EAuthModuleFields {
  EMAIL = 'EMAIL',
  PASSWORD = 'PASSWORD',
}

export type TAuthModuleFields = {
  [key in EAuthModuleFields]: string;
}
