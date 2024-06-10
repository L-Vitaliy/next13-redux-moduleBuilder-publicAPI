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
import {
  EModalsFactoryKeys,
  MODALS_FACTORY_KEYS,
  MODALS_FACTORY_QUERY_PARAM_NAME,
} from "factories/modals/ModalsFactory.types";
import { useFormValidation } from "hooks/useFormValidation";
import { useUrlHelpers } from "hooks/useUrlHelpers";
import { useRecovery } from 'modules/pluggable/authorization/api/useRecovery';
import s from 'modules/pluggable/authorization/components/recovery/form/AuthModuleRecoveryForm.module.scss';
import {
  EAuthModuleRecoveryFields,
  TAuthModuleRecoveryFields,
} from 'modules/pluggable/authorization/components/recovery/form/AuthModuleRecoveryForm.types';
import { useLocaleAuthModule } from "modules/pluggable/authorization/hooks/useLocaleAuthModule";
import { ReactFCC } from 'types/react';
import { Button } from 'ui/components/button/basic/Button';
import { Input } from 'ui/components/input/Input/Input';


const initialValues: TAuthModuleRecoveryFields = { [EAuthModuleRecoveryFields.EMAIL]: '' }

/**
 * Форма запроса на восстановление пароля, содержит поле почты
 */
export const AuthModuleRecoveryForm: ReactFCC = () => {
  const [ error, setError ] = useState<string>('');
  const { setUrlQueryParams } = useUrlHelpers()
  const { VALIDATION_EMAIL } = useFormValidation()
  const {
    LOCALE_AUTH_MODULE_RECOVERY_FORM_LABELS,
    LOCALE_AUTH_MODULE_RECOVERY_FORM_PLACEHOLDERS,
    LOCALE_AUTH_MODULE_RECOVERY_FORM_SUBMIT_BTN,
  } = useLocaleAuthModule()

  const {
    fetchSendRecover,
    isLoading,
  } = useRecovery({
    onError: (err: AxiosError) => {
      const errorDescription = (err?.response?.data as TResponseApi<unknown>)?.message

      if (errorDescription) {
        setError(errorDescription)
      }
    },
    onSuccess: () => {
      setUrlQueryParams([ [ MODALS_FACTORY_QUERY_PARAM_NAME, MODALS_FACTORY_KEYS[EModalsFactoryKeys.AUTH_RECOVERY_PASSWORD_SUCCESS] ] ])
    },
  })

  const onSubmit = async (values: TAuthModuleRecoveryFields) => {
    setError('')
    await fetchSendRecover({ [EAuthModuleRecoveryFields.EMAIL]: values[EAuthModuleRecoveryFields.EMAIL] });
  }


  const validationSchema = useMemo(() =>
    yup.object().shape({ [EAuthModuleRecoveryFields.EMAIL]: VALIDATION_EMAIL }),
  [ VALIDATION_EMAIL ])

  const isFieldRequired = useCallback((field: EAuthModuleRecoveryFields) =>
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
          <Form className={s.AuthModuleRecoveryForm__form}>

            <Field
              as={Input}
              className={s.AuthModuleRecoveryForm__input}
              errorMessage={
                formik.touched[EAuthModuleRecoveryFields.EMAIL]
                && formik.errors[EAuthModuleRecoveryFields.EMAIL]
              }
              id={EAuthModuleRecoveryFields.EMAIL}
              isRequired={isFieldRequired(EAuthModuleRecoveryFields.EMAIL)}
              labelText={LOCALE_AUTH_MODULE_RECOVERY_FORM_LABELS.EMAIL}
              name={EAuthModuleRecoveryFields.EMAIL}
              placeholder={LOCALE_AUTH_MODULE_RECOVERY_FORM_PLACEHOLDERS.EMAIL}
            />

            {error && <p className={s.AuthModuleRecoveryForm__error}>{error}</p>}

            <div className={s.AuthModuleRecoveryForm__btn}>
              <Button
                content={LOCALE_AUTH_MODULE_RECOVERY_FORM_SUBMIT_BTN}
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
