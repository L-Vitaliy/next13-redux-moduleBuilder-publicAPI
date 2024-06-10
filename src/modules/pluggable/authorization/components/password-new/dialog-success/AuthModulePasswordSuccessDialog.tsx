'use client'

import { FC } from "react";

import { useModalsFactoryCtx } from "factories/modals/ModalsFactoryCtx.ctx";
import s from "modules/pluggable/authorization/components/password-new/dialog-success/AuthModulePasswordSuccessDialog.module.scss";
import { useLocaleAuthModule } from "modules/pluggable/authorization/hooks/useLocaleAuthModule";
import { BaseModal } from 'ui/components/modal/BaseModal/BaseModal';


/**
 * Модалка для восстановления пароля (создания нового) или смены старого
 */
// ts-prune-ignore-next -- Используется по пути файла в загрузчике модулей, ts-prune такое не определяет
export const AuthModulePasswordSuccessDialog: FC = () => {
  const { onClose } = useModalsFactoryCtx()

  const {
    LOCALE_AUTH_MODULE_PASSWORD_RECOVERY_DIALOG_PASSWORD_CHANGE_TITLE,
    LOCALE_AUTH_MODULE_PASSWORD_SUCCESS_DIALOG_SUCCESS_TITLE,
  } = useLocaleAuthModule()

  const messageText = LOCALE_AUTH_MODULE_PASSWORD_RECOVERY_DIALOG_PASSWORD_CHANGE_TITLE
  const isMessage = typeof messageText === "string" && messageText.length

  return (
    <BaseModal
      content={
        { element: isMessage ? (
          <div className={s.AuthModulePasswordSuccessDialog__message}>
            {LOCALE_AUTH_MODULE_PASSWORD_RECOVERY_DIALOG_PASSWORD_CHANGE_TITLE}
          </div>
        ) : null }
      }
      open
      setOpen={
        isOpen => {
          if (!isOpen){
            onClose?.()
          }
        }
      }
      title={LOCALE_AUTH_MODULE_PASSWORD_SUCCESS_DIALOG_SUCCESS_TITLE}
    />
  );
};
