'use client'

import { useSettingsApp } from 'hooks/useSettingsApp';
import {
  EAuthModuleFields,
  TAuthModuleFields,
} from 'modules/pluggable/authorization/components/login/form/AuthModuleLoginForm.types';
import {
  EAuthModulePasswordFields,
  TAuthModulePasswordFields,
} from 'modules/pluggable/authorization/components/password-new/form/AuthModulePasswordForm.types';


type TAuthModuleSettingsPlaceholders = TAuthModuleFields & TAuthModulePasswordFields

/**
 * Настройки модуля
 */
export const useSettingsModuleAuth = () => {
  const { SETTINGS_APP_PLACEHOLDERS } = useSettingsApp()

  const SETTINGS_MODULE_AUTH_PLACEHOLDERS: TAuthModuleSettingsPlaceholders = {
    [EAuthModuleFields.EMAIL]: SETTINGS_APP_PLACEHOLDERS.EMAIL_DEFAULT,
    [EAuthModuleFields.PASSWORD]: SETTINGS_APP_PLACEHOLDERS.PASSWORD_DEFAULT,
    [EAuthModulePasswordFields.NEW_PASSWORD]: SETTINGS_APP_PLACEHOLDERS.PASSWORD_DEFAULT,
    [EAuthModulePasswordFields.NEW_PASSWORD_CONFIRM]: SETTINGS_APP_PLACEHOLDERS.PASSWORD_DEFAULT,
    [EAuthModulePasswordFields.OLD_PASSWORD]: SETTINGS_APP_PLACEHOLDERS.PASSWORD_DEFAULT,
  }

  return { SETTINGS_MODULE_AUTH_PLACEHOLDERS }
}
