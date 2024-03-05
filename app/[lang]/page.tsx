import { getTranslate } from "@/get-translate";
import { HomeLayout } from "@/src/layout";
import { LocaleType } from "@/src/types/general/type";
import { Suspense } from "react";

export default async function IndexPage({ params: { lang } }: { params: { lang: LocaleType } }) {
  try {
    const dictionary = await getTranslate(lang);
    return (
      <>
        <Suspense fallback={<div>home loading...</div>}>
          <HomeLayout activeLocale={lang} dictionary={dictionary} />
        </Suspense>
      </>
    )
  } catch (error) {
    console.log(error)
  }
  return (
    <></>
  )
}
