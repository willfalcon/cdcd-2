import React, { useState } from 'react';
import classNames from 'classnames';
import { format, differenceInDays } from 'date-fns';
import { gql, useMutation } from '@apollo/client';

import Button from '../Button';
import Modal from '../Modal';
import Form from '../Form';
import useForm from '../../lib/useForm';
import Error from '../Error';

const UPDATE_FLAG_TIME_MUTATION = gql`
  mutation UPDATE_FLAG_TIME_MUTATION($id: ID!, $data: SiteFields!) {
    updateSite(id: $id, data: $data) {
      id
      flagTime
    }
  }
`;

const LatestUpdateOptions = ({ setEditFlagTime, id, flagTime, postTypes }) => {
  console.log(postTypes);
  const [updateFlagTime, { loading, error }] = useMutation(UPDATE_FLAG_TIME_MUTATION);
  const { inputs, handleChange } = useForm({ flagTime: flagTime || 30 });

  return (
    <Modal handleClose={() => setEditFlagTime(false)}>
      <Form
        onSubmit={e => {
          e.preventDefault();
          updateFlagTime({
            variables: {
              id,
              data: inputs,
            },
          });
        }}
      >
        <h3>Edit Flag Time</h3>
        <p>Set how many days before the latest update changes colors.</p>
        <Error error={error} />
        <fieldset disabled={loading} aria-busy={loading}>
          <label htmlFor="flagTime">
            <span>Flag Time</span>
            <input id="flagTime" name="flagTime" type="number" value={inputs.flagTime} onChange={handleChange} />
          </label>
          <Button type="submit">Submit</Button>
        </fieldset>
      </Form>
    </Modal>
  );
};

const LatestUpdate = ({ latestUpdate, flagTime, id }) => {
  const [editFlagTime, setEditFlagTime] = useState(false);

  const updateDifference = differenceInDays(new Date(), new Date(latestUpdate));
  const expired = updateDifference > (flagTime || 30);
  const fresh = updateDifference <= 5;

  return (
    <>
      <div className="update">
        <span>Last Update</span>
        <button className="no-style" onClick={() => setEditFlagTime(true)}>
          <time className={classNames('update-date', { expired, fresh })}>{format(new Date(latestUpdate), 'L/dd/yyy')}</time>
        </button>
      </div>
      {editFlagTime && <LatestUpdateOptions setEditFlagTime={setEditFlagTime} id={id} flagTime={flagTime} />}
    </>
  );
};

export default LatestUpdate;
