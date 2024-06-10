'use client'

import {
  render,
  screen,
} from '@testing-library/react';

import { withTestsEnvironment } from "config/tests/wrappers/withTestsEnvironment";
import { AuthModulePasswordForm } from 'modules/pluggable/authorization/components/password-new/form/AuthModulePasswordForm';
import { useLocaleAuthModule } from "modules/pluggable/authorization/hooks/useLocaleAuthModule";


describe('module "authorization": recovery password form', () => {

  describe.each([ true, false ])('with old-password', (hasOldPasswordCheck: boolean) => {

    const TestRender = () => withTestsEnvironment(<AuthModulePasswordForm hasOldPasswordCheck={hasOldPasswordCheck} />)


    const {
      LOCALE_AUTH_MODULE_PASSWORD_FORM_LABELS,
      LOCALE_AUTH_MODULE_PASSWORD_FORM_SUBMIT_BTN,
    } = useLocaleAuthModule()

    if (hasOldPasswordCheck) {
      it('should contain old password input', () => {
        expect.assertions(1);
        render(<TestRender />);

        expect((screen.getByLabelText(LOCALE_AUTH_MODULE_PASSWORD_FORM_LABELS.OLD_PASSWORD))).toBeInTheDocument()
      });
    }

    it('should contain new password input', () => {
      expect.assertions(1);
      render(<TestRender />);

      expect((screen.getByLabelText(LOCALE_AUTH_MODULE_PASSWORD_FORM_LABELS.NEW_PASSWORD))).toBeInTheDocument()
    });

    it('should contain confirm new password input', () => {
      expect.assertions(1);
      render(<TestRender />);

      expect((screen.getByLabelText(LOCALE_AUTH_MODULE_PASSWORD_FORM_LABELS.NEW_PASSWORD_CONFIRM))).toBeInTheDocument()
    });

    it('should contain submit basic', () => {
      expect.assertions(1);
      render(<TestRender />);

      expect((screen.getByText(LOCALE_AUTH_MODULE_PASSWORD_FORM_SUBMIT_BTN))).toBeInTheDocument()
    });
  })
});
