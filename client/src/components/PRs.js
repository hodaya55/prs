import React from 'react';
import Pr from './Pr';

export default function PRs({ data }) {

  console.log(data, '~~~~~~~~~~~~~~~PRS');

  return (
    <ul className="pr-list">
      <label className="txt-align-left">{data.length} Results</label>
      {
        data.length ?
          data.map((pr, i) => <Pr {...pr} key={i} />) :
          <p style={{ margin: '5px' }}>No Pull Requests Found.</p>
      }

    </ul>
  )
}
