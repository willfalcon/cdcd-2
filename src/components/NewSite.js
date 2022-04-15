import React from 'react';
import Modal from './Modal';
import Form from './Form';
import Button from './Button';
import Error from './Error';
import useForm from '../lib/useForm';
import { gql, useMutation } from '@apollo/client';
import { SITES_QUERY } from './SiteList';

const CREATE_SITE_MUTATION = gql`
  mutation CreateSite($title: String!, $url: String!, $frontendUrl: String) {
    createSite(title: $title, url: $url, frontendUrl: $frontendUrl) {
      id
      title
      url
      frontendUrl
    }
  }
`;

const NewSite = ({ setAddFormOpen }) => {
  const { inputs, handleChange } = useForm({
    title: '',
    url: '',
    frontendUrl: '',
  });

  const [createSite, { loading, error }] = useMutation(CREATE_SITE_MUTATION, { refetchQueries: [{ query: SITES_QUERY }] });

  return (
    <Modal handleClose={() => setAddFormOpen(false)}>
      <h2>Add a Site</h2>
      <Form
        onSubmit={async e => {
          e.preventDefault();

          await createSite({ variables: inputs });
          setAddFormOpen(false);
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
            Add Site
          </Button>
        </fieldset>
      </Form>
    </Modal>
  );
};

export default NewSite;
