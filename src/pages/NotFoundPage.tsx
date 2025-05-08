import Layout from "@src/components/Layout/Layout"
import HeadingWithContent from "@src/components/ui/HeadingWithContent/HeadingWithContent"

import headers from '@data/headers/headers.json';
import notFoundData from '@data/not-found/not-found-data.json';

import { useSelector } from "@src/hooks/useTypedSelector";
import { selectLangsData } from "@src/selectors/selectors";

const NotFoundPage = () => {

    const langsData = useSelector(selectLangsData);

    return (
        <Layout>
            <HeadingWithContent titleHeading={`${headers[langsData.lang].headers.notFound}`}>
                <div className='p-8 bg-blue-200/50 border-3 border-dashed border-blue-800 rounded-2xl'>
                    <p className="text-red-700 dark:text-red-100 text-3xl">
                        {notFoundData[langsData.lang]}
                    </p>
                </div>
            </HeadingWithContent>
        </Layout>
    )
}

export default NotFoundPage