import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import useWindowSize from '../lib/useWindowSize';

const Modal = ({ children, handleClose, className, backdrop = true, style }) => {
  const viewport = useWindowSize();

  const [pageHeight, setPageHeight] = useState(0);
  const body = document.body;
  useLayoutEffect(() => {
    if (body) {
      const height = Math.max(body.scrollHeight, body.offsetHeight);
      setPageHeight(height);
    }
  }, [body]);

  return (
    <>
      {backdrop && <Backdrop onClick={handleClose} height={pageHeight} />}
      <ModalContainer className={classNames('modal', className)} style={style} viewport={viewport}>
        {children}
      </ModalContainer>
    </>
  );
};

const Backdrop = styled.div.attrs(() => ({
  className: 'backdrop',
}))`
  position: absolute;
  width: 100%;
  height: 100%;
  height: ${({ height }) => height}px;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.dark};
  opacity: 0.5;
`;

const ModalContainer = styled.div`
  position: fixed;
  width: 800px;
  max-width: 100%;
  top: ${({ viewport }) => viewport.height / 2}px;
  /* top: 0; */
  left: ${({ viewport }) => viewport.width / 2}px;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  z-index: 2;
`;

export default Modal;
