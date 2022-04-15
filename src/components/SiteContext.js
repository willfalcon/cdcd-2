import React, { useContext } from 'react';
import { useLocalStorage } from 'react-use';

const SiteContext = React.createContext();

const SiteContextProvider = ({ data, children }) => {
  const [accessToken, setAccessToken] = useLocalStorage('access_token', null);

  return <SiteContext.Provider value={{ ...data, accessToken, setAccessToken }}>{children}</SiteContext.Provider>;
};

const useSiteContext = () => useContext(SiteContext);

export { SiteContextProvider };
export default useSiteContext;
