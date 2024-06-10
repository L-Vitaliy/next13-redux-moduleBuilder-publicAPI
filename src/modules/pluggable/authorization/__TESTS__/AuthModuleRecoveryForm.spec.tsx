'use client'

import {
  render,
  screen,
} from '@testing-library/react';

import { withTestsEnvironment } from 'config/tests/wrappers/withTestsEnvironment';
import { AuthModuleRecoveryForm } from 'modules/pluggable/authorization/components/recovery/form/AuthModuleRecoveryForm';
import { useLocaleAuthModule } from "modules/pluggable/authorization/hooks/useLocaleAuthModule";


const TestRender = () => withTestsEnvironment(<AuthModuleRecoveryForm />)

describe('module "authorization": forgot password form', () => {

  const {
    LOCALE_AUTH_MODULE_RECOVERY_FORM_LABELS,
    LOCALE_AUTH_MODULE_RECOVERY_FORM_SUBMIT_BTN,
  } = useLocaleAuthModule()

  it('should contain email input', () => {
    expect.assertions(1);
    render(<TestRender />);

    expect((screen.getByLabelText(LOCALE_AUTH_MODULE_RECOVERY_FORM_LABELS.EMAIL!))).toBeInTheDocument()
  });

  it('should contain submit basic', () => {
    expect.assertions(1);
    render(<TestRender />);

    expect((screen.getByText(LOCALE_AUTH_MODULE_RECOVERY_FORM_SUBMIT_BTN))).toBeInTheDocument()
  });

});
