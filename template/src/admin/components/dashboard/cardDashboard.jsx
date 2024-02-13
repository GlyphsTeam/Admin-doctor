/* eslint-disable react/prop-types */
import React from 'react'

function CardDashboard({name, total, color, key}) {
    
  return (
    <div className="col-xl-4 col-sm-6 col-12" key={key}>
    <div className="card">
      <div className="card-body">
        <div className="dash-widget-header">
          <span className={`dash-widget-icon text-${color} border-${color}`}>
            <i className="fe fe-users" />
          </span>
          <div className="dash-count">
            <h3>{total}</h3>
          </div>
        </div>
        <div className="dash-widget-info">
          <h6 className="text-muted">{name}</h6>
          <div className="progress progress-sm">
            <div className={`progress-bar bg-${color} w-50`} />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CardDashboard
