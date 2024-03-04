import { LocaleType } from '@/src/types/general/type'
import { redirect } from 'next/navigation'
import React from 'react'

const ProjectCategoryPath = ({ params: { lang } }: { params: { lang: LocaleType } }) => {
  redirect(`/${lang}/projects`);
}

export default ProjectCategoryPath
