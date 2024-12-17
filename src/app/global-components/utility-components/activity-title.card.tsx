
export function ActivityTitleCard({title, customSizeText}: {title: string, customSizeText?: string}) {
    return (
        <>
            {/* Desktop View: Truncate to 2 lines */}
            <h2 className={`${!customSizeText ? 'text-sm md:text-xl' : customSizeText} font-semibold overflow-hidden text-ellipsis line-clamp-2`}>
                {title}
            </h2>
        
        </>
    )
}