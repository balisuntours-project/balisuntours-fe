
export function ActivityTitleCard({title, customSizeText, textColor}: {title: string, customSizeText?: string, textColor?: string}) {
    return (
        <>
            {/* Desktop View: Truncate to 2 lines */}
            <h2 className={`${!customSizeText ? 'text-sm md:text-xl' : customSizeText} font-semibold overflow-hidden text-ellipsis line-clamp-2 ${textColor ? textColor : "text-black"}`}>
                {title}
            </h2>
        
        </>
    )
}