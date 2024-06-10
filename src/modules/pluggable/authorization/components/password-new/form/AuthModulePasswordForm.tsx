'use client'

import {
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { AxiosError } from "axios";
import {
  Field,
  Form,
  Formik,
} from 'formik';
import * as yup from 'yup';


import { TResponseApi } from "api/types/api.types";
import {
  EModalsFactoryKeys,
  MODALS_FACTORY_KEYS,
  MODALS_FACTORY_QUERY_PARAM_NAME,
} from "factories/modals/ModalsFactory.types";
import { useFormValidation } from 'hooks/useFormValidation';
import { useUrlHelpers } from 'hooks/useUrlHelpers';
import { useChangePassword } from "modules/pluggable/authorization/api/useChangePassword";
import s from 'modules/pluggable/authorization/components/password-new/form/AuthModulePasswordForm.module.scss';
import {
  EAuthModulePasswordFields,
  TAuthModulePasswordFields,
} from 'modules/pluggable/authorization/components/password-new/form/AuthModulePasswordForm.types';
import { useLocaleAuthModule } from "modules/pluggable/authorization/hooks/useLocaleAuthModule";
import { useSettingsModuleAuth } from 'modules/pluggable/authorization/hooks/useSettingsModuleAuth';
import { ReactFCC } from 'types/react';
import { Button } from "ui/components/button/basic/Button";
import { InputPassword } from 'ui/components/input/InputPassword/InputPassword';


const initialValues: TAuthModulePasswordFields = {
  [EAuthModulePasswordFields.NEW_PASSWORD_CONFIRM]: '',
  [EAuthModulePasswordFields.NEW_PASSWORD]: '',
  [EAuthModulePasswordFields.OLD_PASSWORD]: '',
}

type TAuthModulePasswordForm = {
  hasOldPasswordCheck?: boolean;
}

/**
 * Форма восстановление пароля, содержит поля нового пароля и подтверждение пароля
 */
export const AuthModulePasswordForm: ReactFCC<TAuthModulePasswordForm> = props => {
  const { hasOldPasswordCheck } = props

  const { setUrlQueryParams } = useUrlHelpers()
  const [ error, setError ] = useState<string>('');

  const {
    VALIDATION_PASSWORD,
    VALIDATION_PASSWORD_CONFIRM,
  } = useFormValidation()

  const {
    LOCALE_AUTH_MODULE_PASSWORD_FORM_LABELS,
    LOCALE_AUTH_MODULE_PASSWORD_FORM_SUBMIT_BTN,
  } = useLocaleAuthModule()

  const { SETTINGS_MODULE_AUTH_PLACEHOLDERS } = useSettingsModuleAuth()

  const {
    fetchSendRecover,
    isLoading,
  } = useChangePassword({
    onError: (err: AxiosError) => {
      const errorDescription = (err?.response?.data as TResponseApi<unknown>)?.message

      if (errorDescription) {
        setError(errorDescription)
      }
    },
    onSuccess: async () => {
      setUrlQueryParams([ [ MODALS_FACTORY_QUERY_PARAM_NAME, MODALS_FACTORY_KEYS[EModalsFactoryKeys.AUTH_CHANGE_PASSWORD_SUCCESS] ] ])
    },
  })

  const onSubmit = async (values: TAuthModulePasswordFields) => {
    setError('')
    await fetchSendRecover({
      [EAuthModulePasswordFields.NEW_PASSWORD]: values[EAuthModulePasswordFields.NEW_PASSWORD],
      [EAuthModulePasswordFields.OLD_PASSWORD]: values[EAuthModulePasswordFields.OLD_PASSWORD],
    });
  }

  const validationSchema = useMemo(() =>
    yup.object().shape({
      [EAuthModulePasswordFields.NEW_PASSWORD]: VALIDATION_PASSWORD,
      [EAuthModulePasswordFields.NEW_PASSWORD_CONFIRM]: VALIDATION_PASSWORD_CONFIRM(EAuthModulePasswordFields.NEW_PASSWORD),
      [EAuthModulePasswordFields.OLD_PASSWORD]: hasOldPasswordCheck ? VALIDATION_PASSWORD : yup.mixed().notRequired(),
    }),
  [
    VALIDATION_PASSWORD,
    VALIDATION_PASSWORD_CONFIRM,
    hasOldPasswordCheck,
  ])

  const isFieldRequired = useCallback((field: EAuthModulePasswordFields) =>
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
          <Form className={s.AuthModulePasswordForm__form}>
            <>
              {
                hasOldPasswordCheck && (
                  <Field
                    as={InputPassword}
                    className={s.AuthModulePasswordForm__input}
                    errorMessage={
                      formik.touched[EAuthModulePasswordFields.OLD_PASSWORD]
                              && formik.errors[EAuthModulePasswordFields.OLD_PASSWORD]
                    }
                    id={EAuthModulePasswordFields.OLD_PASSWORD}
                    isRequired={hasOldPasswordCheck}
                    labelText={LOCALE_AUTH_MODULE_PASSWORD_FORM_LABELS[EAuthModulePasswordFields.OLD_PASSWORD]}
                    name={EAuthModulePasswordFields.OLD_PASSWORD}
                    placeholder={SETTINGS_MODULE_AUTH_PLACEHOLDERS[EAuthModulePasswordFields.OLD_PASSWORD]}
                  />
                )
              }

              <Field
                as={InputPassword}
                className={s.AuthModulePasswordForm__input}
                errorMessage={
                  formik.touched[EAuthModulePasswordFields.NEW_PASSWORD]
                      && formik.errors[EAuthModulePasswordFields.NEW_PASSWORD]
                }
                id={EAuthModulePasswordFields.NEW_PASSWORD}
                isRequired={isFieldRequired(EAuthModulePasswordFields.NEW_PASSWORD)}
                labelText={LOCALE_AUTH_MODULE_PASSWORD_FORM_LABELS[EAuthModulePasswordFields.NEW_PASSWORD]}
                name={EAuthModulePasswordFields.NEW_PASSWORD}
                placeholder={SETTINGS_MODULE_AUTH_PLACEHOLDERS[EAuthModulePasswordFields.NEW_PASSWORD]}
              />

              <Field
                as={InputPassword}
                className={s.AuthModulePasswordForm__input}
                errorMessage={
                  formik.touched[EAuthModulePasswordFields.NEW_PASSWORD_CONFIRM]
                      && formik.errors[EAuthModulePasswordFields.NEW_PASSWORD_CONFIRM]
                }
                id={EAuthModulePasswordFields.NEW_PASSWORD_CONFIRM}
                isRequired={isFieldRequired(EAuthModulePasswordFields.NEW_PASSWORD_CONFIRM)}
                labelText={LOCALE_AUTH_MODULE_PASSWORD_FORM_LABELS[EAuthModulePasswordFields.NEW_PASSWORD_CONFIRM]}
                name={EAuthModulePasswordFields.NEW_PASSWORD_CONFIRM}
                placeholder={SETTINGS_MODULE_AUTH_PLACEHOLDERS[EAuthModulePasswordFields.NEW_PASSWORD_CONFIRM]}
              />

              {
                !!error && (
                  <p className={s.AuthModulePasswordForm__error}>
                    {error as ReactNode}
                  </p>
                )
              }

              <div className={s.AuthModulePasswordForm__btn}>
                <Button
                  content={LOCALE_AUTH_MODULE_PASSWORD_FORM_SUBMIT_BTN}
                  disabled={!formik.isValid}
                  isLoading={isLoading}
                  type="submit"
                />
              </div>
            </>

          </Form>
        )
      }
    </Formik>
  );
};
