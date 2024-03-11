'use client'
import { Project, ProjectCategory } from '@/src/class'
import { ProjectCard } from '@/src/components'
import { ProjectCategoryDataType, ProjectCategoryTranslateDataType, ProjectDataType, ProjectTranslateDataType } from '@/src/types/data/type'
import { LocaleType } from '@/src/types/general/type'
import Link from 'next/link'
import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';


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
                                <ProjectCard
                                    activeLocale={activeLocale}
                                    categoryTranslateData={dataState.categoryTranslate}
                                    data={data}
                                    dictionary={dictionary}
                                    translateData={dataState.projectTranslate}
                                    key={data.id}
                                />
                            ))
                        }
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </section>
    )
}

export default React.memo(ProjectSection)
