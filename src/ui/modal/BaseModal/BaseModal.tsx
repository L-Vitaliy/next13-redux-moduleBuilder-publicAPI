'use client'

import { FC } from "react";

import clsx from 'clsx';

import * as Dialog from '@radix-ui/react-dialog';

import { EIconsPlain } from 'factories/icons/Icons';
import { JSX } from 'types/react';
import { ButtonIcon } from 'ui/components/button/icon/ButtonIcon';
import s from 'ui/components/modal/BaseModal/BaseModal.module.scss';
import { useLocaleBaseModal } from "ui/components/modal/BaseModal/useLocaleBaseModal";


type TBaseModalContent = {
  className?: string;
  element: JSX | string;
}

type TBaseModalExtra = {
  className?: string;
  element?: JSX | string;
  title?: string;
}

type TBaseModal = {
  content: TBaseModalContent,
  extra?: TBaseModalExtra,
  onBack?: () => void;
  open: boolean;
  setOpen: (status: boolean) => void;
  title?: string;
}

/**
 * Компонент базовой модалки, содержит слоты для основного и экстра контента
 */
export const BaseModal: FC<TBaseModal> = props => {
  const {
    content,
    extra,
    onBack,
    open,
    setOpen,
    title,
  } = props

  const {
    className: contentClassName,
    element: contentElement,
  } = content

  const {
    className: extraClassName,
    element: extraElement,
    title: extraTitle,
  } = extra || {}

  const { LOCALE_CLOSE_BTN_LABEL } = useLocaleBaseModal()

  const isOnlyTitle = !contentElement && (!extraElement || !extraTitle)

  return (
    <Dialog.Root
      onOpenChange={setOpen}
      open={open}
    >
      <Dialog.Portal>
        <Dialog.Overlay className={s.BaseModal__overlay} />

        <Dialog.Content className={clsx(contentClassName, s.BaseModal__content)}>

          <div className={clsx(s.BaseModal__header, { [s.flex_end]: !onBack })}>
            {
              onBack && (
                <ButtonIcon
                  className={s.BaseModal__back}
                  icon={EIconsPlain.ARROW_RIGHT}
                  onClick={onBack}
                />
              )
            }


            <Dialog.Close asChild>
              <ButtonIcon
                aria-label={LOCALE_CLOSE_BTN_LABEL}
                className={s.BaseModal__close}
                icon={EIconsPlain.CROSS}
              />
            </Dialog.Close>
          </div>

          {title && <Dialog.Title className={clsx(s.BaseModal__title, { [s.onlyTitle]: isOnlyTitle })}>{title}</Dialog.Title>}

          {contentElement}

          {
            extraElement && extraTitle && (
              <div className={s.BaseModal__extraBlock}>
                <div className={s.BaseModal__extraMessage}>
                  { extraTitle }
                </div>

                <div className={extraClassName}>
                  { extraElement }
                </div>
              </div>
            )
          }
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
