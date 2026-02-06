"use client";

import { useCallback, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus, X, GripVertical } from "lucide-react";
import Image from "next/image";

interface ImageItem {
  id?: string;
  url: string;
  file?: File;
}

interface ImageUploaderProps {
  images: ImageItem[];
  onChange: (images: ImageItem[]) => void;
}

function SortableImage({
  image,
  index,
  onRemove,
}: {
  image: ImageItem;
  index: number;
  onRemove: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id || image.url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative aspect-square rounded-xl overflow-hidden border-2 ${
        isDragging ? "border-primary-500 opacity-50" : "border-gray-200"
      }`}
    >
      <Image
        src={image.url}
        alt={`Image ${index + 1}`}
        fill
        className="object-cover"
        sizes="100px"
      />

      {/* Drag Handle */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="absolute top-1 left-1 p-1.5 rounded-lg bg-white/90 shadow cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-4 h-4 text-gray-600" />
      </button>

      {/* Remove Button */}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 p-1.5 rounded-lg bg-white/90 shadow hover:bg-red-50 transition-colors"
      >
        <X className="w-4 h-4 text-gray-600 hover:text-red-600" />
      </button>

      {/* Order Badge */}
      <div className="absolute bottom-1 left-1 px-2 py-0.5 rounded-md bg-black/60 text-white text-xs font-medium">
        {index + 1}
      </div>
    </div>
  );
}

export function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex(
        (img) => (img.id || img.url) === active.id
      );
      const newIndex = images.findIndex(
        (img) => (img.id || img.url) === over.id
      );
      onChange(arrayMove(images, oldIndex, newIndex));
    }
  };

  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const newImages: ImageItem[] = [];

      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const url = URL.createObjectURL(file);
          newImages.push({ url, file });
        }
      });

      if (newImages.length > 0) {
        onChange([...images, ...newImages]);
      }
    },
    [images, onChange]
  );

  const handleRemove = (index: number) => {
    const newImages = [...images];
    const removed = newImages.splice(index, 1)[0];
    if (removed.file) {
      URL.revokeObjectURL(removed.url);
    }
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={images.map((img) => img.id || img.url)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-3 gap-3">
            {images.map((image, index) => (
              <SortableImage
                key={image.id || image.url}
                image={image}
                index={index}
                onRemove={() => handleRemove(index)}
              />
            ))}

            {/* Add Button */}
            <label
              className={`aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${
                isDragOver
                  ? "border-primary-500 bg-primary-50"
                  : "border-gray-300 hover:border-primary-400 hover:bg-gray-50"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                handleFileSelect(e.dataTransfer.files);
              }}
            >
              <Plus className="w-6 h-6 text-gray-400 mb-1" />
              <span className="text-xs text-gray-500">Add</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files)}
              />
            </label>
          </div>
        </SortableContext>
      </DndContext>

      <p className="text-xs text-gray-500">
        Drag and drop to reorder. First image will be the main display image.
        Recommended: 4-5 images per card.
      </p>
    </div>
  );
}
