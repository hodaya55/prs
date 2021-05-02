import React from 'react'

export default function Pr({ id, prNumber, title, description, author, status, labels, creationDate }) {

  const formatDateTime = (d) => {
    let date = new Date(d);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strDateTime = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
    return strDateTime;
  }

  const creationDateFormatted = formatDateTime(creationDate);

  return (
    <div className="pr-item" key={id}>
      <div className='space-between'>
        <figure style={{ flexBasis: '10%' }}>
          <img src={author.urlPic} alt="user picture" className="author-img" />
          <figcaption>{author.name}</figcaption>
        </figure>
        <figure>
          <h5 style={{ flexBasis: '70%', textAlign: 'left' }} >{title}</h5>
          <p>{description}</p>
        </figure>
        <figure>
          <label>{prNumber} #</label>
          <h5 className="label" style={{ backgroundColor: status === 'open' ? 'green' : status === 'closed' ? 'red' : 'gray' }} >{status}</h5>
        </figure>
      </div>
      <div className='space-between'>
        <div>
          {labels.map(l =>
            <span className="label" >{l}</span>
          )}
        </div>
        <label >Created at {creationDateFormatted}</label>
      </div>
    </div>
  )
}
