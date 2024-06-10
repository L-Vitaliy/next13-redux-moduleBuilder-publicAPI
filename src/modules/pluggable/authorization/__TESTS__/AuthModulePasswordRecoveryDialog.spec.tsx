'use client'

import {
  render,
  screen,
} from '@testing-library/react';

import { withTestsEnvironment } from "config/tests/wrappers/withTestsEnvironment";
import { AuthModulePasswordRecoveryDialog } from 'modules/pluggable/authorization/components/password-new/dialog/AuthModulePasswordRecoveryDialog';
import { useLocaleAuthModule } from "modules/pluggable/authorization/hooks/useLocaleAuthModule";


const TestRender = () => withTestsEnvironment(<AuthModulePasswordRecoveryDialog />)

describe('module "authorization": recovery password dialog-more"', () => {

  const { LOCALE_AUTH_MODULE_PASSWORD_RECOVERY_DIALOG_PASSWORD_CHANGE_TITLE } = useLocaleAuthModule()

  it('should contain modal title', () => {
    expect.assertions(1);
    render(<TestRender />);

    expect((screen.getByText(LOCALE_AUTH_MODULE_PASSWORD_RECOVERY_DIALOG_PASSWORD_CHANGE_TITLE))).toBeInTheDocument()
  });

});
