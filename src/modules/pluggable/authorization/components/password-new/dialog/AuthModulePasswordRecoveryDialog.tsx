'use client'

import {
  useMemo,
  FC,
} from 'react';


import {
  EModalsFactoryKeys,
  MODALS_FACTORY_KEYS,
  MODALS_FACTORY_QUERY_PARAM_NAME,
} from "factories/modals/ModalsFactory.types";
import { useModalsFactoryCtx } from "factories/modals/ModalsFactoryCtx.ctx";
import { useUrlHelpers } from 'hooks/useUrlHelpers';
import { AuthModulePasswordForm } from 'modules/pluggable/authorization/components/password-new/form/AuthModulePasswordForm';
import { useLocaleAuthModule } from "modules/pluggable/authorization/hooks/useLocaleAuthModule";
import { BaseModal } from 'ui/components/modal/BaseModal/BaseModal';


/**
 * Модалка для восстановления пароля (создания нового) или смены старого
 */
export const AuthModulePasswordRecoveryDialog: FC = () => {
  const { onClose } = useModalsFactoryCtx()

  const { LOCALE_AUTH_MODULE_PASSWORD_RECOVERY_DIALOG_PASSWORD_CHANGE_TITLE } = useLocaleAuthModule()

  const { search } = useUrlHelpers()

  const isModalChangePassword = useMemo(() => search[MODALS_FACTORY_QUERY_PARAM_NAME] === MODALS_FACTORY_KEYS[EModalsFactoryKeys.AUTH_CHANGE_PASSWORD], [ search ])

  return (
    <BaseModal
      content={
        { element: (
          <AuthModulePasswordForm
            hasOldPasswordCheck={isModalChangePassword}
          />
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
      title={LOCALE_AUTH_MODULE_PASSWORD_RECOVERY_DIALOG_PASSWORD_CHANGE_TITLE}
    />
  );
};
