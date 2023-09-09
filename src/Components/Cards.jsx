import React from 'react'

function Cards({id, image, name, type, })  {

  return (
      <div className="card-style">
          <div className="number"><small>#0{id}</small></div>
          <img src={image} alt={name} />
          <div className="detail-wrapper">
              <h3>{name}</h3>
              <small>Type: {type}</small>
          </div>
      </div>
  )
}




export default Cards