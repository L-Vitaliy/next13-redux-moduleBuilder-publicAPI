import { useCallback } from "react";

import {
  AxiosError,
  AxiosResponse,
} from "axios";


import {
  TAuthRecoverCreatePasswordApiInput,
  TAuthTokenInfoApiResponse,
} from "api/types/api.authorization.types";
import { API_ROUTE_NEXT_SERVER_SIDE_AUTH_RESET_PASSWORD_VERIFY } from "api/vars/routes";
import { useFetch } from "hooks/useFetch/useFetch";
import {
  EAuthModuleRecoveryPasswordFields,
  TAuthModuleRecoveryPasswordFields,
} from "modules/pluggable/authorization/components/recovery/password-form/AuthModuleRecoveryPasswordForm.types";


type TUseChangePassword = {
    onError?: (err: AxiosError) => void;
    onSuccess?: (data: AxiosResponse) => void;
}

type TFetchSendRecoverPassword = Omit<TAuthModuleRecoveryPasswordFields, EAuthModuleRecoveryPasswordFields.NEW_PASSWORD_CONFIRM> & {
    code: string;
}

/**
 * Хук для отправки запроса смены пароля в лк, содержит обработку ответа и ошибок
 */
export const useRecoveryPassword = (props?: TUseChangePassword) => {

  const {
    onError,
    onSuccess,
  } = props || {}


  const {
    request,
    ...rest
  } = useFetch<TAuthTokenInfoApiResponse>({
    ignoreAccessToken: true,
    onError,
    onErrorDefaults: {
      name: 'useRecoveryPassword',
      withNotification: false,
    },
    onSuccess,
  })

  const fetchSendRecoverPassword = useCallback((fields: TFetchSendRecoverPassword) => {
    const  {
      code,
      [EAuthModuleRecoveryPasswordFields.NEW_PASSWORD]: newPassword,
    } = fields

    const data: TAuthRecoverCreatePasswordApiInput = {
      password: newPassword,
      token: code,
    }

    return request({ config: {
      baseURL: '/',
      data,
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      url: API_ROUTE_NEXT_SERVER_SIDE_AUTH_RESET_PASSWORD_VERIFY,
    } })

  }, [ request ])

  return {
    fetchSendRecoverPassword,
    ...rest,
  };
};
