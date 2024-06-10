'use client'

import { FC } from "react";

import { useModalsFactoryCtx } from "factories/modals/ModalsFactoryCtx.ctx";
import { AuthModuleRecoveryForm } from 'modules/pluggable/authorization/components/recovery/form/AuthModuleRecoveryForm';
import { useLocaleAuthModule } from "modules/pluggable/authorization/hooks/useLocaleAuthModule";
import { BaseModal } from 'ui/components/modal/BaseModal/BaseModal';


/**
 * Модалка на отправку запроса на восстановление пароля
 */
export const AuthModuleRecoveryDialog: FC = () => {
  const { onClose } = useModalsFactoryCtx()

  const { LOCALE_AUTH_MODULE_RECOVERY_MODAL_TITLE } = useLocaleAuthModule()

  return (
    <BaseModal
      content={{ element: (<AuthModuleRecoveryForm />) }}
      open
      setOpen={
        isOpen => {
          if (!isOpen){
            onClose?.()
          }
        }
      }
      title={LOCALE_AUTH_MODULE_RECOVERY_MODAL_TITLE}
    />
  );
};
