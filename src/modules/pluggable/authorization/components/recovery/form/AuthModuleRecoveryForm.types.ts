export enum EAuthModuleRecoveryFields {
  EMAIL = 'EMAIL',
}

export type TAuthModuleRecoveryFields = {
  [key in EAuthModuleRecoveryFields]: string;
}
