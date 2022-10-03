import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ttofpxcplkleqtuopfgq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0b2ZweGNwbGtsZXF0dW9wZmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIzNjI1ODMsImV4cCI6MTk3NzkzODU4M30.8cmt3f65EN9cAxZUsf6syZLs_aSCbszkbC4A4kyQ-tA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

