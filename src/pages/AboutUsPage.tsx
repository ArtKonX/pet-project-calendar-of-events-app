import dataAboutUsLists from '@data/about-us/data-about-us-lists.json';
import dataAboutUs from '@data/about-us/data-about-us.json';
import ListAboutUs from '@src/components/about-us/ListAboutUs/ListAboutUs';
import TextAboutUs from '@src/components/about-us/TextAboutUs/TextAboutUs';
import TitleAboutUs from '@src/components/about-us/TitleAboutUs/TitleAboutUs';
import Layout from '@src/components/Layout/Layout';
import HeadingWithContent from '@src/components/ui/HeadingWithContent/HeadingWithContent';
import { useSelector } from '@src/hooks/useTypedSelector';
import { selectLangsData } from '@src/selectors/selectors';

import headers from '@data/headers/headers.json';

import { Fragment } from "react";

export default function AboutUsPage() {

    const langsData = useSelector(selectLangsData);

    return (
        <Layout>
            <HeadingWithContent titleHeading={headers[langsData.lang].headers.about}>
                <div className='p-8 bg-blue-200/50 border-3 border-dashed border-blue-800 rounded-2xl'>
                    {[0, 1].map((indx) => (<div className='text-start mb-4' key={indx}><TitleAboutUs text={dataAboutUs[langsData.lang].text[indx].text} /></div>))}
                    {dataAboutUsLists[langsData.lang].text.map(data => (
                        <div key={data.id} className='pb-4'>
                            <TitleAboutUs text={data.title} />
                            <ListAboutUs dataAboutUsList={data.list} />
                        </div>
                    ))}
                    {[2, 3, 4].map((indx) => (
                        <Fragment key={indx}>
                            <TextAboutUs text={dataAboutUs[langsData.lang].text[indx].text} />
                        </Fragment>))}
                </div>
            </HeadingWithContent>
        </Layout >
    )
}