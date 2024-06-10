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


import { TResponseApi } from "api/types/api.types";
import { useNotificationCtx } from "context/notification/NotificationCtxProvider";
import { useFormValidation } from "hooks/useFormValidation";
import { useNavigate } from "hooks/useNavigate";
import { useInitAccountAfterLogin } from "modules/pluggable/account-profile/hooks/useInitAccountAfterLogin";
import { useRecoveryPassword } from "modules/pluggable/authorization/api/useRecoveryPassword";
import {
  TAuthModuleRecoveryPasswordFields,
  EAuthModuleRecoveryPasswordFields,
} from "modules/pluggable/authorization/components/recovery/password-form/AuthModuleRecoveryPasswordForm.types";
import { useLocaleAuthModule } from "modules/pluggable/authorization/hooks/useLocaleAuthModule";
import { useSettingsModuleAuth } from "modules/pluggable/authorization/hooks/useSettingsModuleAuth";
import { PAGE_ACCOUNT_PROFILE_ROUTE } from "routes/paths";
import { ReactFCC } from 'types/react';
import { Button } from 'ui/components/button/basic/Button';
import { InputPassword } from "ui/components/input/InputPassword/InputPassword";

import s from './AuthModuleRecoveryPasswordForm.module.scss';


type TAuthModuleRecoveryPasswordForm = {
  code: string;
}

const initialValues: TAuthModuleRecoveryPasswordFields = {
  [EAuthModuleRecoveryPasswordFields.NEW_PASSWORD]: '',
  [EAuthModuleRecoveryPasswordFields.NEW_PASSWORD_CONFIRM]: '',
}

/**
 * Форма запроса на восстановление пароля, содержит поле почты
 */
export const AuthModuleRecoveryPasswordForm: ReactFCC<TAuthModuleRecoveryPasswordForm> = props => {
  const { code } = props

  const navigate = useNavigate()
  const { notification } = useNotificationCtx()
  const [ error, setError ] = useState<string>('');
  const { SETTINGS_MODULE_AUTH_PLACEHOLDERS } = useSettingsModuleAuth()
  const {
    LOCALE_AUTH_MODULE_PASSWORD_FORM_SUBMIT_BTN,
    LOCALE_AUTH_MODULE_PASSWORD_SUCCESS_DIALOG_SUCCESS_TITLE,
    LOCALE_AUTH_MODULE_RECOVERY_NEW_PASSWORD_FORM_LABELS,
  } = useLocaleAuthModule()
  const {
    VALIDATION_PASSWORD,
    VALIDATION_PASSWORD_CONFIRM,
  } = useFormValidation()

  const { initAccountAfterLogin } = useInitAccountAfterLogin({ onSuccess: () => {
    notification.success({ message: LOCALE_AUTH_MODULE_PASSWORD_SUCCESS_DIALOG_SUCCESS_TITLE })
    navigate(PAGE_ACCOUNT_PROFILE_ROUTE)
  } })

  const {
    fetchSendRecoverPassword,
    isLoading,
  } = useRecoveryPassword({
    onError: (err: AxiosError) => {
      const errorDescription = (err?.response?.data as TResponseApi<unknown>)?.message

      if (errorDescription) {
        setError(errorDescription)
      }
    },
    onSuccess: async () => {
      await initAccountAfterLogin()
    },
  })

  const onSubmit = async (values: TAuthModuleRecoveryPasswordFields) => {
    setError('')
    await fetchSendRecoverPassword({
      ...values,
      code,
    });
  }


  const validationSchema = useMemo(() =>
    yup.object().shape({
      [EAuthModuleRecoveryPasswordFields.NEW_PASSWORD]: VALIDATION_PASSWORD,
      [EAuthModuleRecoveryPasswordFields.NEW_PASSWORD_CONFIRM]: VALIDATION_PASSWORD_CONFIRM(EAuthModuleRecoveryPasswordFields.NEW_PASSWORD),
    }),
  [ VALIDATION_PASSWORD, VALIDATION_PASSWORD_CONFIRM ])

  const isFieldRequired = useCallback((field: EAuthModuleRecoveryPasswordFields) =>
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
          <Form className={s.AuthModuleRecoveryPasswordForm__form}>

            <Field
              as={InputPassword}
              className={s.AuthModuleRecoveryPasswordForm__input}
              errorMessage={
                formik.touched[EAuthModuleRecoveryPasswordFields.NEW_PASSWORD]
                    && formik.errors[EAuthModuleRecoveryPasswordFields.NEW_PASSWORD]
              }
              id={EAuthModuleRecoveryPasswordFields.NEW_PASSWORD}
              isRequired={isFieldRequired(EAuthModuleRecoveryPasswordFields.NEW_PASSWORD)}
              labelText={LOCALE_AUTH_MODULE_RECOVERY_NEW_PASSWORD_FORM_LABELS[EAuthModuleRecoveryPasswordFields.NEW_PASSWORD]}
              name={EAuthModuleRecoveryPasswordFields.NEW_PASSWORD}
              placeholder={SETTINGS_MODULE_AUTH_PLACEHOLDERS[EAuthModuleRecoveryPasswordFields.NEW_PASSWORD]}
            />

            <Field
              as={InputPassword}
              className={s.AuthModuleRecoveryPasswordForm__input}
              errorMessage={
                formik.touched[EAuthModuleRecoveryPasswordFields.NEW_PASSWORD_CONFIRM]
                    && formik.errors[EAuthModuleRecoveryPasswordFields.NEW_PASSWORD_CONFIRM]
              }
              id={EAuthModuleRecoveryPasswordFields.NEW_PASSWORD_CONFIRM}
              isRequired={isFieldRequired(EAuthModuleRecoveryPasswordFields.NEW_PASSWORD_CONFIRM)}
              labelText={LOCALE_AUTH_MODULE_RECOVERY_NEW_PASSWORD_FORM_LABELS[EAuthModuleRecoveryPasswordFields.NEW_PASSWORD_CONFIRM]}
              name={EAuthModuleRecoveryPasswordFields.NEW_PASSWORD_CONFIRM}
              placeholder={SETTINGS_MODULE_AUTH_PLACEHOLDERS[EAuthModuleRecoveryPasswordFields.NEW_PASSWORD_CONFIRM]}
            />

            {error && <p className={s.AuthModuleRecoveryPasswordForm__error}>{error}</p>}

            <div className={s.AuthModuleRecoveryPasswordForm__btn}>
              <Button
                content={LOCALE_AUTH_MODULE_PASSWORD_FORM_SUBMIT_BTN}
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
