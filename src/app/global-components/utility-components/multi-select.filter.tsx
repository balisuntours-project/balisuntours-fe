"use client";

import React, { useEffect, useState } from "react";
import { MultiSelect } from "@/components/custom-ui/multi-select.input";
import { ActivityCategoryAction } from "@/app/actions/category/action";
import { ActivityCategoryFilterParamater } from "@/app/paramaters/activity-category/paramater";
import { useAllActivityStore } from "@/app/store/all-activity.store";

export function MultiSelectFilter() {
  const setSelectedCategories = useAllActivityStore(
    (state) => state.setSelectedCategories
  );
  const selectedCategories = useAllActivityStore(
    (state) => state.selectedCategories
  );
  const setOnFiltering = useAllActivityStore((state) => state.setOnFiltering);

  const [categories, setCategories] = useState<
    Array<ActivityCategoryFilterParamater>
  >([]);
  const getAllCategories = async () => {
    const response = await ActivityCategoryAction.GetActivityCategories();
    const formattedCategories = response.data.map((category) => ({
      ...category,
      label: category.title,
      value: category.uuid,
    }));
    setCategories(formattedCategories);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const onChangeCategory = (value: Array<string>) => {
    setOnFiltering(true);
    setTimeout(() => {
      setSelectedCategories(value.length > 0 ? value : undefined);
      setOnFiltering(false);
    }, 500);
  };

  return (
    <div className="max-w-xl">
      {/*  <h1 className="text-2xl font-bold mb-4">Multi-Select Component</h1> */}
      <MultiSelect
        options={categories}
        onValueChange={onChangeCategory}
        defaultValue={selectedCategories}
        placeholder="Select categories"
        variant="green"
        animation={2}
        maxCount={1}
        className="shadow-none"
      />
      {/*  <div className="mt-4">
        <h2 className="text-xl font-semibold">Selected Frameworks:</h2>
        <ul className="list-disc list-inside">
          {selectedFrameworks.map((framework) => (
            <li key={framework}>{framework}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
