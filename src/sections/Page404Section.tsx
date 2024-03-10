'use client'
import React from 'react'
import { LocaleType } from '../types/general/type'
import { SearchForm } from '../components'

type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const Page404Section: React.FC<SectionProps> = ({ activeLocale, dictionary }) => {
    return (
        <section className='section_404' style={{ backgroundImage: 'url("/bg/image-1.jpg")' }}>
            <div className="bg_layer"></div>
            <div className="container">
                <div className="section_content">
                    <h1 className='content_title'>404 • {dictionary['page_not_found']}</h1>
                    <div className="content_text">
                        <p>{dictionary['page_not_found_text_1']}</p>
                        <p>{dictionary['page_not_found_text_2']}</p>
                    </div>
                    <SearchForm activeLocale={activeLocale} dictionary={dictionary} />
                </div>
            </div>
        </section>
    )
}

export default React.memo(Page404Section)
