import { supabase } from "../supabase/supabaseConfig";

const walletService = {
  // Fetch all wallets for current user
  async getUserWallets() {
    try {
      const { data, error } = await supabase
        .from("wallets")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (err) {
      return { success: false, error: "Failed to fetch wallet data" };
    }
  },
};

export default walletService;
