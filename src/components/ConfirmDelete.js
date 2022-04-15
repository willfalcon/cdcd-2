import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { gql, useMutation } from '@apollo/client';
import { SITES_QUERY } from './SiteList';
import Error from './Error';

const DELETE_SITE_MUTATION = gql`
  mutation DELETE_SITE_MUTATION($id: ID!) {
    deleteSite(id: $id)
  }
`;

const ConfirmDelete = ({ id, setConfirmDelete }) => {
  const [deleteSite, { error, loading }] = useMutation(DELETE_SITE_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: SITES_QUERY }],
  });
  return (
    <Modal handleClose={() => setConfirmDelete(false)}>
      <p>Are you sure you want to delete this site?</p>
      <Error error={error} />
      <div style={{ display: 'flex' }}>
        <Button
          className="delete-site"
          disabled={loading}
          onClick={async e => {
            e.preventDefault();
            await deleteSite();
            setConfirmDelete(false);
          }}
        >
          Delete Site
        </Button>
        <Button
          className="cancel"
          style={{ marginLeft: '2rem' }}
          disabled={loading}
          onClick={() => {
            setConfirmDelete(false);
          }}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};
export default ConfirmDelete;
