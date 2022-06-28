import React, { useState } from 'react';
import { format } from 'date-fns';

import Button from '../Button';
import Modal from '../Modal';
import Form from '../Form';
import Error from '../Error';
import { gql, useMutation } from '@apollo/client';
import nProgress from 'nprogress';

const LastPost = ({ latestPost, typeOptions, postTypes, id }) => {
  const [editPostOptions, setEditPostOptions] = useState(false);

  return (
    <>
      <button className="no-style" onClick={() => setEditPostOptions(true)}>
        <time className="last-post">Last Post: {format(new Date(latestPost), 'L/dd/yyy')}</time>
      </button>
      {editPostOptions && <PostOptions id={id} setEditPostOptions={setEditPostOptions} typeOptions={typeOptions} postTypes={postTypes} />}
    </>
  );
};

const UPDATE_POST_TYPES_MUTATION = gql`
  mutation UPDATE_POST_TYPES_MUTATION($id: ID!, $data: SiteUpdateInput!) {
    updateSite(where: { id: $id }, data: $data) {
      id
      postTypes
    }
  }
`;

const PostOptions = ({ setEditPostOptions, typeOptions, postTypes, id }) => {
  const [checkedTypes, setCheckedTypes] = useState(postTypes || []);

  const [updatePostTypes, { loading, error }] = useMutation(UPDATE_POST_TYPES_MUTATION);

  return (
    <Modal handleClose={() => setEditPostOptions(false)}>
      <Form
        onSubmit={async e => {
          e.preventDefault();
          nProgress.start();
          const props = await updatePostTypes({
            variables: {
              id,
              data: {
                postTypes: checkedTypes,
              },
            },
          });
          nProgress.done();
          setEditPostOptions(false);
        }}
      >
        <h2>Edit Last Post Bit</h2>
        <p>Set which post types you'd like to be included in the "Last Post" status.</p>

        <Error error={error} />
        <fieldset disabled={loading} aria-busy={loading}>
          <div className="columns-2" style={{ marginBottom: '2rem' }}>
            {typeOptions.map(type => {
              return (
                <label style={{ display: 'block' }} key={type}>
                  <input
                    type="checkbox"
                    name="options"
                    value={type}
                    checked={checkedTypes.includes(type)}
                    onChange={e => {
                      if (!checkedTypes.includes(type)) {
                        setCheckedTypes([...checkedTypes, type]);
                      } else {
                        setCheckedTypes([
                          ...checkedTypes.slice(0, checkedTypes.indexOf(type)),
                          ...checkedTypes.slice(checkedTypes.indexOf(type) + 1),
                        ]);
                      }
                    }}
                    style={{ marginRight: '5px' }}
                  />
                  {type}
                </label>
              );
            })}
          </div>
          <Button type="submit">Submit</Button>
        </fieldset>
      </Form>
    </Modal>
  );
};

export default LastPost;
