import React from 'react'

const PageHeader = ({ title, description }) => {
  return (
    <div className='mt-5 mb-10'>
        <h2 className='text-2xl font-medium' >{title}</h2>
        <p className='pt-2.5'>{description}</p>
    </div>
  )
}

export default PageHeader