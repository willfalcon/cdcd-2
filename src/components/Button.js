import React from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';

const Button = React.forwardRef(({ title, href, to, onClick, type, className, children, big = false, style, disabled }, ref) => {
  if (onClick) {
    return (
      <StyledButton
        onClick={onClick}
        className={classNames('button button--onclick', className)}
        big={big}
        ref={ref}
        style={style}
        disabled={disabled}
      >
        {title}
        {children}
      </StyledButton>
    );
  }
  if (type) {
    return (
      <StyledButton
        type={type}
        className={classNames('button button--tradish', className)}
        big={big}
        ref={ref}
        style={style}
        disabled={disabled}
      >
        {title}
        {children}
      </StyledButton>
    );
  }
  if (href && href.includes('http')) {
    return (
      <StyledLink className={classNames('button button--link', className)} as={'a'} ref={ref} style={style} href={href}>
        {title}
        {children}
      </StyledLink>
    );
  }
  return (
    <StyledLink className={classNames('button button--link', className)} big={big} ref={ref} style={style} to={href || to}>
      {title}
      {children}
    </StyledLink>
  );
});

const ButtonStyles = css`
  background: ${props => props.theme.orange};
  padding: ${({ big }) => (big ? '.75rem 5rem' : '.25rem 1.5rem')};
  color: white;
  border: 0;
  font-family: ${({ theme }) => theme.font.heading};
  font-weight: ${({ theme }) => theme.font.black};
  letter-spacing: 0.5px;
  font-style: normal;
  font-size: 2rem;
  line-height: 1.5;
  cursor: pointer;
`;

const StyledButton = styled.button`
  ${ButtonStyles}
`;

const StyledLink = styled.a`
  ${ButtonStyles}
  text-decoration: none;
  display: block;
  align-self: flex-start;
`;

export { ButtonStyles };
export default Button;
