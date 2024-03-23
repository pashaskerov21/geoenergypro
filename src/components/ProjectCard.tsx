'use client'
import React, { Fragment } from 'react'
import { LocaleType } from '../types/general/type'
import { ProjectCategoryTranslateDataType, ProjectDataType, ProjectTranslateDataType } from '../types/data/type'
import Image from 'next/image'
import { Project, ProjectCategory } from '../class'
import Link from 'next/link'
import { FaAddressBook, FaArrowRight, FaClock, FaFolderOpen, FaLocationDot } from 'react-icons/fa6'

type CardProps = {
    dictionary: { [key: string]: string },
    activeLocale: LocaleType,
    data: ProjectDataType,
    translateData: ProjectTranslateDataType[],
    categoryTranslateData: ProjectCategoryTranslateDataType[],
    searchKeyword?: string,
}

const Title: React.FC<{ title: string, searchKeyword?: string }> = ({ searchKeyword, title }) => {
    if (searchKeyword) {
        const regex = new RegExp(`(${searchKeyword})`, 'gi');
        const parts = title.split(regex);
        return (
            <Fragment>
                {parts.map((part, index) =>
                    regex.test(part) ? (
                        <span key={index} className='search_query'>
                            {part}
                        </span>
                    ) : (
                        <Fragment key={index}>{part}</Fragment>
                    )
                )}
            </Fragment>
        )
    } else {
        return (
            <Fragment>{title}</Fragment>
        )
    }
}

const ProjectCard: React.FC<CardProps> = ({ activeLocale, data, translateData, categoryTranslateData, dictionary, searchKeyword }) => {
    const baseURL = process.env.BASE_URL;
    const project = new Project();
    const projectCategory = new ProjectCategory();
    return (
        <div key={data.id} className='project_card'>
            <div className="project_image">
                {
                    data.image ?
                        <Image src={baseURL + data.image} width={1000} height={1000} alt='' priority={true} /> :
                        <Image src='/bg/image-2.jpg' width={1000} height={1000} alt='' priority={true} />
                }
                {
                    data.cat_id !== 0 && (
                        <Link href={`/${activeLocale}/projects/category/${projectCategory.getTranslate({
                            id: data.cat_id,
                            activeLocale,
                            key: "slug",
                            translateData: categoryTranslateData
                        })}`} className="category_badge">
                            {projectCategory.getTranslate({
                                id: data.cat_id,
                                activeLocale,
                                key: "title",
                                translateData: categoryTranslateData,
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
                        translateData: translateData,
                    })}`}>
                        <Title
                            title={project.getTranslate(({
                                id: data.id,
                                activeLocale,
                                key: "title",
                                translateData: translateData
                            }))}
                            searchKeyword={searchKeyword}
                        />
                    </Link>
                </h3>
                <div className="project_text"
                    dangerouslySetInnerHTML={{
                        __html: project.getTranslate({
                            id: data.id,
                            activeLocale,
                            key: "text",
                            translateData: translateData
                        }).length > 250 ? project.getTranslate({
                            id: data.id,
                            activeLocale,
                            key: "text",
                            translateData: translateData
                        }).slice(0, 250) + '...' : project.getTranslate({
                            id: data.id,
                            activeLocale,
                            key: "text",
                            translateData: translateData
                        })
                    }}
                ></div>
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
                                    translateData: translateData
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
                                    translateData: translateData
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
                                    translateData: translateData
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
                                    translateData: translateData
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <Link className='detail_button' href={`/${activeLocale}/projects/${project.getTranslate({
                    id: data.id,
                    activeLocale,
                    key: "slug",
                    translateData: translateData,
                })}`}>
                    {dictionary['more_info']} <FaArrowRight />
                </Link>
            </div>
        </div>
    )
}

export default React.memo(ProjectCard)
