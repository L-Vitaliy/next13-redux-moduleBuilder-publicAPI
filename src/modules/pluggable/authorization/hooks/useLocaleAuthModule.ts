import {
  EAuthModuleFields,
  TAuthModuleFields,
} from 'modules/pluggable/authorization/components/login/form/AuthModuleLoginForm.types';
import {
  EAuthModulePasswordFields,
  TAuthModulePasswordFields,
} from "modules/pluggable/authorization/components/password-new/form/AuthModulePasswordForm.types";
import {
  EAuthModuleRecoveryPasswordFields,
  TAuthModuleRecoveryPasswordFields,
} from "modules/pluggable/authorization/components/recovery/password-form/AuthModuleRecoveryPasswordForm.types";


const LOCALE_AUTH_MODULE_RECOVERY_FORM_LABELS: Partial<TAuthModuleFields> = { [EAuthModuleFields.EMAIL]: 'E-mail' }
const LOCALE_AUTH_MODULE_RECOVERY_FORM_PLACEHOLDERS: Partial<TAuthModuleFields> = { [EAuthModuleFields.EMAIL]: 'example@domain.com' }
const LOCALE_AUTH_MODULE_RECOVERY_FORM_SUBMIT_BTN = 'Подтвердить'
const LOCALE_AUTH_MODULE_RECOVERY_FORM_ERROR_TITLE = 'Ошибка восстановления пароля'
const LOCALE_AUTH_MODULE_RECOVERY_MODAL_TITLE = 'Подтвердите почту для сброса пароля'
const LOCALE_AUTH_MODULE_RECOVERY_MODAL_SUCCESS_TITLE = 'На указанную электронную почту было отправлено письмо с ссылкой для восстановления пароля'
const LOCALE_AUTH_NODULE_RECOVERY_NEW_PASSWORD_PAGE_BREADCRUMB = 'Восстановление пароля'
const LOCALE_AUTH_NODULE_RECOVERY_NEW_PASSWORD_PAGE_TITLE = 'Создание нового пароля'
const LOCALE_AUTH_MODULE_RECOVERY_NEW_PASSWORD_FORM_LABELS: TAuthModuleRecoveryPasswordFields = {
  [EAuthModuleRecoveryPasswordFields.NEW_PASSWORD]: 'Новый пароль',
  [EAuthModuleRecoveryPasswordFields.NEW_PASSWORD_CONFIRM]: 'Подтверждение пароля',
}

const LOCALE_AUTH_MODULE_LOGIN_DIALOG_EXTRA_BTN = 'Зарегистрироваться'
const LOCALE_AUTH_MODULE_LOGIN_DIALOG_EXTRA_TITLE = 'Не зарегистрированы?'
const LOCALE_AUTH_MODULE_LOGIN_DIALOG_TITLE = 'Вход'
const LOCALE_AUTH_MODULE_LOGIN_FORM_TEXT_FORGOT = 'Не помню пароль'
const LOCALE_AUTH_MODULE_LOGIN_FORM_TEXT_SUBMIT_BTN = 'Войти'
const LOCALE_AUTH_MODULE_LOGIN_FORM_ERROR_TITLE = 'Ошибка входа'
const LOCALE_AUTH_MODULE_LOGIN_FORM_LABELS: TAuthModuleFields = {
  [EAuthModuleFields.EMAIL]: 'E-mail',
  [EAuthModuleFields.PASSWORD]: 'Пароль',
}

const LOCALE_AUTH_MODULE_PASSWORD_RECOVERY_DIALOG_PASSWORD_CHANGE_TITLE = 'Изменение пароля'
const LOCALE_AUTH_MODULE_PASSWORD_SUCCESS_DIALOG_SUCCESS_TITLE = 'Пароль успешно изменен'
const LOCALE_AUTH_MODULE_PASSWORD_SUCCESS_DIALOG_ERROR_TITLE = 'Ошибка изменения пароля'
const LOCALE_AUTH_MODULE_PASSWORD_FORM_SUBMIT_BTN = 'Сохранить'
const LOCALE_AUTH_MODULE_PASSWORD_FORM_LABELS: TAuthModulePasswordFields = {
  [EAuthModulePasswordFields.NEW_PASSWORD]: 'Новый пароль',
  [EAuthModulePasswordFields.NEW_PASSWORD_CONFIRM]: 'Подтверждение пароля',
  [EAuthModulePasswordFields.OLD_PASSWORD]: 'Старый пароль',
}


/**
 * Локализация
 */
export const useLocaleAuthModule = () => ({
  LOCALE_AUTH_MODULE_LOGIN_DIALOG_EXTRA_BTN,
  LOCALE_AUTH_MODULE_LOGIN_DIALOG_EXTRA_TITLE,
  LOCALE_AUTH_MODULE_LOGIN_DIALOG_TITLE,
  LOCALE_AUTH_MODULE_LOGIN_FORM_ERROR_TITLE,
  LOCALE_AUTH_MODULE_LOGIN_FORM_LABELS,
  LOCALE_AUTH_MODULE_LOGIN_FORM_TEXT_FORGOT,
  LOCALE_AUTH_MODULE_LOGIN_FORM_TEXT_SUBMIT_BTN,
  LOCALE_AUTH_MODULE_PASSWORD_FORM_LABELS,
  LOCALE_AUTH_MODULE_PASSWORD_FORM_SUBMIT_BTN,
  LOCALE_AUTH_MODULE_PASSWORD_RECOVERY_DIALOG_PASSWORD_CHANGE_TITLE,
  LOCALE_AUTH_MODULE_PASSWORD_SUCCESS_DIALOG_ERROR_TITLE,
  LOCALE_AUTH_MODULE_PASSWORD_SUCCESS_DIALOG_SUCCESS_TITLE,
  LOCALE_AUTH_MODULE_RECOVERY_FORM_ERROR_TITLE,
  LOCALE_AUTH_MODULE_RECOVERY_FORM_LABELS,
  LOCALE_AUTH_MODULE_RECOVERY_FORM_PLACEHOLDERS,
  LOCALE_AUTH_MODULE_RECOVERY_FORM_SUBMIT_BTN,
  LOCALE_AUTH_MODULE_RECOVERY_MODAL_SUCCESS_TITLE,
  LOCALE_AUTH_MODULE_RECOVERY_MODAL_TITLE,
  LOCALE_AUTH_MODULE_RECOVERY_NEW_PASSWORD_FORM_LABELS,
  LOCALE_AUTH_NODULE_RECOVERY_NEW_PASSWORD_PAGE_BREADCRUMB,
  LOCALE_AUTH_NODULE_RECOVERY_NEW_PASSWORD_PAGE_TITLE,
})
