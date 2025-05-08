import LabelWrapperProps from "@src/interfaces/ui/label-wrapper";

const LabelWrapper = ({ ...props }: LabelWrapperProps) => {
    const { text, children } = props;

    return (
        <label className="flex flex-col mb-10 font-bold text-2xl">
            {text}
            {children}
        </label>
    )
}

export default LabelWrapper