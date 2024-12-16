import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const Dashbord = () => {
  return (
    <div className='gap-6 grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-20' >
      <Card>
          <CardHeader>
             <CardTitle>Total sels</CardTitle>
          </CardHeader>
      </Card>
    </div>
  )
}

export default Dashbord
