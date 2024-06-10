'use client'

import {
  EModalsFactoryKeys,
  MODALS_FACTORY_QUERY_PARAM_NAME,
  MODALS_FACTORY_KEYS,
} from 'factories/modals/ModalsFactory.types';
import { useUrlHelpers } from 'hooks/useUrlHelpers';
import { ReactFCC } from 'types/react';
import { Button } from 'ui/components/button/basic/Button';


// ts-prune-ignore-next -- Используется по пути файла в загрузчике модулей, ts-prune такое не определяет
export const AuthModuleDemo: ReactFCC = () => {
  const { setUrlQueryParams } = useUrlHelpers()

  const openLoginModal = () => {
    setUrlQueryParams([ [ MODALS_FACTORY_QUERY_PARAM_NAME, MODALS_FACTORY_KEYS[EModalsFactoryKeys.AUTH_LOGIN] ] ])
  }

  const openPasswordRecoveryModal = () => {
    setUrlQueryParams([ [ MODALS_FACTORY_QUERY_PARAM_NAME, MODALS_FACTORY_KEYS[EModalsFactoryKeys.AUTH_RECOVERY_PASSWORD] ] ])
  }

  return (
    <>
      <Button
        content='Войти'
        onClick={openLoginModal}
      />

      <br />

      <br />

      <Button
        content='Сменить пароль'
        onClick={openPasswordRecoveryModal}
      />
    </>
  )
}
