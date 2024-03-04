import React from 'react'
import { getTranslate } from '@/get-translate';
import { Menu, Settings } from '@/src/class';
import { LocaleType } from '@/src/types/general/type'
import { Metadata } from 'next';
import { GalleryLayout } from '@/src/layout';
import { revalidatePath } from 'next/cache';

const baseURL = process.env.BASE_URL;
const menu = new Menu();
const setting = new Settings();
const pageSlug = 'gallery';

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
    try {
        const dictionary = await getTranslate(lang);
        const menuMetaParams = await menu.getMetaParams(lang, pageSlug);
        const settingMetaParams = await setting.getMetaParams(lang);

        let meta_title = '';
        let meta_description = '';
        let meta_keywords = '';
        if (menuMetaParams && settingMetaParams) {
            meta_title = menuMetaParams.title === '' ? settingMetaParams.title : menuMetaParams.title;
            meta_description = menuMetaParams.description === '' ? settingMetaParams.description : `${settingMetaParams.description} ${menuMetaParams.description}`;
            meta_keywords = menuMetaParams.keywords === '' ? settingMetaParams.keywords : `${settingMetaParams.keywords} , ${menuMetaParams.keywords}`;
        } else {
            meta_title = dictionary['site_name'];
            meta_description = dictionary['site_name'];
            meta_keywords = dictionary['site_name'];
        }
        return {
            metadataBase: new URL(`${baseURL}`),
            title: meta_title,
            description: meta_description,
            keywords: meta_keywords,
            openGraph: {
                title: meta_title,
                description: meta_description,
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

const Gallery = async ({ params: { lang } }: { params: { lang: LocaleType } }) => {
    try {
        // revalidatePath(`/${lang}/${pageSlug}`, 'page');
        const dictionary = await getTranslate(lang);
        return (
            <>
                <GalleryLayout
                    activeLocale={lang}
                    dictionary={dictionary}
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

export default Gallery
