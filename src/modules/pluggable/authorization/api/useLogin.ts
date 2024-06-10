import { useCallback } from "react";

import {
  AxiosError,
  AxiosResponse,
} from "axios";


import {
  TAuthLoginApiInput,
  TAuthTokenInfoApiResponse,
} from "api/types/api.authorization.types";
import { API_ROUTE_NEXT_SERVER_SIDE_AUTH_LOGIN } from "api/vars/routes";
import { useFetch } from "hooks/useFetch/useFetch";
import {
  EAuthModuleFields,
  TAuthModuleFields,
} from 'modules/pluggable/authorization/components/login/form/AuthModuleLoginForm.types';
import { useLocaleAuthModule } from "modules/pluggable/authorization/hooks/useLocaleAuthModule";


type TUseLogin = {
  onError?: (err: AxiosError) => void;
  onSuccess?: (data: AxiosResponse) => void;
}

/**
 * Хук для отправки запроса авторизации пользователя, содержит обработку ответа и ошибок
 */
export const useLogin = (props?: TUseLogin) => {

  const {
    onError,
    onSuccess,
  } = props || {}

  const { LOCALE_AUTH_MODULE_LOGIN_FORM_ERROR_TITLE } = useLocaleAuthModule()

  const {
    request,
    ...rest
  } = useFetch<TAuthTokenInfoApiResponse>({
    ignoreAccessToken: true,
    onError,
    onErrorDefaults: {
      name: 'useLogin',
      title: LOCALE_AUTH_MODULE_LOGIN_FORM_ERROR_TITLE,
      withNotification: false,
    },
    onSuccess: async response => {
      onSuccess?.(response)
    },
  })

  const fetchSendLogin = useCallback((fields: TAuthModuleFields) => {
    const  {
      [EAuthModuleFields.EMAIL]: email = '',
      [EAuthModuleFields.PASSWORD]: password = '',
    } = fields


    const data: TAuthLoginApiInput = {
      email,
      password,
    }

    return request({ config: {
      baseURL: '/',
      data,
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      url: API_ROUTE_NEXT_SERVER_SIDE_AUTH_LOGIN,
    } })

  }, [ request ])

  return {
    fetchSendLogin,
    ...rest,
  };
};
