'use client'
import React, { useCallback, useState } from 'react'
import {
    MenuDataType,
    MenuTranslateDataType,
    ProjectCategoryDataType,
    ProjectCategoryTranslateDataType,
    ProjectDataType,
    ProjectTranslateDataType,
    ServiceDataType,
    ServiceTranslateDataType,
    SiteSettingDataType,
    SiteSettingTranslateDataType
} from '@/src/types/data/type';
import { LocaleStateType, LocaleType } from '@/src/types/general/type';
import Link from 'next/link';
import { Menu, ProjectCategory, Service } from '@/src/class';
import { FaCaretDown } from 'react-icons/fa6';

type MobileMenuProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    dataState: {
        setting: SiteSettingDataType,
        settingTranslate: SiteSettingTranslateDataType[],
        menu: MenuDataType[],
        menuTranslate: MenuTranslateDataType[];
        service: ServiceDataType[],
        serviceTranslate: ServiceTranslateDataType[],
        projectCategory: ProjectCategoryDataType[],
        projectCategoryTranslate: ProjectCategoryTranslateDataType[],
        project: ProjectDataType[],
        projectTranslate: ProjectTranslateDataType[],
    },
    localeStateData: LocaleStateType[]
}

const MobileMenu: React.FC<MobileMenuProps> = ({ activeLocale, dataState, localeStateData, dictionary }) => {
    const menu = new Menu();
    const service = new Service();
    const projectCategory = new ProjectCategory();

    const [activeLink, setActiveLink] = useState<number>(0);
    const changeActiveLink = useCallback((id: number) => {
        setActiveLink(prev => prev === id ? 0 : id);
    }, [setActiveLink])
    return (
        <div className='mobile_menu'>
            <div className="container">
                <div className="mobile_menu_inner">
                    <div className="menu_links">
                        {
                            dataState.menu.map((data) => (
                                <div className={`link_item ${data.id === 3 || data.id === 4 ? 'has_child' : 'no_child'}`} key={data.id}>
                                    <div className="main_row">
                                        <Link href={`/${activeLocale + data.slug}`}>
                                            {menu.getTranslate({
                                                id: data.id,
                                                activeLocale,
                                                key: "title",
                                                translateData: dataState.menuTranslate
                                            })}
                                        </Link>
                                        <button type="button" onClick={() => changeActiveLink(data.id)}><i><FaCaretDown /></i></button>
                                    </div>
                                    {
                                        data.id === 3 && (
                                            <div className={`link_menu ${activeLink === 3 ? '' : 'd-none'}`}>
                                                <div className="link_menu_inner">
                                                    {
                                                        dataState.service.map((s_data) => (
                                                            <div className="link_item no_child" key={s_data.id}>
                                                                <div className="main_row">
                                                                    <Link href={`/${activeLocale}/${service.getTranslate({
                                                                        id: s_data.id,
                                                                        activeLocale,
                                                                        key: "slug",
                                                                        translateData: dataState.serviceTranslate
                                                                    })}`}>
                                                                        {service.getTranslate({
                                                                            id: s_data.id,
                                                                            activeLocale,
                                                                            key: "title",
                                                                            translateData: dataState.serviceTranslate
                                                                        })}
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }
                                    {
                                        data.id === 4 && (
                                            <div className={`link_menu ${activeLink === 4 ? '' : 'd-none'}`}>
                                                <div className="link_menu_inner">
                                                    {
                                                        dataState.projectCategory.map((pc_data) => (
                                                            <div className="link_item no_child" key={pc_data.id}>
                                                                <div className="main_row">
                                                                    <Link href={`/${activeLocale}/${projectCategory.getTranslate({
                                                                        id: pc_data.id,
                                                                        activeLocale,
                                                                        key: "slug",
                                                                        translateData: dataState.projectCategoryTranslate
                                                                    })}`}>
                                                                        {projectCategory.getTranslate({
                                                                            id: pc_data.id,
                                                                            activeLocale,
                                                                            key: "title",
                                                                            translateData: dataState.projectCategoryTranslate
                                                                        })}
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <div className="inner_bottom">
                        <Link href={`/${activeLocale}/contact`} className="contact_link">
                            <div className="link_title">{dictionary['order_survey']}</div>
                            <div className="link_sub_title">{dictionary['let_talk_about_projects']}</div>
                        </Link>
                        <div className="langugages">
                            {
                                localeStateData.map((data) => (
                                    <Link key={data.locale} href={`/${data.locale}/${data.slug}`} locale={data.locale} className={activeLocale === data.locale ? 'active' : ''}>{data.locale}</Link>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(MobileMenu)
