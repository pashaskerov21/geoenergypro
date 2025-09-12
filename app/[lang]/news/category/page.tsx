import { LocaleType } from '@/src/types/general/type'
import { redirect } from 'next/navigation'

const NewsCategoryPath = ({ params: { lang } }: { params: { lang: LocaleType } }) => {
  redirect(`/${lang}/news`);
}

export default NewsCategoryPath
