export interface ActivityCategoryParamater {
    title: string
    uuid: string
}

export interface ActivityCategoryFilterParamater extends ActivityCategoryParamater {
    value: string,
    label: string,
    icon?: React.ComponentType<{
        className?: string;
    }>;
}