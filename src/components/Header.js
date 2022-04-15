import React from 'react';
import styled from 'styled-components';

import icon from '../images/cd-new-square-transparent.png';

const Header = () => {
  return (
    <StyledHeader>
      <img src={icon} alt="Creative Distillery Icon" />
      <h1>CDCD</h1>
      <span>Creative Distillery Content Dashboard</span>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  padding: 1rem;
  display: flex;
  align-items: center;
  img {
    width: 50px;
  }
  h1 {
    margin: 0;
    margin-right: 1rem;
    line-height: 1.5;
  }
  span {
    font-size: 1rem;
    margin-top: 0.5rem;
  }
`;

export default Header;
