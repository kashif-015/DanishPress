"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Modal, Button, Input, Select } from "@/components/ui";
import { CardWithImages, CardCategory, AvailabilityStatus } from "@/types";
import { ImageUploader } from "./ImageUploader";
import toast from "react-hot-toast";

interface CardFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: CardWithImages | null;
  onSaved: () => void;
}

export function CardFormModal({
  isOpen,
  onClose,
  card,
  onSaved,
}: CardFormModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<CardCategory>("hindu");
  const [availability, setAvailability] = useState<AvailabilityStatus>("available");
  const [isFeatured, setIsFeatured] = useState(false);
  const [images, setImages] = useState<{ id?: string; url: string; file?: File }[]>(
    []
  );

  const isEditing = !!card;

  useEffect(() => {
    if (card) {
      setName(card.name);
      setCategory(card.category);
      setAvailability(card.availability);
      setIsFeatured(card.is_featured);
      setImages(card.images.map((img) => ({ id: img.id, url: img.image_url })));
    } else {
      setName("");
      setCategory("hindu");
      setAvailability("available");
      setIsFeatured(false);
      setImages([]);
    }
  }, [card, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a card name");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();

      let cardId = card?.id;
      let displayId = card?.card_id;

      if (!isEditing) {
        // Generate new card ID
        const { data: lastCard } = await supabase
          .from("cards")
          .select("card_id")
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        let nextId = 1;
        if (lastCard?.card_id) {
          const match = lastCard.card_id.match(/DP(\d+)/);
          if (match) {
            nextId = parseInt(match[1]) + 1;
          }
        }

        displayId = `DP${nextId.toString().padStart(3, "0")}`;

        // Create card
        const { data: newCard, error: createError } = await supabase
          .from("cards")
          .insert({
            card_id: displayId,
            name: name.trim(),
            category,
            availability,
            is_featured: isFeatured,
          })
          .select()
          .single();

        if (createError) throw createError;
        cardId = newCard.id;
      } else {
        // Update card
        const { error: updateError } = await supabase
          .from("cards")
          .update({
            name: name.trim(),
            category,
            availability,
            is_featured: isFeatured,
            updated_at: new Date().toISOString(),
          })
          .eq("id", cardId);

        if (updateError) throw updateError;
      }

      // Handle images
      // Upload new images
      const uploadedImages: { url: string; order: number }[] = [];

      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        if (img.file) {
          // Upload to Supabase Storage
          const fileName = `${cardId}/${Date.now()}-${img.file.name}`;
          const { error: uploadError } = await supabase.storage
            .from("card-images")
            .upload(fileName, img.file);

          if (uploadError) {
            console.error("Upload error:", uploadError);
            continue;
          }

          const {
            data: { publicUrl },
          } = supabase.storage.from("card-images").getPublicUrl(fileName);

          uploadedImages.push({ url: publicUrl, order: i });
        } else if (img.id) {
          // Existing image, update order if needed
          await supabase
            .from("card_images")
            .update({ display_order: i })
            .eq("id", img.id);
        }
      }

      // Insert new images
      if (uploadedImages.length > 0) {
        await supabase.from("card_images").insert(
          uploadedImages.map((img) => ({
            card_id: cardId,
            image_url: img.url,
            display_order: img.order,
          }))
        );
      }

      // Delete removed images
      if (isEditing && card) {
        const currentImageIds = images
          .filter((img: { id?: string; url: string; file?: File }) => img.id)
          .map((img: { id?: string; url: string; file?: File }) => img.id);
        const removedImages = card.images.filter(
          (img) => !currentImageIds.includes(img.id)
        );

        for (const img of removedImages) {
          // Delete from storage
          const path = img.image_url.split("/card-images/")[1];
          if (path) {
            await supabase.storage.from("card-images").remove([path]);
          }
          // Delete from database
          await supabase.from("card_images").delete().eq("id", img.id);
        }
      }

      toast.success(isEditing ? "Card updated!" : "Card created!");
      onSaved();
    } catch (error) {
      console.error("Error saving card:", error);
      toast.error("Failed to save card");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Card" : "Add New Card"}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Card Name"
          placeholder="Enter card name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value as CardCategory)}
          options={[
            { value: "hindu", label: "Hindu" },
            { value: "muslim", label: "Muslim" },
          ]}
        />

        <Select
          label="Availability"
          value={availability}
          onChange={(e) => setAvailability(e.target.value as AvailabilityStatus)}
          options={[
            { value: "available", label: "Available" },
            { value: "limited", label: "Limited Stock" },
            { value: "unavailable", label: "Unavailable" },
          ]}
        />

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="featured"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="featured" className="text-sm font-medium text-gray-700">
            Mark as Featured
          </label>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Images (drag to reorder)
          </label>
          <ImageUploader images={images} onChange={setImages} />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1" isLoading={isLoading}>
            {isEditing ? "Update Card" : "Create Card"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
