import { LocaleType } from '@/src/types/general/type'
import { redirect } from 'next/navigation'
import React from 'react'

const NewsCategoryPath = ({ params: { lang } }: { params: { lang: LocaleType } }) => {
  redirect(`/${lang}/news`);
}

export default NewsCategoryPath
