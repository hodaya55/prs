import React, { useEffect, useState } from 'react';
import Pr from './Pr';

export default function PRs({ data }) {

  console.log(data, '~~~~~~~~~~~~~~~PRS');

  return (
    <ul className="pr-list">
      {
        data.length ?
          data.map((pr, i) => <Pr {...pr} key={i} />) :
          <p>No PRs found</p>
      }

    </ul>
  )
}
