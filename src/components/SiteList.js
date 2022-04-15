import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';

import SiteListItem from './SiteListItem';
import Button from './Button';
import NewSite from './NewSite';

export const SITES_QUERY = gql`
  query siteQuery {
    sites {
      id
      title
      url
      frontendUrl
      latestPost
      latestUpdate
      flagTime
      error
      postTypes {
        type
      }
    }
  }
`;
const SiteList = () => {
  const { loading, error, data } = useQuery(SITES_QUERY);
  console.log(data);
  if (error) {
    console.error('booboo: ', error);
  }

  const [addFormOpen, setAddFormOpen] = useState(false);

  return (
    <StyledSiteList>
      <h2>Sites</h2>
      {loading && <p>Getting list of sites...</p>}
      <ul>{!loading && data.sites && data.sites.map(site => <SiteListItem key={site.id} {...site} />)}</ul>
      <Button style={{ display: 'inline-block' }} onClick={() => setAddFormOpen(!addFormOpen)}>
        Add Site
      </Button>
      {addFormOpen && <NewSite setAddFormOpen={setAddFormOpen} />}
    </StyledSiteList>
  );
};

const StyledSiteList = styled.div`
  ul {
    list-style: none;
    padding: 0;
  }
`;

export default SiteList;
