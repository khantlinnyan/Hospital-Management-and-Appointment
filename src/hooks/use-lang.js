import { usePathname } from "next/navigation";
import React, {useState, useEffect} from "react";
import { getDictionary } from "../../getDictionary";

// const [langVar, setLangVar] = useState(null)
// const pathname = usePathname()
// const [, langType] = pathname.split('/')
// const getLang = async (langType) => {
//     const lang = await getDictionary(langType)
//     setLangVar(lang)
// }
// useEffect(() => {
//     getLang(langType)
// }, [langType])

const useLang = () => {
    const [langVar, setLangVar] = useState(null)
    const pathname = usePathname()
    const [, langType] = pathname.split('/')
    const getLang = async (langType) => {
        const lang = await getDictionary(langType)
        setLangVar(lang)
    }
    useEffect(() => {
        getLang(langType)
    }, [langType])

    return {
        langVar,
        langType
    }
};

export default useLang;
