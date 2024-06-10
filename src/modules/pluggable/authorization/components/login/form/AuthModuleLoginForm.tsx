'use client'

import {
  useCallback,
  useMemo,
  useState,
} from 'react';

import { AxiosError } from "axios";
import {
  Formik,
  Form,
  Field,
} from 'formik';
import * as yup from 'yup';

import { usePathname } from "next/navigation";

import { TResponseApi } from "api/types/api.types";
import { MODALS_FACTORY_QUERY_PARAM_NAME } from "factories/modals/ModalsFactory.types";
import { useFormValidation } from "hooks/useFormValidation";
import { useNavigate } from "hooks/useNavigate";
import { useUrlHelpers } from "hooks/useUrlHelpers";
import { useInitAccountAfterLogin } from "modules/pluggable/account-profile/hooks/useInitAccountAfterLogin";
import { useLogin } from 'modules/pluggable/authorization/api/useLogin';
import s from 'modules/pluggable/authorization/components/login/form/AuthModuleLoginForm.module.scss';
import {
  EAuthModuleFields,
  TAuthModuleFields,
} from 'modules/pluggable/authorization/components/login/form/AuthModuleLoginForm.types';
import { useLocaleAuthModule } from "modules/pluggable/authorization/hooks/useLocaleAuthModule";
import { useSettingsModuleAuth } from 'modules/pluggable/authorization/hooks/useSettingsModuleAuth';
import {
  PAGE_ACCOUNT_PROFILE_ROUTE,
  PAGE_CART_ROUTE,
} from "routes/paths";
import { ReactFCC } from 'types/react';
import { Button } from 'ui/components/button/basic/Button';
import { Input } from 'ui/components/input/Input/Input';
import { InputPassword } from 'ui/components/input/InputPassword/InputPassword';


type TAuthModuleLoginForm = {
  onClose?: () => void;
  onRecovery?: () => void;
}

const initialValues: TAuthModuleFields = {
  [EAuthModuleFields.EMAIL]: '',
  [EAuthModuleFields.PASSWORD]: '',
}

/**
 * Форма логина
 */
export const AuthModuleLoginForm: ReactFCC<TAuthModuleLoginForm> = props => {
  const {
    onClose,
    onRecovery,
  } = props

  const [ error, setError ] = useState<string>('');

  const pathname = usePathname()
  const navigate = useNavigate()
  const { deleteUrlQueryParams } = useUrlHelpers()

  const { initAccountAfterLogin } = useInitAccountAfterLogin({ onSuccess: () => {
    const ignoredPathsForRedirect = [ PAGE_CART_ROUTE ]

    if (!ignoredPathsForRedirect.includes(pathname)) {
      navigate(PAGE_ACCOUNT_PROFILE_ROUTE)
    } else {
      deleteUrlQueryParams([ MODALS_FACTORY_QUERY_PARAM_NAME ])
      onClose?.()
    }
  } })

  const { SETTINGS_MODULE_AUTH_PLACEHOLDERS } = useSettingsModuleAuth()

  const {
    LOCALE_AUTH_MODULE_LOGIN_FORM_LABELS,
    LOCALE_AUTH_MODULE_LOGIN_FORM_TEXT_FORGOT,
    LOCALE_AUTH_MODULE_LOGIN_FORM_TEXT_SUBMIT_BTN,
  } = useLocaleAuthModule()

  const {
    VALIDATION_EMAIL,
    VALIDATION_PASSWORD,
  } = useFormValidation()

  const {
    fetchSendLogin,
    isLoading,
  } = useLogin({
    onError: (err: AxiosError) => {
      const errorDescription = (err?.response?.data as TResponseApi<unknown>)?.message

      if (errorDescription) {
        setError(errorDescription)
      }
    },
    onSuccess: async () => {
      await initAccountAfterLogin()
    },
  });

  const onSubmit = async (values: TAuthModuleFields) => {
    setError('')
    await fetchSendLogin(values)
  }

  const validationSchema = useMemo(() =>
    yup.object().shape({
      [EAuthModuleFields.EMAIL]: VALIDATION_EMAIL,
      [EAuthModuleFields.PASSWORD]: VALIDATION_PASSWORD,
    }),
  [ VALIDATION_PASSWORD, VALIDATION_EMAIL ])

  const isFieldRequired = useCallback((field: EAuthModuleFields) =>
    !!validationSchema.fields[field]?.tests,
  [ validationSchema ])

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnChange
      validateOnMount
      validationSchema={validationSchema}
    >
      {
        formik => (
          <Form className={s.AuthModuleLoginForm__form}>

            <Field
              as={Input}
              className={s.AuthModuleLoginForm__input}
              errorMessage={
                formik.touched[EAuthModuleFields.EMAIL]
                        && formik.errors[EAuthModuleFields.EMAIL]
              }
              id={EAuthModuleFields.EMAIL}
              isRequired={isFieldRequired(EAuthModuleFields.EMAIL)}
              labelText={LOCALE_AUTH_MODULE_LOGIN_FORM_LABELS.EMAIL}
              name={EAuthModuleFields.EMAIL}
              placeholder={SETTINGS_MODULE_AUTH_PLACEHOLDERS.EMAIL}
            />

            <Field
              as={InputPassword}
              className={s.AuthModuleLoginForm__input}
              errorMessage={
                formik.touched[EAuthModuleFields.PASSWORD]
                        && formik.errors[EAuthModuleFields.PASSWORD]
              }
              id={EAuthModuleFields.PASSWORD}
              isRequired={isFieldRequired(EAuthModuleFields.PASSWORD)}
              labelText={LOCALE_AUTH_MODULE_LOGIN_FORM_LABELS.PASSWORD}
              name={EAuthModuleFields.PASSWORD}
              placeholder={SETTINGS_MODULE_AUTH_PLACEHOLDERS.PASSWORD}
            />

            <button
              className={s.AuthModuleLoginForm__forgetPass}
              onClick={onRecovery}
              type="button"
            >
              {LOCALE_AUTH_MODULE_LOGIN_FORM_TEXT_FORGOT}
            </button>

            {error && <p className={s.AuthModuleLoginForm__error}>{error}</p>}

            <div className={s.AuthModuleLoginForm__btn}>
              <Button
                content={LOCALE_AUTH_MODULE_LOGIN_FORM_TEXT_SUBMIT_BTN}
                disabled={!formik.isValid}
                isLoading={isLoading}
                type="submit"
              />
            </div>
          </Form>
        )
      }
    </Formik>


  );
};
