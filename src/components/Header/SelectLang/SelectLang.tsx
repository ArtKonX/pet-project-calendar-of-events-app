import { useSelector } from "@src/hooks/useTypedSelector";
import { addInLangs, addLang } from "@src/redux/slices/langsSlice";
import { selectLangsData } from "@src/selectors/selectors";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";

interface SelectLangProps {
    listLangs: string[]
}

const SelectLang = ({ listLangs }: SelectLangProps) => {

    const dispatch = useDispatch();
    const langsData = useSelector(selectLangsData);

    const onSelectLang = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;

        dispatch(addInLangs({ lang: value }));

        setTimeout(() => {
            dispatch(addLang({ lang: value }))
        }, 500)
    }

    return (
        <label className="flex lg:flex-row xs:flex-col items-center text-2xl font-bold">
            {langsData.lang === 'ru' ? 'Язык:' : 'Lang:'}
            <select value={langsData.lang} className="ml-3 h-10 uppercase w-20 lg:mt-0 xs:mt-4 focus:outline-0" onChange={onSelectLang}>
                {listLangs.map((lang, indx) => (
                    <option key={indx} value={lang}>
                        {lang}
                    </option>
                ))}
            </select>
        </label>
    )
}

export default SelectLang