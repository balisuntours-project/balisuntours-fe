"use client";

import {
  defaultDraggableScopedState,
  useDraggableStore,
} from "@/app/store/draggable.store";
import { Trash2 } from "lucide-react";
import Image from "next/image";

export function ReviewImage({
  id,
  src,
  packageId,
}: {
  id: number;
  src: string;
  packageId: string;
}) {
  const setDraggableScopedState = useDraggableStore((state) => state.setScopedState);

  const scopedState = useDraggableStore(
    (state) =>
      state.draggableScopedStates[packageId] || defaultDraggableScopedState
  );

  const removeImage = (index: number) => {
    const filteredItems = scopedState.selectedDraggable.filter((item) => item.id != index)
    setDraggableScopedState(packageId, 'selectedDraggable', filteredItems)
    
  };

  return (
    <div className="w-24 h-24 relative border rounded-md overflow-hidden group">
      {/* Gambar */}
      <Image
        src={src} // Mengakses `src` dari
        alt={`Uploaded ${id}`}
        width={96}
        height={96}
        className="w-full h-full object-cover"
      />

      {/* Tombol Trash */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Mencegah event bubbling ke `SortableItem`
          removeImage(id);
        }}
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <Trash2 className="text-white w-6 h-6" />
      </button>
    </div>
  );
}
