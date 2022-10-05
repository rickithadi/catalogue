import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { useQuery } from "react-query";

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

const fetchCatPics = async (catId: string) => {
  // TODO fix array response, not some cats dont have whereabouts for some reason, will fix eventually
  const { data: nestedPictureList, error } = await supabase
    .from("whereabouts")
    .select("pictures")
    .eq("cat_id", catId);
  if (nestedPictureList && nestedPictureList[0]) {
    const { pictures } = nestedPictureList[0];
    return pictures;
  } else {
    console.log("error", error);
    return [];
  }
};
const fetchCats = async () => {
  const { data, error } = await supabase
    .from("cats")
    .select("*")
    .order("id", { ascending: true });
  // if (error) throw error;
  console.log(data);
  if (error) console.log(error);
  return data || [];
};

export const getCats = () => useQuery("cats", fetchCats);
export const getCatPics = (catId: string) =>
  useQuery(["catPics", catId], () => fetchCatPics(catId));
