import Copyright from "./Copyright/Copyright"

export const Footer = () => {

    return (
        <div className="mt-auto">
            <div className="bg-blue-500 dark:bg-blue-700 w-full p-3 px-10 rounded-2xl mb-4">
                <Copyright text="ArtKonX © 2025" />
            </div>
        </div>
    )
}