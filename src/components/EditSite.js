import React from 'react';
import { gql, useMutation } from '@apollo/client';
import nProgress from 'nprogress';

import Modal from './Modal';
import Form from './Form';
import useForm from '../lib/useForm';
import Error from './Error';
import Button from './Button';
import { SITES_QUERY } from './SiteList';

const UPDATE_SITE_MUTATION = gql`
  mutation UPDATE_SITE_MUTATION($id: ID!, $data: SiteUpdateInput!) {
    updateSite(where: { id: $id }, data: $data) {
      id
      title
      url
      frontendUrl
    }
  }
`;

const EditSite = props => {
  console.log(props);
  const { setExpanded, title, url, frontendUrl, setConfirmDelete } = props;
  const { inputs, handleChange } = useForm({
    title,
    url,
    frontendUrl,
  });

  const [updateSite, { loading, error }] = useMutation(UPDATE_SITE_MUTATION, { refetchQueries: [{ query: SITES_QUERY }] });

  return (
    <Modal handleClose={() => setExpanded(false)}>
      <h2>Update Site</h2>
      <Form
        onSubmit={async e => {
          e.preventDefault();
          nProgress.start();
          await updateSite({
            variables: {
              id: props.id,
              data: inputs,
            },
          });
          nProgress.done();
          setExpanded(false);
        }}
      >
        <Error error={error} />
        <fieldset disabled={loading} aria-busy={loading}>
          <label htmlFor="title">
            <span>Title</span>
            <input type="text" id="title" name="title" placeholder="Site Title" value={inputs.title} onChange={handleChange} />
          </label>
          <label htmlFor="url">
            <span>Url</span>
            <input type="text" id="url" name="url" placeholder="Site Url" value={inputs.url} onChange={handleChange} />
          </label>
          <label htmlFor="frontendUrl">
            <span>Frontend Url</span>
            <input
              type="text"
              id="frontendUrl"
              name="frontendUrl"
              placeholder="Frontend Url"
              value={inputs.frontendUrl}
              onChange={handleChange}
            />
          </label>
          <Button type="submit" disabled={loading}>
            Update Site
          </Button>
        </fieldset>
      </Form>
      <Button
        className="delete-site"
        style={{ marginLeft: 'auto', marginTop: '2rem' }}
        onClick={() => {
          setExpanded(false);
          setConfirmDelete(true);
        }}
      >
        Delete Site
      </Button>
    </Modal>
  );
};

export default EditSite;
