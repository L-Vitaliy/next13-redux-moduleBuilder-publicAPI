'use client';

import {
  Suspense,
  isValidElement,
  useMemo,
  useState,
  useEffect,
  FC,
  useCallback,
  ComponentType,
} from 'react';

import clsx from 'clsx';


import dynamic from 'next/dynamic';

import { ModuleLoaderFallback } from 'factories/module-loader/fallback/ModuleLoaderFallback';
import s from 'factories/module-loader/ModuleLoader.module.scss';
import {
  MODULE_LOADER_MODULES_COMPONENTS,
  TModuleLoaderModules,
} from 'factories/module-loader/modules';
import {
  TModuleLoader,
  TLazyImportData,
} from 'factories/module-loader/types';
import {
  ReactFCC,
  JSX,
} from 'types/react';
import { Loader } from 'ui/components/loaders/Loader/Loader';
import { consoleError } from 'utils/console';
import { throwError } from 'utils/error';

const MODULE_LOADER_SKELETON_HEIGHT_DEFAULT = 200

type TLoadComponent = {
  fallback: ComponentType;
  name: string;
  path: string;
}

const loadComponent = (props: TLoadComponent) => {

  const {
    fallback,
    name,
    path,
  } = props

  // eslint-disable-next-line no-unsanitized/method -- здесь мы ожидаем ошибку линтера по динамическому импорту
  return dynamic(() => import(`../../${path}`)
    .then((cmp: TLazyImportData) => ({ 'default': cmp?.[name] }))
    .catch(() => ({ "default": fallback })))
}

const ModuleCmpContainer: ReactFCC<Pick<TModuleLoader, 'className'>> = props => {

  const {
    children,
    className,
  } = props

  return (
    <div className={clsx(s.ModuleLoader__container, className)}>
      {children}
    </div>
  );
}


const ModuleLoaderInner = (p: TModuleLoader) => {

  const {
    Component,
    className,
    isOnColorSection,
    module,
    moduleToCheckBeforeRender,
    skeletonHeight,
  } = p


  /**
   * Пробрасываем пропсы только в случае, если мы рендерим импортированный компонент, а не переданный в "Component"
   */
  const props = useMemo(() => !Component && p.props ? p.props : {}, [ Component, p.props ])

  const moduleInfo = typeof module === "string" && module.length ? MODULE_LOADER_MODULES_COMPONENTS[module as TModuleLoaderModules] : {
    component: undefined,
    componentName: undefined,
    description: undefined,
    fallbackHeight: undefined,
  }

  const moduleToCheckInfo = typeof moduleToCheckBeforeRender === "string" && moduleToCheckBeforeRender.length ? MODULE_LOADER_MODULES_COMPONENTS[moduleToCheckBeforeRender] : {
    component: undefined,
    componentName: undefined,
  }

  const {
    component,
    componentName,
    description,
    fallbackHeight,
  } = moduleInfo

  const {
    component: componentToCheck,
    componentName: componentNameToCheck,
  } = moduleToCheckInfo

  const errorMessageBase = `
    Error in: ModuleLoader
    Error message: Ошибка загрузки компонента ${componentName}
    `

  const Fallback = useCallback(() => (
    <ModuleCmpContainer className={className}>
      <ModuleLoaderFallback
        description={description}
        fallbackHeight={fallbackHeight}
        isOnColorSection={isOnColorSection}
      />
    </ModuleCmpContainer>
  ), [
    className,
    description,
    fallbackHeight,
    isOnColorSection,
  ])

  const [ loaded, setLoaded ] = useState<JSX>(<Loader height={skeletonHeight ?? MODULE_LOADER_SKELETON_HEIGHT_DEFAULT} />)

  useEffect(() => {

    try {
      let Cmp: ComponentType | undefined = undefined as unknown as FC

      if (typeof componentName === 'string' && componentName.length && typeof component === 'string' && component.length){
        Cmp = loadComponent({
          fallback: Fallback,
          name: componentName,
          path: component,
        })
      }


      if (!Cmp || !isValidElement(<Cmp {...props as Record<string, unknown>} />)){
        if (typeof componentNameToCheck === 'string' && componentNameToCheck.length && typeof componentToCheck === 'string' && componentToCheck.length && Component && isValidElement(<Component />)){

          const ElToCheck: ComponentType | undefined = loadComponent({
            fallback: Fallback,
            name: componentNameToCheck,
            path: componentToCheck,
          })

          if (ElToCheck && isValidElement(<ElToCheck />)){
            Cmp = Component
          }
        }
      }

      if (!Cmp || !isValidElement(<Cmp {...props as Record<string, unknown>} />)){
        throwError('No valid React element was loaded in the "ModuleLoader"')
        return
      }

      const ComponentResult = Cmp as ComponentType

      setLoaded((
        <ModuleCmpContainer className={className}>
          <Suspense fallback={<Loader height={fallbackHeight} />}>
            <ComponentResult {...props as Record<string, unknown>} />
          </Suspense>
        </ModuleCmpContainer>
      ));
    } catch (error) {
      consoleError({ message: `${errorMessageBase}\nError: ${JSON.stringify(error)}` })
      setLoaded(<Fallback />)
    }
  }, [
    Component,
    Fallback,
    className,
    component,
    componentName,
    componentNameToCheck,
    componentToCheck,
    errorMessageBase,
    fallbackHeight,
    props,
  ]);

  const LoadedComponent = useCallback(() => loaded, [ loaded ])

  return <LoadedComponent />;
};

/**
 * Загрузчик модулей.
 * Получает основные пропсы:
 * - либо:
 *    - "Component" - готовый компонент, собранный вне загрузчика
 *    - "moduleToCheckBeforeRender" - enum необходимого модуля
 *
 * - либо:
 *    - "module" - enum необходимого модуля
 *
 * Если проп "module" указан верно, соответствующий модуль существует в списке модулей загрузчика,
 * а также сами файлы модуля присутствуют в репозитории - загрузчик отобразит соответствующий модуль.
 * Если проп "module" не указан, либо указан неверно - загрузчик будет проверять проп "Component",
 * а также проп "moduleToCheckBeforeRender".
 * Если проп "Component" является валидным элементом,
 * а проп "moduleToCheckBeforeRender" отвечает всем требованиям пропа "module", то будет отображен именно "Component".
 * В прочих случаях будет отображена заглушка с текстом ошибки.
 */
export const ModuleLoader = (props: TModuleLoader) => {
  const skeletonHeight = typeof props.skeletonHeight === 'number' ? props.skeletonHeight : MODULE_LOADER_SKELETON_HEIGHT_DEFAULT
  return (
    <Suspense fallback={<Loader height={skeletonHeight} />}>
      <div style={
        {
          minHeight: `${skeletonHeight}px`,
          width: 'inherit',
        }
      }
      >
        <ModuleLoaderInner {...props} />
      </div>
    </Suspense>
  );
}
