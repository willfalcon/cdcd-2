import React from 'react';
import styled from 'styled-components';

const Error = ({ error, children }) => {
  if (!error || !error.message) return null;

  return (
    <ErrorStyles>
      <p>{error.message || children}</p>
    </ErrorStyles>
  );
};

export const ErrorStyles = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
`;

export const WarningStyles = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid yellow;
`;

export default Error;
