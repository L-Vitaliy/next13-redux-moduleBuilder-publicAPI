'use client'

import { FC } from "react";


import {
  EModalsFactoryKeys,
  MODALS_FACTORY_KEYS,
  MODALS_FACTORY_QUERY_PARAM_NAME,
} from 'factories/modals/ModalsFactory.types';
import { useModalsFactoryCtx } from "factories/modals/ModalsFactoryCtx.ctx";
import { useUrlHelpers } from 'hooks/useUrlHelpers';
import { AuthModuleLoginForm } from 'modules/pluggable/authorization/components/login/form/AuthModuleLoginForm';
import { useLocaleAuthModule } from "modules/pluggable/authorization/hooks/useLocaleAuthModule";
import { Button } from 'ui/components/button/basic/Button';
import { EButtonVariant } from "ui/components/button/basic/Button.types";
import { BaseModal } from 'ui/components/modal/BaseModal/BaseModal';


/**
 * Модалка логина
 */
export const AuthModuleLoginDialog: FC = () => {
  const { onClose } = useModalsFactoryCtx()

  const { setUrlQueryParams } = useUrlHelpers()

  const {
    LOCALE_AUTH_MODULE_LOGIN_DIALOG_EXTRA_BTN,
    LOCALE_AUTH_MODULE_LOGIN_DIALOG_EXTRA_TITLE,
    LOCALE_AUTH_MODULE_LOGIN_DIALOG_TITLE,
  } = useLocaleAuthModule()

  const openRegModal = () => {
    setUrlQueryParams([ [ MODALS_FACTORY_QUERY_PARAM_NAME, MODALS_FACTORY_KEYS[EModalsFactoryKeys.REGISTRATION] ] ])
  }

  const openRecoveryModal = () => {
    setUrlQueryParams([ [ MODALS_FACTORY_QUERY_PARAM_NAME, MODALS_FACTORY_KEYS[EModalsFactoryKeys.AUTH_FORGOT_PASSWORD] ] ])
  }

  return (
    <BaseModal
      content={
        { element: (<AuthModuleLoginForm
          onClose={onClose}
          onRecovery={openRecoveryModal}
        />) }
      }
      extra={
        {
          element: (
            <Button
              content={LOCALE_AUTH_MODULE_LOGIN_DIALOG_EXTRA_BTN}
              onClick={openRegModal}
              variant={EButtonVariant.QUATERNARY}
            />
          ),
          title: LOCALE_AUTH_MODULE_LOGIN_DIALOG_EXTRA_TITLE,
        }
      }
      open
      setOpen={
        isOpen => {
          if (!isOpen){
            onClose?.()
          }
        }
      }
      title={LOCALE_AUTH_MODULE_LOGIN_DIALOG_TITLE}
    />
  );
};
