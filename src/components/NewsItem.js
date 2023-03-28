import React from 'react'

const NewsItem = (props) => {
  function limitStr(str, cut) {
    if (str !== null) {
      let flag = false
      if (str.length > cut) { flag = true }
      if (flag) {
        return str.slice(0, cut).concat("...")
      }
      else {
        return str.slice(0, cut)
      }
    }
    else {
      return "..."
    }
  }

  function dateConversion(str){
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ]
    const d = new Date(str.substring(str))
    const date = d.getDate()
    const month = d.getMonth()
    const year = d.getFullYear()

    var s = date.toString() + " " + monthNames[month-1] + ", " + year.toString()
    return s
  }

  let { title, description, imageUrl, newsUrl, source, publishedAt } = props;
  return (
    <div className="my-3">
      
      <div className="card border-0">
      <a href={newsUrl} rel="noreferrer" target="_blank">
        <img src={imageUrl} className="card-img-top" alt="..." />
      </a>
        <div className="card-body">
        <a href={newsUrl} rel="noreferrer" target="_blank" style={{textDecoration: 'none', color: 'inherit', fontSize: '1em', fontFamily: 'Times New Roman'}}>
          <h5 className="card-title" style={{ fontSize: '1em' }}><b>{title}</b></h5>
        </a>
          <p className="card-text" style={{fontSize: '1em', fontFamily: 'Times New Roman'}}>{description}</p>
          <div className="flexingBox">
          <a href={newsUrl} rel="noreferrer" target="_blank" className="card-title" style={{ fontSize: '1em', width: '50vw', textDecoration: 'none', color: 'inherit'}}><b>{limitStr(source, 25)}</b></a>
          <div style={{ fontSize: '0.8em', textAlign: 'right', width: '50vw'}}><i>{dateConversion(publishedAt)}</i></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsItem