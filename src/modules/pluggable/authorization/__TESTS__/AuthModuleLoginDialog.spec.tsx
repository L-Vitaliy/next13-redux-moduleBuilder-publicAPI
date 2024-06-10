'use client'

import {
  render,
  screen,
} from '@testing-library/react';

import { withTestsEnvironment } from 'config/tests/wrappers/withTestsEnvironment';
import { AuthModuleLoginDialog } from 'modules/pluggable/authorization/components/login/dialog/AuthModuleLoginDialog';
import { useLocaleAuthModule } from "modules/pluggable/authorization/hooks/useLocaleAuthModule";


const TestRender = () => withTestsEnvironment(<AuthModuleLoginDialog />)

describe('module "authorization": login dialog-more', () => {

  const {
    LOCALE_AUTH_MODULE_LOGIN_DIALOG_EXTRA_TITLE,
    LOCALE_AUTH_MODULE_LOGIN_DIALOG_TITLE,
  } = useLocaleAuthModule()

  it('should contain modal title',  () => {
    expect.assertions(1);
    render(<TestRender />);

    expect((screen.getByText(LOCALE_AUTH_MODULE_LOGIN_DIALOG_TITLE))).toBeInTheDocument()
  });

  it('should contain modal footer', () => {
    expect.assertions(1);
    render(<TestRender />);

    expect((screen.getByText(LOCALE_AUTH_MODULE_LOGIN_DIALOG_EXTRA_TITLE))).toBeInTheDocument()
  });

});
