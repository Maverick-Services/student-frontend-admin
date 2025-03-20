import React, { useEffect, useState } from 'react'
import { Chart , registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2'

Chart.register(...registerables);

export const ChartComponent = ({data}) => {

    const option = {
        maintainAspectRatio:false
    }
    
return (
    <div className='min-h-[300px] w-full bg-white p-2 pb-6 shadow-sm rounded-sm'>
        <Pie
            className='w-fit'
            data={data}
            options={option}
        />
    </div>
  )
}
