"use client"
import React from 'react'
import { Button } from '@/components/ui/button';   
import EmptyState from './_components/EmptyState';
import Link from 'next/dist/client/link';

function Dashboard(){
   const [videoList,setVideoList] = React.useState<Array<any>>([])
   return(
    <div className='p-4'>
      <div className='flex justify-between items-center'>
         <h2 className='font-bold text-2xl text-primary'>Dashboard</h2>
         <Link href={'/dashboard/create-new'}><Button>+ Create New</Button></Link>
      </div>

      {/* video list */}
      <div className='p-2'>
      {videoList?.length === 0&&<div><EmptyState/></div>
}
</div>
    </div>
   )
}

export default Dashboard