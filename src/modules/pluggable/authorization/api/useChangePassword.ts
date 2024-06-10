import { useCallback } from "react";

import {
  AxiosError,
  AxiosResponse,
} from "axios";


import {
  TAuthChangePasswordApiInput,
  TAuthTokenInfoApiResponse,
} from "api/types/api.authorization.types";
import { API_URL_ACCOUNT_CHANGE_PASSWORD } from "api/vars/endpoints";
import { useFetch } from "hooks/useFetch/useFetch";
import {
  EAuthModulePasswordFields,
  TAuthModulePasswordFields,
} from "modules/pluggable/authorization/components/password-new/form/AuthModulePasswordForm.types";
import { useLocaleAuthModule } from "modules/pluggable/authorization/hooks/useLocaleAuthModule";


type TUseChangePassword = {
  onError?: (err: AxiosError) => void;
  onSuccess?: (data: AxiosResponse) => void;
}

/**
 * Хук для отправки запроса смены пароля в лк, содержит обработку ответа и ошибок
 */
export const useChangePassword = (props?: TUseChangePassword) => {

  const {
    onError,
    onSuccess,
  } = props || {}

  const { LOCALE_AUTH_MODULE_PASSWORD_SUCCESS_DIALOG_ERROR_TITLE } = useLocaleAuthModule()

  const {
    request,
    ...rest
  } = useFetch<TAuthTokenInfoApiResponse>({
    onError,
    onErrorDefaults: {
      name: 'useChangePassword',
      title: LOCALE_AUTH_MODULE_PASSWORD_SUCCESS_DIALOG_ERROR_TITLE,
      withNotification: true,
    },
    onSuccess,
  })

  const fetchSendRecover = useCallback((fields: Omit<TAuthModulePasswordFields, EAuthModulePasswordFields.NEW_PASSWORD_CONFIRM>) => {
    const  {
      [EAuthModulePasswordFields.NEW_PASSWORD]: newPassword,
      [EAuthModulePasswordFields.OLD_PASSWORD]: oldPassword,
    } = fields

    const data: TAuthChangePasswordApiInput = {
      new_password: newPassword,
      old_password: oldPassword,
    }

    return request({ config: {
      data,
      method: 'POST',
      url: API_URL_ACCOUNT_CHANGE_PASSWORD,
    } })

  }, [ request ])

  return {
    fetchSendRecover,
    ...rest,
  };
};
