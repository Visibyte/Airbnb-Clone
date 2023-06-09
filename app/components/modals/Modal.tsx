'use client';

import { useCallback, useEffect, useState } from 'react';
import Button from '../Button';
import ModalBody from './ModalBody';
import ModalContainer from './ModalContainer';
import ModalContent from './ModalContent';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  console.log(isOpen);

  return (
    <>
      <ModalContainer>
        <ModalContent showModal={showModal}>
          {/* HEADER */}
          <ModalHeader title={title} handleClose={handleClose} />
          {/* BODY */}
          <ModalBody>{body}</ModalBody>
          {/* FOOTER */}
          <ModalFooter footer>
            {secondaryAction && secondaryActionLabel && (
              <Button
                outline
                disabled={disabled}
                label={secondaryActionLabel}
                onClick={handleSecondaryAction}
              />
            )}
            <Button
              disabled={disabled}
              label={actionLabel}
              onClick={handleSubmit}
            />
            {footer}
          </ModalFooter>
        </ModalContent>
      </ModalContainer>
    </>
  );
};

export default Modal;
