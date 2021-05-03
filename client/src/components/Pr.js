import React from 'react'

export default function Pr({ id, prNumber, title, description, author, status, labels, creationDate }) {

  const formatDateTime = (d) => {
    const dt = new Date(d);
    const day = dt.getDate();
    const month = dt.getMonth() + 1;
    const year = dt.getFullYear();
    let hours = dt.getHours();
    let minutes = dt.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strDateTime = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
    return strDateTime;
  }

  // need to handle timezone
  const creationDateFormatted = formatDateTime(creationDate);

  return (
    <div key={id} className="pr-item" >
      <div className='space-between'>
        <figure style={{ flexBasis: '10%' }}>
          <img src={author.urlPic} alt="user picture" className="author-img" />
          <figcaption>{author.name}</figcaption>
        </figure>
        <figure style={{ flexBasis: '70%' }}>
          <h5 className="txt-align-left">{title}</h5>
          <p>{description}</p>
        </figure>
        <figure>
          <label>{prNumber} #</label>
          <h5 className="label" style={{ backgroundColor: status === 'open' ? 'green' : status === 'closed' ? 'red' : 'gray' }} >{status}</h5>
        </figure>
      </div>
      <div className='space-between'>
        <div>
          {labels.map((l, i) =>
            <span key={i} className="label" >{l}</span>
          )}
        </div>
        <label >Created at {creationDateFormatted}</label>
      </div>
    </div>
  )
}
