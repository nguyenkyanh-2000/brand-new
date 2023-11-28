"use client";
import { v4 as uuidv4 } from "uuid";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export const supabaseUpload = async (file, bucket) => {
  if (!file) return "";

  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(`/${file.name}` + "/" + uuidv4(), file);

    if (error) {
      throw error;
    }

    const imageUrl = data.path;
    return imageUrl;
  } catch (error) {
    throw error;
  }
};
