export enum EAuthModulePasswordFields {
  NEW_PASSWORD = 'NEW_PASSWORD',
  NEW_PASSWORD_CONFIRM = 'NEW_PASSWORD_CONFIRM',
  OLD_PASSWORD = 'OLD_PASSWORD'
}

export type TAuthModulePasswordFields = {
  [key in EAuthModulePasswordFields]: string;
}
