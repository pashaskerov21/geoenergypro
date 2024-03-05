'use client'
import React, { useEffect, useState } from 'react'
import { LocaleStateType, LocaleType, PageTitleDataType } from '../types/general/type'
import { Menu } from '../class'
import { i18n } from '@/i18n-config'
import { PageHeading, Preloader } from '../components'
import { useDispatch } from 'react-redux'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'

type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const AboutLayout: React.FC<LayoutProps> = ({ activeLocale, dictionary }) => {
    const dispatch = useDispatch();
    const menu = new Menu();
    const slug = 'about';
    const [layoutParams, setLayoutParams] = useState<{
        pageTitleData: PageTitleDataType,
        localeSlugs: LocaleStateType[],
    }>({
        pageTitleData: {
            title: "",
            breadcrumbs: [
                {
                    id: 1,
                    url: `/${activeLocale}`,
                    title: '',
                }
            ]
        },
        localeSlugs: i18n.locales.map((locale) => {
            return {
                locale: locale,
                slug: slug
            }
        }),
    });

    useEffect(() => {
        const getParams = async () => {
            const titleData = await menu.getPageTitleData(slug, activeLocale);
            setLayoutParams(prev => ({
                ...prev,
                pageTitleData: titleData,
            }))
        }

        getParams();
    }, []);

    React.useEffect(() => {
        dispatch(updateLocaleSlug(layoutParams.localeSlugs))
    }, [dispatch]);

    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        if (layoutParams.pageTitleData.breadcrumbs.length > 1) {
            setLoading(false);
        }
    }, [layoutParams.pageTitleData.breadcrumbs])
    return (
        <>
            {loading && <Preloader />}
            <PageHeading
                activeLocale={activeLocale}
                dictionary={dictionary}
                pageTitleData={layoutParams.pageTitleData}
            />
        </>
    )
}

export default React.memo(AboutLayout)
