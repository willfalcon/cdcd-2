import React, { useState } from 'react';
import classNames from 'classnames';
import { format, differenceInDays } from 'date-fns';
import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';
import nProgress from 'nprogress';

import Button from '../Button';
import Modal from '../Modal';
import Form from '../Form';
import useForm from '../../lib/useForm';
import Error, { WarningStyles } from '../Error';

const UPDATE_FLAG_TIME_MUTATION = gql`
  mutation UPDATE_FLAG_TIME_MUTATION($id: ID!, $data: SiteUpdateInput!) {
    updateSite(where: { id: $id }, data: $data) {
      id
      flagTime
      updatePostTypes
    }
  }
`;

const LatestUpdateOptions = ({ setEditFlagTime, id, flagTime, updatePostTypes, typeOptions }) => {
  const [updateFlagTime, { loading, error }] = useMutation(UPDATE_FLAG_TIME_MUTATION);
  const { inputs, handleChange } = useForm({ flagTime: flagTime || 30 });

  const [checkedTypes, setCheckedTypes] = useState(updatePostTypes || []);

  return (
    <Modal handleClose={() => setEditFlagTime(false)}>
      <Form
        onSubmit={async e => {
          e.preventDefault();
          nProgress.start();
          await updateFlagTime({
            variables: {
              id,
              data: {
                flagTime: inputs.flagTime,
                updatePostTypes: checkedTypes,
              },
            },
          });
          nProgress.done();
          setEditFlagTime(false);
        }}
      >
        <h2>Edit Latest Update Bit</h2>
        <Error error={error} />
        <FieldsetGrid disabled={loading} aria-busy={loading}>
          <label htmlFor="flagTime" className="span-1">
            <h3>Flag Time</h3>
            <p>Set how many days before the latest update changes colors.</p>
            <input id="flagTime" name="flagTime" type="number" value={inputs.flagTime} onChange={handleChange} />
          </label>
          <div className="label-wrapper span-1">
            <h3>Post Types to Check</h3>
            <p>Set which post types you'd like to be included in the "Last Update" status.</p>
            {typeof typeOptions === 'object' ? (
              <div className="columns-2">
                {typeOptions.map(type => {
                  return (
                    <label style={{ display: 'block' }} key={type}>
                      <input
                        type="checkbox"
                        name="options"
                        value={type}
                        checked={checkedTypes.includes(type)}
                        onChange={e => {
                          console.log(e.target.checked);
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
            ) : (
              <WarningStyles>
                <p>{typeOptions}</p>
              </WarningStyles>
            )}
          </div>
          <Button type="submit" className="span-2">
            Submit
          </Button>
        </FieldsetGrid>
      </Form>
    </Modal>
  );
};

export const FieldsetGrid = styled.fieldset`
  display: grid;
  gap: 3rem;
  grid-template-columns: 2fr 3fr;
  grid-template-rows: repeat(2, auto);
  margin-top: 2rem;
  .span-1 {
    grid-column: span 1;
  }
  .span-2 {
    grid-column: span 2;
  }
  button {
    justify-self: center;
  }
`;

const LatestUpdate = ({ latestUpdate, flagTime, id, updatePostTypes, typeOptions }) => {
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
      {editFlagTime && (
        <LatestUpdateOptions
          setEditFlagTime={setEditFlagTime}
          id={id}
          flagTime={flagTime}
          updatePostTypes={updatePostTypes}
          typeOptions={typeOptions}
        />
      )}
    </>
  );
};

export default LatestUpdate;
