import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Fetch initial cards
  const { data: cards } = await supabase
    .from("cards")
    .select(
      `
      *,
      images:card_images(*)
    `
    )
    .order("created_at", { ascending: false });

  // Fetch enquiry stats
  const { count: totalEnquiries } = await supabase
    .from("enquiry_logs")
    .select("*", { count: "exact", head: true });

  const cardsWithSortedImages = (cards || []).map((card) => ({
    ...card,
    images: (card.images || []).sort(
      (a: { display_order: number }, b: { display_order: number }) =>
        a.display_order - b.display_order
    ),
  }));

  return (
    <DashboardClient
      initialCards={cardsWithSortedImages}
      totalEnquiries={totalEnquiries || 0}
      userEmail={user.email || ""}
    />
  );
}
