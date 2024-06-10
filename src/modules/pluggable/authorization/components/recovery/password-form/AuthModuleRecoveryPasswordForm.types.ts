export enum EAuthModuleRecoveryPasswordFields {
    NEW_PASSWORD = 'NEW_PASSWORD',
    NEW_PASSWORD_CONFIRM = 'NEW_PASSWORD_CONFIRM',
}

export type TAuthModuleRecoveryPasswordFields = {
    [key in EAuthModuleRecoveryPasswordFields]: string;
}
