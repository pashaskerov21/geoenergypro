'use client'
import React, { Fragment } from 'react'
import { LocaleType, PageTitleDataType } from '../types/general/type'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa6'

type PageHeadingProps = {
    activeLocale: LocaleType,
    pageTitleData: PageTitleDataType,
    dictionary: { [key: string]: string },
}

const PageHeading: React.FC<PageHeadingProps> = ({ activeLocale, pageTitleData, dictionary }) => {
    return (
        <div className='page_heading'>
            <div className="container">
                <div className="heading_inner">
                    <div className="breadcrumbs">
                        <Link href={`/${activeLocale}`}>{dictionary['home']}</Link>
                        {
                            pageTitleData.breadcrumbs.map((data) => (
                                <Fragment key={data.id}>
                                    <FaArrowRight />
                                    <Link href={data.url}>{data.title}</Link>
                                </Fragment>
                            ))
                        }
                    </div>
                    <h1 className="page_title">{pageTitleData.title}</h1>
                </div>
            </div>
        </div>
    )
}

export default React.memo(PageHeading)
