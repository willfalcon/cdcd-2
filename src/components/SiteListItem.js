import React, { useState } from 'react';

import Site from './Site/Site';
import EditSite from './EditSite';
import ConfirmDelete from './ConfirmDelete';

const SiteListItem = props => {
  // TODO: Add Edit site and Delete site confirm back in
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <>
      <Site {...props} expanded={expanded} setExpanded={setExpanded} />
      {expanded && <EditSite {...props} expanded={expanded} setExpanded={setExpanded} setConfirmDelete={setConfirmDelete} />}
      {confirmDelete && <ConfirmDelete {...props} setConfirmDelete={setConfirmDelete} />}
    </>
  );
};

export default SiteListItem;
