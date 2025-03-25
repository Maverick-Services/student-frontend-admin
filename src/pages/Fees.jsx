import React from 'react'
import LayoutProvider from '../components/common/LayoutProvider'
import FeesList from '../components/core/dashboard/fees/FeesList'
import { useState } from 'react'
import FeeDetails from '../components/core/dashboard/fees/FeeDetails';

function Fees() {

    const [currentFeeDetails, setCurrentFeeDetails] = useState(null);

  return (
    <LayoutProvider heading={"Fees Management"}>
        {
            !currentFeeDetails &&
            <FeesList setCurrentFeeDetails={setCurrentFeeDetails}/>
        }
        {
            currentFeeDetails &&
            <FeeDetails feeDetails={currentFeeDetails} 
                setCurrentFeeDetails={setCurrentFeeDetails}/>
        }
    </LayoutProvider>
  )
}

export default Fees