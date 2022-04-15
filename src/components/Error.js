import React from 'react';
import styled from 'styled-components';

const Error = ({ error }) => {
  if (!error || !error.message) return null;

  return (
    <ErrorStyles>
      <p>{error.message}</p>
    </ErrorStyles>
  );
};

const ErrorStyles = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
`;

export default Error;
