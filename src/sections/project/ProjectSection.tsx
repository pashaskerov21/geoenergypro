'use client'
import { Project, ProjectCategory } from '@/src/class'
import { ProjectCategoryDataType, ProjectCategoryTranslateDataType, ProjectDataType, ProjectTranslateDataType } from '@/src/types/data/type'
import { LocaleType } from '@/src/types/general/type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { FaAddressBook, FaArrowRight, FaClock, FaFolderOpen, FaLocationDot } from "react-icons/fa6";


type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    dataState: {
        activeCategory: ProjectCategoryDataType,
        activeCategoryTranslate: ProjectCategoryTranslateDataType,
        category: ProjectCategoryDataType[],
        categoryTranslate: ProjectCategoryTranslateDataType[],
        project: ProjectDataType[],
        projectTranslate: ProjectTranslateDataType[],
    }
}

const ProjectSection: React.FC<SectionProps> = ({ activeLocale, dictionary, dataState }) => {
    const baseURL = process.env.BASE_URL;
    const project = new Project();
    const projectCategory = new ProjectCategory();
    return (
        <section className="projects_section">
            <div className="container">
                {
                    dataState.category.length > 0 && (
                        <div className="categories_wrapper">
                            <Link href={`/${activeLocale}/projects`} className={`category_link ${dataState.activeCategory.id === undefined ? 'active' : ''}`}>{dictionary['all']}</Link>
                            {dataState.category.map((data) => (
                                <Link key={data.id} href={`/${activeLocale}/projects/category/${projectCategory.getTranslate({
                                    id: data.id,
                                    activeLocale,
                                    key: "slug",
                                    translateData: dataState.categoryTranslate
                                })}`} className={`category_link ${dataState.activeCategory.id === data.id ? 'active' : ''}`}>
                                    {
                                        projectCategory.getTranslate({
                                            id: data.id,
                                            activeLocale,
                                            key: "title",
                                            translateData: dataState.categoryTranslate
                                        })
                                    }
                                </Link>
                            ))}
                        </div>
                    )
                }
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 992: 2 }}>
                    <Masonry gutter='40px' columnsCount={2}>
                        {
                            dataState.project.map((data) => (
                                <div key={data.id} className='project_card'>
                                    <div className="project_image">
                                        {
                                            data.image ?
                                                <Image src={baseURL + data.image} width={1000} height={1000} alt='' /> :
                                                <Image src='/bg/image-2.jpg' width={1000} height={1000} alt='' />
                                        }
                                        {
                                            data.cat_id !== 0 && (
                                                <Link href={`/${activeLocale}/projects/category/${projectCategory.getTranslate({
                                                    id: data.cat_id,
                                                    activeLocale,
                                                    key: "slug",
                                                    translateData: dataState.categoryTranslate
                                                })}`} className="category_badge">
                                                    {projectCategory.getTranslate({
                                                        id: data.cat_id,
                                                        activeLocale,
                                                        key: "title",
                                                        translateData: dataState.categoryTranslate,
                                                    })}
                                                </Link>
                                            )
                                        }
                                    </div>
                                    <div className="card_content">
                                        <h3 className="project_title">
                                            <Link href={`/${activeLocale}/projects/${project.getTranslate({
                                                id: data.id,
                                                activeLocale,
                                                key: "slug",
                                                translateData: dataState.projectTranslate,
                                            })}`}>
                                                {
                                                    project.getTranslate(({
                                                        id: data.id,
                                                        activeLocale,
                                                        key: "title",
                                                        translateData: dataState.projectTranslate
                                                    }))
                                                }
                                            </Link>
                                        </h3>
                                        <div className="project_text"
                                            dangerouslySetInnerHTML={{
                                                __html: project.getTranslate({
                                                    id: data.id,
                                                    activeLocale,
                                                    key: "text",
                                                    translateData: dataState.projectTranslate
                                                }).length > 250 ? project.getTranslate({
                                                    id: data.id,
                                                    activeLocale,
                                                    key: "text",
                                                    translateData: dataState.projectTranslate
                                                }).slice(0, 250) + '...' : project.getTranslate({
                                                    id: data.id,
                                                    activeLocale,
                                                    key: "text",
                                                    translateData: dataState.projectTranslate
                                                })
                                            }}
                                        />
                                        <div className="project_parameters">
                                            <div className="param_col">
                                                <div className="param_icon">
                                                    <FaAddressBook />
                                                </div>
                                                <div className="param_content">
                                                    <h6 className="param_title">{dictionary['client']}</h6>
                                                    <div className='param_value'>
                                                        {project.getTranslate({
                                                            id: data.id,
                                                            activeLocale,
                                                            key: "client",
                                                            translateData: dataState.projectTranslate
                                                        })}
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
                                                        {project.getTranslate({
                                                            id: data.id,
                                                            activeLocale,
                                                            key: "delivery_date",
                                                            translateData: dataState.projectTranslate
                                                        })}
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
                                                        {project.getTranslate({
                                                            id: data.id,
                                                            activeLocale,
                                                            key: "project_type",
                                                            translateData: dataState.projectTranslate
                                                        })}
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
                                                        {project.getTranslate({
                                                            id: data.id,
                                                            activeLocale,
                                                            key: "location",
                                                            translateData: dataState.projectTranslate
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Link className='detail_button' href={`/${activeLocale}/projects/${project.getTranslate({
                                            id: data.id,
                                            activeLocale,
                                            key: "slug",
                                            translateData: dataState.projectTranslate,
                                        })}`}>
                                            {dictionary['more_info']} <FaArrowRight />
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </section>
    )
}

export default React.memo(ProjectSection)
