import { getTranslate } from "@/get-translate";
import { HomeLayout } from "@/src/layout";
import { LocaleType } from "@/src/types/general/type";

export default async function IndexPage({ params: { lang } }: { params: { lang: LocaleType } }) {
  try {
    const dictionary = await getTranslate(lang);
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
