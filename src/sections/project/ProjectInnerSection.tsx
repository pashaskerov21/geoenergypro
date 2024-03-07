'use client'
import { ProjectDataType, ProjectGalleryDataType, ProjectTranslateDataType } from '@/src/types/data/type'
import { LocaleType } from '@/src/types/general/type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaThLarge } from 'react-icons/fa'
import { FaAddressBook, FaArrowLeftLong, FaArrowRightLong, FaClock, FaFolderOpen, FaLocationDot } from 'react-icons/fa6'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    dataState: {
        activeProject: ProjectDataType,
        activeProjectTranslate: ProjectTranslateDataType,
        activeProjectGallery: ProjectGalleryDataType[],
        project: ProjectDataType[],
        projectTranslate: ProjectTranslateDataType[],
    },
    navigationState: {
        index: number,
        prevUrl: string | null,
        nextUrl: string | null,
        backUrl: string | null,
    }
}

const ProjectInnerSection: React.FC<SectionProps> = ({ activeLocale, dataState, dictionary, navigationState }) => {
    const baseURL = process.env.BASE_URL;
    return (
        <section className="project_inner_section">
            <div className="container">
                <div className="project_row">
                    <div className="project_col left_col">
                        <div className="project_parameters">
                            <div className="param_col">
                                <div className="param_icon">
                                    <FaAddressBook />
                                </div>
                                <div className="param_content">
                                    <h6 className="param_title">{dictionary['client']}</h6>
                                    <div className='param_value'>
                                        {dataState.activeProjectTranslate.client}
                                    </div>
                                </div>
                            </div>
                            <div className="param_col">
                                <div className="param_icon">
                                    <FaClock />
                                </div>
                                <div className="param_content">
                                    <h6 className="param_title">{dictionary['delivery']}</h6>
                                    <div className='param_value'>
                                        {dataState.activeProjectTranslate.delivery_date}
                                    </div>
                                </div>
                            </div>
                            <div className="param_col">
                                <div className="param_icon">
                                    <FaFolderOpen />
                                </div>
                                <div className="param_content">
                                    <h6 className="param_title">{dictionary['project_type']}</h6>
                                    <div className='param_value'>
                                        {dataState.activeProjectTranslate.project_type}
                                    </div>
                                </div>
                            </div>
                            <div className="param_col">
                                <div className="param_icon">
                                    <FaLocationDot />
                                </div>
                                <div className="param_content">
                                    <h6 className="param_title">{dictionary['location']}</h6>
                                    <div className='param_value'>
                                        {dataState.activeProjectTranslate.location}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="project_col right_col">
                        <div className="project_content">
                            <div className="project_text"
                                dangerouslySetInnerHTML={{ __html: dataState.activeProjectTranslate.text ?? '' }}
                            />
                            {
                                dataState.activeProjectGallery.length > 0 && (
                                    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 992: 2, }}>
                                        <Masonry gutter='10px' columnsCount={2}>
                                            {
                                                dataState.activeProjectGallery.map((data) => (
                                                    data.image && (
                                                        <Link key={data.id} href={baseURL + data.image} className="gallery_image" data-fancybox=''>
                                                            <Image src={baseURL + data.image} width={1000} height={1000} alt='' priority={true} />
                                                        </Link>
                                                    )
                                                ))
                                            }
                                        </Masonry>
                                    </ResponsiveMasonry>
                                )
                            }
                            <div className="page_navigation_buttons">
                                {
                                    navigationState.prevUrl && <Link className='navigation_button prev' href={navigationState.prevUrl}><FaArrowLeftLong/> {dictionary['prev']}</Link>
                                }
                                {
                                    navigationState.backUrl && <Link className='navigation_button back' href={navigationState.backUrl}><FaThLarge/> {dictionary['back']}</Link>
                                }
                                {
                                    navigationState.nextUrl && <Link className='navigation_button next' href={navigationState.nextUrl}>{dictionary['next']} <FaArrowRightLong/></Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default React.memo(ProjectInnerSection)
