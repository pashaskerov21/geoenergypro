'use client'
import Link from 'next/link'
import React from 'react'
import { FaThLarge } from 'react-icons/fa'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'

type PageNavigationProps = {
    dictionary: { [key: string]: string },
    navigationState: {
        index: number,
        prevUrl: string | null,
        nextUrl: string | null,
        backUrl: string | null,
    }
}

const PageNavigation: React.FC<PageNavigationProps> = ({ dictionary, navigationState }) => {
    return (
        <div className="page_navigation_buttons">
            {
                navigationState.prevUrl && <Link className='navigation_button prev' href={navigationState.prevUrl}><FaArrowLeftLong /> {dictionary['prev']}</Link>
            }
            {
                navigationState.backUrl && <Link className='navigation_button back' href={navigationState.backUrl}><FaThLarge /> {dictionary['back']}</Link>
            }
            {
                navigationState.nextUrl && <Link className='navigation_button next' href={navigationState.nextUrl}>{dictionary['next']} <FaArrowRightLong /></Link>
            }
        </div>
    )
}

export default React.memo(PageNavigation)
