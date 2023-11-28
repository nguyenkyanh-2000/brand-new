"use client";
import { v4 as uuidv4 } from "uuid";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export const supabaseUpload = async (file, bucket, path) => {
  if (!file) return "";

  try {
    const fileUUID = uuidv4();
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path + "/" + fileUUID, file);

    if (error) {
      throw error;
    }

    return { imageEndpoint: data.path, imageId: fileUUID };
  } catch (error) {
    throw error;
  }
};
