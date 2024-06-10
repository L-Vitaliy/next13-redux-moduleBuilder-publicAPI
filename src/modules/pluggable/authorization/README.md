# Модуль: Авторизация

Используется для ввода логина/пароля, а также для восстановления забытого пароля

## Демо

Страница демо: `/auth`

## Хуки

### useLogin

Используется для отправки и обработки запроса на бэк на авторизацию пользователя

#### Использование:

```tsx
import { useLogin } from 'routes/modules/authorization/useCollectBannerData/useLogin';

const { login } = useLogin();
```

### useRecovery

Используется для отправки и обработки запроса на бэк на смену пароля пользователя по e-mail

#### Использование:

```tsx
import { useRecovery } from 'routes/modules/authorization/useCollectBannerData/useRecovery';

const { recovery } = useRecovery();
```

### usePasswordRecovery

Используется для отправки и обработки запроса на восстановление нового пароля

#### Использование:

```tsx
import { usePasswordRecovery } from 'routes/modules/authorization/useCollectBannerData/usePasswordRecovery';

const { passwordRecovery } = usePasswordRecovery();
```

### useModuleAuthSettings

Используется для получения различных данных для модуля.
Например, плейсхолдеры форм.

#### Использование:

```tsx
import { useModuleAuthSettings } from 'routes/modules/authorization/useCollectBannerData/useModuleAuthSettings';

const { labels, placeholders } = useModuleAuthSettings();
```

## Компоненты авторизации

### AuthModuleLoginForm

Компонент формы авторизации, содержит в себе набор всех полей, включая валидацию

#### Использование:

```tsx
import { AuthModuleLoginForm } from 'src/modules/pluggable/authorization/components/login/form/AuthModuleLoginForm';

<AuthModuleLoginForm />;
```

### AuthModuleLoginDialog

Компонент модалки, содержит в контенте форму авторизации,
а также управляет вызовом других модалок (регистрации, смены пароля)

Оборачивает компонент `BaseModal`

#### Использование:

```tsx
import { AuthModuleLoginDialog } from 'src/modules/pluggable/authorization/components/login/dialog/AuthModuleLoginDialog';

<AuthModuleLoginDialog
  onClose={() => {
    /* */
  }}
/>;
```

## Компоненты восстановления пароля (запрос по email)

### AuthModuleRecoveryForm

Компонент формы запроса на восстановление пароля, содержит в себе поле email

#### Использование:

```tsx
import { AuthModuleRecoveryForm } from 'src/modules/pluggable/authorization/components/recovery/form/AuthModuleRecoveryForm';

<AuthModuleRecoveryForm />;
```

### AuthModuleRecoveryDialog

Компонент модалки, содержит в контенте форму запроса на восстановление пароля

Оборачивает компонент `BaseModal`

#### Использование:

```tsx
import { AuthModuleRecoveryDialog } from 'src/modules/pluggable/authorization/components/recovery/dialog/AuthModuleRecoveryDialog';

<AuthModuleRecoveryDialog
  onClose={() => {
    /* */
  }}
/>;
```

## Компоненты восстановления пароля (создание нового пароля)

### AuthModulePasswordRecoveryForm

Компонент формы создания пароля, содержит поля ввода нового пароля и его подтверждения

#### Использование:

```tsx
import { AuthModulePasswordRecoveryForm } from 'src/modules/pluggable/authorization/components/password-new/form/AuthModulePasswordRecoveryForm';

<AuthModulePasswordRecoveryForm />;
```

### AuthModulePasswordRecoveryDialog

Компонент модалки, содержит в контенте форму смены пароля

Оборачивает компонент `BaseModal`

#### Использование:

```tsx
import { AuthModulePasswordRecoveryDialog } from 'src/modules/pluggable/authorization/components/password-new/dialog/AuthModulePasswordRecoveryDialog';

<AuthModulePasswordRecoveryDialog
  onClose={() => {
    /* */
  }}
/>;
```
