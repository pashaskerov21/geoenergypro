'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { Menu, ProjectCategory, Service, Settings } from '@/src/class';
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
import { LocaleStateType, LocaleType, ReduxRootStateType } from '@/src/types/general/type';
import { FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { FaCaretDown } from "react-icons/fa";
import MobileMenu from './MobileMenu';
import { usePathname } from 'next/navigation';

type HeaderProps = {
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
    }
}

const Header: React.FC<HeaderProps> = ({
    activeLocale,
    dataState,
    dictionary,
}) => {
    const pathName = usePathname();
    const baseURL = process.env.BASE_URL;
    const setting = new Settings();
    const menu = new Menu();
    const service = new Service();
    const projectCategory = new ProjectCategory();

    const localeStateData: LocaleStateType[] = useSelector((state: ReduxRootStateType) => state.localeState)
    const [menuShow, setMenuShow] = useState<boolean>(false);
    const toggleMenu = useCallback(() => {
        setMenuShow(prev => !prev);
    }, [setMenuShow]);

    useEffect(() => {
        setMenuShow(false);
    }, [pathName]);
    return (
        <header>
            <nav className='top_nav d-none d-xl-block'>
                <div className="container">
                    <div className="inner">
                        <div className="inner_left">
                            <div className="contact_link">
                                <i><FaLocationDot /></i>
                                <span>
                                    {setting.getTranslate({
                                        id: 1,
                                        activeLocale,
                                        key: "address_text",
                                        translateData: dataState.settingTranslate,
                                    })}
                                </span>
                            </div>
                        </div>
                        <div className="inner_right">
                            <div className="contact_link">
                                <i><FaPhone /></i>
                                <span>{dataState.setting.phone}</span>
                            </div>
                            <div className="contact_link">
                                <i><FaEnvelope /></i>
                                <span>{dataState.setting.mail}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <nav className='mobile_nav d-xl-none'>
                <div className="container">
                    <div className="inner">
                        <div className="inner_left">
                            {dataState.setting.logo_white && dataState.setting.logo_white !== null && (
                                <Link href={`/${activeLocale}`} className='logo'>
                                    <Image src={baseURL + dataState.setting.logo_white} width={105} height={70} alt='' />
                                </Link>
                            )}
                        </div>
                        <div className="inner_right">
                            <button className={`menu_button ${menuShow ? 'active' : ''}`} type="button" onClick={toggleMenu}>
                                <div className="menu_button_icon">
                                    <div className="icon_line"></div>
                                    <div className="icon_line"></div>
                                    <div className="icon_line"></div>
                                </div>
                                <div className="menu_button_label">Menu</div>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <nav className='general_nav d-none d-xl-block'>
                <div className="container">
                    <div className="inner">
                        <div className="inner_left">
                            {dataState.setting.logo && dataState.setting.logo !== null && (
                                <Link href={`/${activeLocale}`} className='logo'>
                                    <Image src={baseURL + dataState.setting.logo} width={205} height={125} alt='' />
                                </Link>
                            )}
                            <div className="nav_links">
                                {
                                    dataState.menu.map((data) => (
                                        <div className={`link_item ${data.id === 3 || data.id === 4 ? 'has_child' : 'no_child'}`} key={data.id}>
                                            <div className="main_row">
                                                <Link href={`/${activeLocale}/${data.slug}`}>
                                                    {menu.getTranslate({
                                                        id: data.id,
                                                        activeLocale,
                                                        key: "title",
                                                        translateData: dataState.menuTranslate
                                                    })}
                                                </Link>
                                                <button type="button"><i><FaCaretDown /></i></button>
                                            </div>
                                            {
                                                data.id === 3 && (
                                                    <div className="link_menu">
                                                        <div className="link_menu_inner">
                                                            {
                                                                dataState.service.map((s_data) => (
                                                                    <div className="link_item no_child" key={s_data.id}>
                                                                        <div className="main_row">
                                                                            <div>
                                                                                <Link href={`/${activeLocale}/services/${service.getTranslate({
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
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            {
                                                data.id === 4 && (
                                                    <div className="link_menu">
                                                        <div className="link_menu_inner">
                                                            {
                                                                dataState.projectCategory.map((pc_data) => (
                                                                    <div className="link_item no_child" key={pc_data.id}>
                                                                        <div className="main_row">
                                                                            <Link href={`/${activeLocale}/projects?category=${projectCategory.getTranslate({
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
                        </div>
                        <div className="inner_right">
                            <div className="langugages">
                                {
                                    localeStateData.map((data) => (
                                        <Link key={data.locale} href={`/${data.locale}/${data.slug}`} locale={data.locale} className={activeLocale === data.locale ? 'active' : ''}>{data.locale}</Link>
                                    ))
                                }
                            </div>
                            <Link href={`/${activeLocale}/contact`} className="contact_link">
                                <div className="link_title">{dictionary['order_survey']}</div>
                                <div className="link_sub_title">{dictionary['let_talk_about_projects']}</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            {menuShow && <MobileMenu activeLocale={activeLocale} dataState={dataState} localeStateData={localeStateData} dictionary={dictionary} />}
        </header>
    )
}

export default React.memo(Header)
