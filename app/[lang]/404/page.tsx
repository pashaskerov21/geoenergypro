import React from 'react'
import { getTranslate } from '@/get-translate';
import { LocaleType } from '@/src/types/general/type'
import { Metadata } from 'next';
import { Page404Layout } from '@/src/layout';


export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
  try {
    const dictionary = await getTranslate(lang);
    const title = `${dictionary['page_not_found']} | ${dictionary['site_name']}`
    return {
      title: title
    };
  } catch (error) {
    console.log(error)
    return {
      title: 'Geo Energy Pro'
    };
  }
}

const Page404 = async ({ params: { lang } }: { params: { lang: LocaleType } }) => {
  try {
    const dictionary = await getTranslate(lang);
    return (
      <Page404Layout
        activeLocale={lang}
        dictionary={dictionary}
      />
    )
  } catch (error) {
    console.log(error);
    return (
      <></>
    )
  }
}

export default Page404
