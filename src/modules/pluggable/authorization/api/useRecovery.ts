import { useCallback } from "react";

import {
  AxiosError,
  AxiosResponse,
} from "axios";


import { TAuthRecoverPasswordApiInput } from "api/types/api.authorization.types";
import { API_URL_RESET_PASSWORD } from "api/vars/endpoints";
import { useFetch } from "hooks/useFetch/useFetch";
import {
  TAuthModuleRecoveryFields,
  EAuthModuleRecoveryFields,
} from 'modules/pluggable/authorization/components/recovery/form/AuthModuleRecoveryForm.types';


type TUseRecovery = {
  onError?: (err: AxiosError) => void;
  onSuccess?: (data: AxiosResponse) => void;
}

/**
 * Хук для отправки запроса восстановления пароля, содержит обработку ответа и ошибок
 */
export const useRecovery = (props?: TUseRecovery) => {

  const {
    onError,
    onSuccess,
  } = props || {}


  const {
    request,
    ...rest
  } = useFetch({
    onError,
    onErrorDefaults: {
      name: 'useRecovery',
      withNotification: false,
    },
    onSuccess,
  })

  const fetchSendRecover = useCallback((fields: TAuthModuleRecoveryFields) => {
    const  { [EAuthModuleRecoveryFields.EMAIL]: email = '' } = fields

    const data: TAuthRecoverPasswordApiInput = { email }

    return request({ config: {
      data,
      method: 'POST',
      url: API_URL_RESET_PASSWORD,
    } })

  }, [ request ])

  return {
    fetchSendRecover,
    ...rest,
  };
};
