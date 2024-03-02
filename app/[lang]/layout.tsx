import { getTranslate } from "@/get-translate";
import { i18n } from "@/i18n-config";
import { Settings } from "@/src/class";
import { RootLayout } from "@/src/layout";
import { SiteSettingDataType, SiteSettingTranslateDataType } from "@/src/types/data/type";
import { LocaleType } from "@/src/types/general/type";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
const baseURL = process.env.BASE_URL;
const setting = new Settings();

const getMetaParams = async (activeLocale: LocaleType): Promise<{
  title: string,
  description: string,
  keywords: string,
  author_name: string,
  author_url: string,
  favicon: string | null,
  logo: string | null,
} | undefined> => {
  const response: {
    main: SiteSettingDataType,
    translate: SiteSettingTranslateDataType[]
  } = await setting.active(1);
  let metaParams: {
    title: string,
    description: string,
    keywords: string,
    author_name: string,
    author_url: string,
    favicon: string | null,
    logo: string | null,
  } | undefined = undefined;


  if (response.main && response.translate) {
    metaParams = {
      title: setting.getTranslate({
        id: 1,
        activeLocale,
        key: "title",
        translateData: response.translate,
      }),
      description: setting.getTranslate({
        id: 1,
        activeLocale,
        key: "description",
        translateData: response.translate,
      }),
      keywords: setting.getTranslate({
        id: 1,
        activeLocale,
        key: "keywords",
        translateData: response.translate,
      }),
      author_name: setting.getTranslate({
        id: 1,
        activeLocale,
        key: "author",
        translateData: response.translate,
      }),
      author_url: response.main.author_url || '',
      favicon: response.main.favicon !== null ? baseURL + response.main.favicon : null,
      logo: response.main.logo !== null ? baseURL + response.main.logo : null,
    }
  }

  return metaParams;
}

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
  try {
    const dictionary = await getTranslate(lang);
    const metaParams = await getMetaParams(lang);
    if (metaParams) {
      return {
        metadataBase: new URL(`${baseURL}`),
        title: metaParams.title === '' ? dictionary['site_name'] : metaParams.title,
        description: metaParams.description === '' ? dictionary['site_name'] : metaParams.description,
        keywords: metaParams.keywords === '' ? dictionary['site_name'] : metaParams.keywords,
        authors: {
          name: metaParams.author_name,
          url: metaParams.author_url,
        },
        icons: {
          icon: metaParams.favicon || '/logo/favicon.png',
        },
        openGraph: {
          type: "website",
          title: metaParams.title === '' ? dictionary['site_name'] : metaParams.title,
          description: metaParams.description === '' ? dictionary['site_name'] : metaParams.description,
          siteName: metaParams.title === '' ? dictionary['site_name'] : metaParams.title,
          locale: lang === 'en' ? 'en_GB' : 'ru_RU',
          alternateLocale: lang === 'en' ? 'ru_RU' : 'en_GB',
          images: [metaParams.logo || '/logo/logo.png', metaParams.favicon || '/logo/favicon.png']
        }
      };
    } else {
      return {
        title: dictionary['site_name']
      };
    }
  } catch (error) {
    console.log(error)
  }
  return {
    title: 'Geo Energy Pro'
  };
}

export default async function Root({ children, params: { lang } }: { children: React.ReactNode; params: { lang: LocaleType }; }) {
  try {
    const dictionary = await getTranslate(lang);
    
    revalidatePath(`/${lang}`, 'layout');

    return (
      <html lang={lang}>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap" />
        </head>
        <body>
          <RootLayout
            activeLocale={lang}
            dictionary={dictionary}
          >
            {children}
          </RootLayout>
        </body>
      </html>
    );
  } catch (error) {
    console.log(error)
  }
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}

