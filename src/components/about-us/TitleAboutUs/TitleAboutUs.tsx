const TitleAboutUs = ({ text }: { text: string }) => {

    if (!text) return null

    return (
        <h3 className="font-bold text-2xl my-8">
            {text}
        </h3>
    )
}

export default TitleAboutUs