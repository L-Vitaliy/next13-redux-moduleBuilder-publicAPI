'use client'

import { Provider } from 'react-redux';

import {
  render,
  screen,
} from '@testing-library/react';

import { AuthModuleRecoveryDialog } from 'modules/pluggable/authorization/components/recovery/dialog/AuthModuleRecoveryDialog';
import { useLocaleAuthModule } from "modules/pluggable/authorization/hooks/useLocaleAuthModule";
import { reduxStoreInitial } from 'stores/redux';

const TestRender = () => (
  <Provider store={reduxStoreInitial}>
    <AuthModuleRecoveryDialog />
  </Provider>
)

describe('module "authorization": forgot password dialog-more"', () => {

  const { LOCALE_AUTH_MODULE_RECOVERY_MODAL_TITLE } = useLocaleAuthModule()

  it('should contain modal title', () => {
    expect.assertions(1);
    render(<TestRender />);

    expect((screen.getByText(LOCALE_AUTH_MODULE_RECOVERY_MODAL_TITLE))).toBeInTheDocument()
  });

});
