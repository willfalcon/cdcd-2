import styled from 'styled-components';
import { media } from './theme';

const Layout = styled.div`
  ${media.break`
    display: grid;
    min-height: 100%;
    min-height: ${({ viewport }) => viewport.height}px;
    background: ${({ theme }) => theme.light};
    padding-right: 4rem;
    padding-left: 4rem;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "header sidebar"
      "content sidebar";
      header {
        grid-area: header;
      }
      
      .main {
        grid-area: content;
      }
  `}
`;

const Main = styled.main`
  padding: 3rem;
`;

export { Main };
export default Layout;
