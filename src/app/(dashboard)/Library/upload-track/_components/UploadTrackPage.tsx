import React from 'react'
import UploadTrackForm from './UploadTrackForm'
import UploadTrackList from './UploadTrackList'

function UploadTrackPage() {
  return (
    <>
      <div>
        <UploadTrackForm />
      </div>
      <div className='mt-10'>
        <UploadTrackList />
      </div>
    </>
  )
}

export default UploadTrackPage