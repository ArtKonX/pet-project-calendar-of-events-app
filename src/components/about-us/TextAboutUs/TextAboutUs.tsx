const TextAboutUs = ({ text }: { text: string }) => {

    if (!text) return null

    return (
        <p className="font-bold mb-8 text-xl text-start">{text}</p>
    )
}

export default TextAboutUs