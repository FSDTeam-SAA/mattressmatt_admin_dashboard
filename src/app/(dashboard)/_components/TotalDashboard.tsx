import React from 'react'
import OverViewCard from './OverViewCard'
import { UserActivityChar } from './UserActivityChar'
import MostPlayedMusicList from './MostPlayedMusicList'
import RecentlyaddedMusicList from './RecentlyaddedMusicList'

function TotalDashboard() {
  return (
    <div>
        <div>
            <OverViewCard />
        </div>
        <div className='mt-10'>
            <UserActivityChar />
        </div>

        <div className='mt-10 flex items-center gap-8'>
            <MostPlayedMusicList />
            <RecentlyaddedMusicList />
        </div>
    </div>
  )
}

export default TotalDashboard