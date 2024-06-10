
import { Provider } from 'react-redux';

import {
  render,
  screen,
} from '@testing-library/react';

import { AuthModuleLoginForm } from 'modules/pluggable/authorization/components/login/form/AuthModuleLoginForm';
import { useLocaleAuthModule } from "modules/pluggable/authorization/hooks/useLocaleAuthModule";
import { reduxStoreInitial } from 'stores/redux';


const TestRender = () => (
  <Provider store={reduxStoreInitial}>
    <AuthModuleLoginForm />
  </Provider>
)

describe('module "authorization": login form', () => {

  const {
    LOCALE_AUTH_MODULE_LOGIN_FORM_LABELS,
    LOCALE_AUTH_MODULE_LOGIN_FORM_TEXT_SUBMIT_BTN,
  } = useLocaleAuthModule()

  it('should contain email input', () => {
    expect.assertions(1);
    render(<TestRender />);

    expect((screen.getByLabelText(LOCALE_AUTH_MODULE_LOGIN_FORM_LABELS.EMAIL))).toBeInTheDocument()
  });

  it('should contain password input', () => {
    expect.assertions(1);
    render(<TestRender />);

    expect((screen.getByLabelText(LOCALE_AUTH_MODULE_LOGIN_FORM_LABELS.PASSWORD))).toBeInTheDocument()
  });

  it('should contain submit basic', () => {
    expect.assertions(1);
    render(<TestRender />);

    expect((screen.getByText(LOCALE_AUTH_MODULE_LOGIN_FORM_TEXT_SUBMIT_BTN))).toBeInTheDocument()
  });

});
