import styled from 'styled-components';

const Form = styled.form`
  fieldset {
    border: 0;
    padding: 0;
  }
  label {
    display: block;
    span {
      display: block;
      &.description {
        font-family: ${({ theme }) => theme.font.familySans};
        letter-spacing: 0;
        line-height: 1.15;
        font-size: 1.4rem;
      }
    }
  }
`;

export default Form;
