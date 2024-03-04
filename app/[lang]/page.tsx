import { getTranslate } from "@/get-translate";
import { HomeLayout } from "@/src/layout";
import { LocaleType } from "@/src/types/general/type";
import { revalidatePath } from "next/cache";

export default async function IndexPage({ params: { lang } }: { params: { lang: LocaleType } }) {
  try {
    const dictionary = await getTranslate(lang);
    revalidatePath(`/${lang}`, 'page');
    return (
      <>
        <HomeLayout activeLocale={lang} dictionary={dictionary} />
      </>
    )
  } catch (error) {
    console.log(error)
  }
  return (
    <></>
  )
}
