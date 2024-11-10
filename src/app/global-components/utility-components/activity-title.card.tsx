
export function ActivityTitleCard({title}: {title: string}) {
    return (
        <>
            {/* Desktop View: Truncate to 2 lines */}
            <h2 className="text-sm md:text-xl font-semibold mt-2 md:mt-3 overflow-hidden text-ellipsis line-clamp-2">
                {title}
            </h2>
        
        </>
    )
}