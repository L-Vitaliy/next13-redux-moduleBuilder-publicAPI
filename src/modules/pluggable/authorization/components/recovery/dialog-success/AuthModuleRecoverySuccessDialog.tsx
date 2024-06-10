'use client'

import { FC } from "react";


import { useModalsFactoryCtx } from "factories/modals/ModalsFactoryCtx.ctx";
import { useLocaleAuthModule } from "modules/pluggable/authorization/hooks/useLocaleAuthModule";
import { BaseModal } from 'ui/components/modal/BaseModal/BaseModal';

import s from './AuthModuleRecoverySuccessDialog.module.scss'


/**
 * Модалка успеха при отправке запроса на восстановление пароля
 */
export const AuthModuleRecoverySuccessDialog: FC = () => {
  const { onClose } = useModalsFactoryCtx()

  const { LOCALE_AUTH_MODULE_RECOVERY_MODAL_SUCCESS_TITLE } = useLocaleAuthModule()

  return (
    <BaseModal
      content={
        { element: (
          <div className={s.AuthModuleRecoverySuccessDialog__message}>
            { LOCALE_AUTH_MODULE_RECOVERY_MODAL_SUCCESS_TITLE }
          </div>
        ) }
      }
      open
      setOpen={
        isOpen => {
          if (!isOpen){
            onClose?.()
          }
        }
      }
    />
  );
};
