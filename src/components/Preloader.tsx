import React from 'react'
import { FaGear } from 'react-icons/fa6'

const Preloader:React.FC = () => {
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

export default React.memo(Preloader)
