import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import 'nprogress/nprogress.css';

import theme from './components/theme';
import { SiteContextProvider } from './components/SiteContext';
import Layout, { Main } from './components/Layout';
import Head from './components/Head';
import Header from './components/Header';
import GlobalStyle from './components/GlobalStyle';

import SiteList from './components/SiteList';
import Auth from './components/Auth';
import useWindowSize from './lib/useWindowSize';

const App = () => {
  const viewport = useWindowSize();

  return (
    <ThemeProvider theme={theme}>
      <SiteContextProvider>
        <Layout viewport={viewport}>
          <Head />
          <Header />
          <Main className="main">
            <Routes>
              <Route path="/" element={<SiteList />} />
              <Route path="auth" element={<Auth />} />
            </Routes>
          </Main>
          <GlobalStyle />
        </Layout>
      </SiteContextProvider>
    </ThemeProvider>
  );
};

export default App;
