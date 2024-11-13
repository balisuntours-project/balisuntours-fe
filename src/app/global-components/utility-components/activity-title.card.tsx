
export function ActivityTitleCard({title, customSizeText}: {title: string, customSizeText?: string}) {
    return (
        <>
            {/* Desktop View: Truncate to 2 lines */}
            <h2 className={`${!customSizeText ? 'text-sm md:text-xl' : customSizeText} font-semibold mt-2 md:mt-3 overflow-hidden text-ellipsis line-clamp-2`}>
                {title}
            </h2>
        
        </>
    )
}