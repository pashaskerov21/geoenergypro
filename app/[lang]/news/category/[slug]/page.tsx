import React from 'react'
import { getTranslate } from '@/get-translate';
import { Menu, NewsCategory, Settings } from '@/src/class';
import { LocaleType } from '@/src/types/general/type'
import { Metadata } from 'next';
import { revalidatePath } from 'next/cache';
import { ServiceDataType, ServiceTranslateDataType } from '@/src/types/data/type';
import { NewsCategoryInnerLayout } from '@/src/layout';

const baseURL = process.env.BASE_URL;
const menu = new Menu();
const setting = new Settings();
const newsCategory = new NewsCategory();
const parentSlug = 'news';

export async function generateMetadata({ params: { lang, slug } }: { params: { lang: LocaleType, slug: string } }): Promise<Metadata> {
    try {
        const dictionary = await getTranslate(lang);
        const menuMetaParams = await menu.getMetaParams(lang, parentSlug);
        const settingMetaParams = await setting.getMetaParams(lang);
        const response: {
            main: ServiceDataType,
            translate: ServiceTranslateDataType,
        } = await newsCategory.activeSlug({
            lang: lang,
            slug: slug
        });

        let meta_title = '';
        let meta_keywords = '';
        if (menuMetaParams && settingMetaParams && response.main && response.translate) {
            meta_title = `${settingMetaParams.title} | ${menuMetaParams.title} | ${response.translate.title }`;
            meta_keywords = menuMetaParams.keywords === '' ? `${settingMetaParams.keywords} , ${response.translate.title}` : `${settingMetaParams.keywords} , ${menuMetaParams.keywords} , ${response.translate.title}`;
        } else {
            meta_title = dictionary['site_name'];
            meta_keywords = dictionary['site_name'];
        }
        return {
            metadataBase: new URL(`${baseURL}`),
            title: meta_title,
            keywords: meta_keywords,
            openGraph: {
                title: meta_title,
                siteName: meta_title,
                locale: lang === 'en' ? 'en_GB' : 'ru_RU',
                alternateLocale: lang === 'en' ? 'ru_RU' : 'en_GB',
            }
        };
    } catch (error) {
        console.log(error)
    }
    return {
        title: 'Geo Energy Pro'
    };
}

const NewsCategoryInner = async ({ params: { lang, slug } }: { params: { lang: LocaleType, slug: string } }) => {
    try {
        const dictionary = await getTranslate(lang);
        return (
            <>
                <NewsCategoryInnerLayout
                    activeLocale={lang}
                    dictionary={dictionary}
                    slug={slug}
                />
            </>
        )
    } catch (error) {
        console.log(error)
    }
    return (
        <></>
    )
}

export default NewsCategoryInner
