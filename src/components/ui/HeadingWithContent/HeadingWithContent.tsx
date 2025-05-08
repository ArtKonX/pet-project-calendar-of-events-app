import { HeadingWithContentProps } from "@src/interfaces/ui/heading-with-content";

const HeadingWithContent = (
    { ...props }:
        HeadingWithContentProps) => {

    const { titleHeading, children } = props;

    return (
        <section className="flex flex-col my-14">
            <h2 className="mb-14 text-black text-4xl font-bold dark:text-white">{titleHeading}</h2>
            {children}
        </section>
    )
}

export default HeadingWithContent