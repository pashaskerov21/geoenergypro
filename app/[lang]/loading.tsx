import React from 'react'
import { FaGear } from 'react-icons/fa6'

const RootLoading = () => {
    return (
        <div className="preloader">
            <div className="preloader_icons">
                <FaGear className='icon' />
                <FaGear className='icon' />
                <FaGear className='icon' />
                <FaGear className='icon' />
            </div>
        </div>
    )
}

export default RootLoading
