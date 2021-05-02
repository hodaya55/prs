import React, { useEffect, useState } from 'react';
import Pr from './Pr';

export default function PRs({ data }) {

  console.log(data);

  return (
    <ul className="pr-list">
      {
        data.length ?
          data.map(pr => <Pr {...pr} key={pr.id} />) :
          <p>No PRs found</p>
      }

    </ul>
  )
}
