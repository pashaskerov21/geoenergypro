'use client'
import React, { useEffect, useState } from 'react'
import { LocaleStateType, LocaleType, PageTitleDataType } from '../types/general/type'
import { i18n } from '@/i18n-config'
import { PageHeading } from '../components'
import { useDispatch } from 'react-redux'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'
import { useRouter } from 'next/navigation'
import axios from 'axios'


type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const SearchPageLayout: React.FC<LayoutProps> = ({ activeLocale, dictionary }) => {
    const dispatch = useDispatch();
    const slug = 'search';
    const [layoutParams, setLayoutParams] = useState<{
        searchQuery: string | null,
        pageTitleData: PageTitleDataType,
        localeSlugs: LocaleStateType[],
    }>({
        searchQuery: null,
        pageTitleData: {
            title: dictionary['search'],
            breadcrumbs: [
                {
                    id: 1,
                    url: `/${activeLocale}`,
                    title: dictionary['search'],
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




    const baseURL = process.env.BASE_URL;
    const router = useRouter();
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('query');

    useEffect(() => {
        if (queryParam) {
            setLayoutParams(prev => ({
                ...prev,
                searchQuery: queryParam,
                localeSlugs: i18n.locales.map((locale) => {
                    return {
                        locale: locale,
                        slug: `${slug}?query=${queryParam}`,
                    }
                })
            }))
        }
    }, [queryParam]);

    useEffect(() => {
        const searchRequest = async (query: string) => {
            const data = {
                lang: activeLocale,
                query: query,
            }
            const response = await axios.post(`${baseURL}/api/site/search`, {
                data: data,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            console.log(response);
        }

        if(layoutParams.searchQuery !== null){
            searchRequest(layoutParams.searchQuery);
            console.log(layoutParams.searchQuery)
        }
    }, [layoutParams.searchQuery])

    React.useEffect(() => {
        dispatch(updateLocaleSlug(layoutParams.localeSlugs))
    }, [dispatch, layoutParams.localeSlugs]);


    return (
        <>
            <PageHeading
                activeLocale={activeLocale}
                dictionary={dictionary}
                pageTitleData={layoutParams.pageTitleData}
            />
            {layoutParams.searchQuery}
        </>
    )
}

export default React.memo(SearchPageLayout)
