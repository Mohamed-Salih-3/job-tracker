import React from 'react'

const StatusBadge = ({status}) => {
  const safeStatus=status||"Unknown"
  return (
    <div className='status-badge'>
        <span id={`status-${safeStatus.toLowerCase()}`}>{safeStatus}</span>
    </div>
  )
}

export default StatusBadge