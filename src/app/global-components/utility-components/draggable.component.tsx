"use client";
import {
  defaultDraggableScopedState,
  DraggableType,
  useDraggableStore,
} from "@/app/store/draggable.store";
import { cn } from "@/lib/utils";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";

type Item = {
  id: number;
  children: React.ReactNode;
};

export function SortableItem({ id, children }: Item) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

export function DraggableComponent({
  className,
  children,
  useScopedState,
}: {
  className: string;
  children: React.ReactNode,
  useScopedState?: { packageId: string };
}) {
 if(useScopedState){
   
    const scopedState = useDraggableStore(
      (state) =>
        state.draggableScopedStates[useScopedState!.packageId] ||
        defaultDraggableScopedState
    );
    const setDraggableScopedState = useDraggableStore((state) => state.setScopedState);
  
    useEffect(() => {
      console.log(scopedState.selectedDraggable);
    }, [scopedState.selectedDraggable.length]);
  
    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
            distance: 5
          }
      }),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );
  
    const handleDragEnd = (event: any) => {
      const { active, over } = event;
  
      if (active.id !== over.id) {
        setDraggableScopedState(
          useScopedState!.packageId,
          "selectedDraggable",
          (prevItems: Array<DraggableType<any>>) => {
            const oldIndex = prevItems.findIndex((item) => item.id === active.id);
            const newIndex = prevItems.findIndex((item) => item.id === over.id);
  
            const newOrder = arrayMove(prevItems, oldIndex, newIndex);
            console.log(
              "New Order:",
              newOrder.map((item) => item.id)
            ); // Mendapatkan ID elemen dalam urutan baru
            return newOrder;
          }
        );
      }
    };
  
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={scopedState.selectedDraggable.map((item) => item.id)}
        >
          <div className={cn(className)}>
           {children}
          </div>
        </SortableContext>
      </DndContext>
    );
 }else {
    const items = useDraggableStore((state) => state.items);
    const setItems = useDraggableStore((state) => state.setItems);
  
    useEffect(() => {
      console.log(items);
    }, [items.length]);
  
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );
  
    const handleDragEnd = (event: any) => {
      const { active, over } = event;
  
      if (active.id !== over.id) {
          setItems((prevItems) => {
            const oldIndex = prevItems.findIndex((item) => item.id === active.id);
            const newIndex = prevItems.findIndex((item) => item.id === over.id);
            const newOrder = arrayMove(prevItems, oldIndex, newIndex);
            console.log(
              "New Order:",
              newOrder.map((item) => item.id)
            ); // Mendapatkan ID elemen dalam urutan baru
            return newOrder;
          });
      }
    };
  
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.id)}
        >
          <div className={cn(className)}>
            {items.map((item) => (
              <SortableItem key={`${item.id}`} id={item.id} children={item.content} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    );
 }
}
