import TextAboutUs from '../TextAboutUs/TextAboutUs';

const ListAboutUs = ({ dataAboutUsList }: {dataAboutUsList: string[]}) => {

    if (!dataAboutUsList) return null
    if (dataAboutUsList.length === 0) return null

    return (
        <ul className='lg:ml-20 my-10 text-start xs:ml-0'>
            {dataAboutUsList.map((text, indx) => (
                <li key={indx} className='mb-5 text-xl list-disc'>
                    <TextAboutUs text={text} />
                </li>
            ))}
        </ul>
    )
}

export default ListAboutUs