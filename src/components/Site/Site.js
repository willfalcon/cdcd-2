import React, { useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { useQuery, gql } from '@apollo/client';

import Modal from '../Modal';

import LatestUpdate from './LatestUpdate';
import LastPost from './LastPost';

const SITE_DATA_QUERY = gql`
  query SITE_DATA_QUERY($id: ID!) {
    siteData(id: $id) {
      latestPost
      latestUpdate
      typeOptions
      error
    }
  }
`;

const Site = props => {
  // console.log(props);
  const {
    url,
    frontendUrl = false,
    title,
    setExpanded,
    id,
    // latestPost,
    // error,
  } = props;
  const [largeScreenshot, toggleLargeScreenshot] = useState(false);

  const { data, loading, error } = useQuery(SITE_DATA_QUERY, { variables: { id } });

  const latestPost = data?.siteData?.latestPost;
  const latestUpdate = data?.siteData?.latestUpdate;
  const typeOptions = data?.siteData?.typeOptions;

  return (
    <>
      <StyledSite>
        <div
          className="screenshot"
          onClick={() => {
            toggleLargeScreenshot(true);
          }}
        >
          <img
            src={`https://api.screenshotmachine.com?key=3b9628&url=${
              // frontendUrl || url
              url
            }&dimension=1024x768`}
            alt={`${title} screenshot`}
          />
        </div>
        <h3 className="title">{title}</h3>
        <a
          // href={frontendUrl || url}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="url"
        >
          {/* {frontendUrl || url} */}
          {url}
        </a>
        <button className="site-settings" style={{ gridArea: 'button' }} onClick={() => setExpanded(true)}>
          Site Settings
        </button>
        {/* <MainUpdate {...props} /> */}

        {!error && latestPost && (
          <>
            <LatestUpdate {...props} latestUpdate={latestUpdate} typeOptions={typeOptions} />
            <LastPost latestPost={latestPost} typeOptions={typeOptions} {...props} />
          </>
        )}

        {largeScreenshot && (
          <>
            <Modal
              style={{ zIndex: 2 }}
              handleClose={() => {
                toggleLargeScreenshot(false);
              }}
            >
              <img
                src={`https://api.screenshotmachine.com?key=3b9628&url=${frontendUrl || url}&dimension=1024x768`}
                alt={`${title} screenshot`}
                onClick={() => {
                  toggleLargeScreenshot(false);
                }}
                // style={{ zIndex: 2 }}
              />
            </Modal>
          </>
        )}
        {error && <p>The CDCD plugin is missing from this site! Make sure it's version 2.0 or above</p>}
      </StyledSite>
    </>
  );
};

const StyledSite = styled.li`
  padding: 1.5rem;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.white};
  background: white;
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.bs};
  padding-top: 1rem;
  display: grid;
  align-items: center;
  grid-template-columns: 200px 1fr 300px;
  grid-template-rows: repeat(5, auto);
  grid-column-gap: 2rem;
  grid-template-areas:
    'screenshot title update'
    'screenshot url lastpost'
    'screenshot button heroupdate'
    'screenshot . edit';
  .screenshot {
    grid-area: screenshot;
  }
  .title {
    grid-area: title;
    font-size: 2.2rem;
  }
  .url {
    grid-area: url;
    color: inherit;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
  .site-settings {
    background: transparent;
    justify-self: start;
    font-size: 1.2rem;
    border-width: 1px;
  }
  .update {
    grid-area: update;
    color: ${({ theme }) => theme.grey};
    font-weight: ${({ theme }) => theme.font.bold};
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }
  .update-date {
    grid-area: updatedate;
    font-weight: ${({ theme }) => theme.font.bold};
    font-size: 2rem;
    &.fresh {
      color: ${({ theme }) => theme.green};
    }
    &.expired {
      color: ${({ theme }) => theme.red};
    }
  }
  .last-post {
    grid-area: lastpost;
    font-weight: ${({ theme }) => theme.font.bold};
  }
  .hero-update {
    grid-area: heroupdate;
    font-weight: ${({ theme }) => theme.font.bold};
    position: relative;
  }
  button.no-style {
    border: 0;
    text-align: left;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    background: transparent;
    padding: 0;
    color: inherit;
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
  .edit-site {
    grid-area: edit;
    justify-self: start;
  }
  .delete-site {
    background: transparent;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.dark};
    cursor: pointer;
  }
`;

export default Site;
