"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Plus,
  LogOut,
  Grid3X3,
  MessageCircle,
  Search,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button, Input } from "@/components/ui";
import { CardWithImages } from "@/types";
import { AdminCardItem } from "@/components/admin/AdminCardItem";
import { CardFormModal } from "@/components/admin/CardFormModal";
import toast from "react-hot-toast";

interface DashboardClientProps {
  initialCards: CardWithImages[];
  totalEnquiries: number;
  userEmail: string;
}

export default function DashboardClient({
  initialCards,
  totalEnquiries,
  userEmail,
}: DashboardClientProps) {
  const router = useRouter();
  const [cards, setCards] = useState<CardWithImages[]>(initialCards);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<CardWithImages | null>(null);

  const filteredCards = cards.filter(
    (card) =>
      card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.card_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const handleCreateCard = () => {
    setEditingCard(null);
    setIsModalOpen(true);
  };

  const handleEditCard = (card: CardWithImages) => {
    setEditingCard(card);
    setIsModalOpen(true);
  };

  const handleDuplicateCard = async (card: CardWithImages) => {
    try {
      const supabase = createClient();

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

      const newCardId = `DP${nextId.toString().padStart(3, "0")}`;

      // Create duplicate card
      const { data: newCard, error } = await supabase
        .from("cards")
        .insert({
          card_id: newCardId,
          name: `${card.name} (Copy)`,
          category: card.category,
          availability: card.availability,
          is_featured: false,
        })
        .select()
        .single();

      if (error) throw error;

      // Duplicate images
      if (card.images.length > 0) {
        const imagesToInsert = card.images.map((img) => ({
          card_id: newCard.id,
          image_url: img.image_url,
          display_order: img.display_order,
        }));

        await supabase.from("card_images").insert(imagesToInsert);
      }

      toast.success("Card duplicated successfully!");
      router.refresh();

      // Refresh cards list
      const { data: updatedCards } = await supabase
        .from("cards")
        .select(`*, images:card_images(*)`)
        .order("created_at", { ascending: false });

      if (updatedCards) {
        setCards(
          updatedCards.map((c) => ({
            ...c,
            images: (c.images || []).sort(
              (a: { display_order: number }, b: { display_order: number }) =>
                a.display_order - b.display_order
            ),
          }))
        );
      }
    } catch (error) {
      console.error("Error duplicating card:", error);
      toast.error("Failed to duplicate card");
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!confirm("Are you sure you want to delete this card?")) return;

    try {
      const supabase = createClient();

      // Delete images first
      await supabase.from("card_images").delete().eq("card_id", cardId);

      // Delete card
      const { error } = await supabase.from("cards").delete().eq("id", cardId);

      if (error) throw error;

      setCards((prev) => prev.filter((c) => c.id !== cardId));
      toast.success("Card deleted successfully!");
    } catch (error) {
      console.error("Error deleting card:", error);
      toast.error("Failed to delete card");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCard(null);
  };

  const handleCardSaved = async () => {
    const supabase = createClient();
    const { data: updatedCards } = await supabase
      .from("cards")
      .select(`*, images:card_images(*)`)
      .order("created_at", { ascending: false });

    if (updatedCards) {
      setCards(
        updatedCards.map((c) => ({
          ...c,
          images: (c.images || []).sort(
            (a: { display_order: number }, b: { display_order: number }) =>
              a.display_order - b.display_order
          ),
        }))
      );
    }

    handleModalClose();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">{userEmail}</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
              <Grid3X3 className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{cards.length}</p>
              <p className="text-sm text-gray-500">Total Cards</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {totalEnquiries}
              </p>
              <p className="text-sm text-gray-500">Enquiries</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <span className="text-2xl">🕉️</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {cards.filter((c) => c.category === "hindu").length}
              </p>
              <p className="text-sm text-gray-500">Hindu Cards</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <span className="text-2xl">☪️</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {cards.filter((c) => c.category === "muslim").length}
              </p>
              <p className="text-sm text-gray-500">Muslim Cards</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </div>
        <Button onClick={handleCreateCard}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Card
        </Button>
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        {filteredCards.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No cards found
            </h3>
            <p className="text-gray-500 mb-4">
              {searchQuery
                ? "Try a different search term"
                : "Start by adding your first card"}
            </p>
            {!searchQuery && (
              <Button onClick={handleCreateCard}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Card
              </Button>
            )}
          </div>
        ) : (
          filteredCards.map((card, index) => (
            <AdminCardItem
              key={card.id}
              card={card}
              index={index}
              onEdit={handleEditCard}
              onDuplicate={handleDuplicateCard}
              onDelete={handleDeleteCard}
            />
          ))
        )}
      </div>

      {/* Modal */}
      <CardFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        card={editingCard}
        onSaved={handleCardSaved}
      />
    </div>
  );
}
