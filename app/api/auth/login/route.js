import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ApiError } from "next/dist/server/api-utils";

export async function POST(request) {
  try {
    const requestData = await request.json();
    const { email, password } = requestData;
    const supabase = createRouteHandlerClient({ cookies });
    const userCredentials = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_LOCATION_ORIGIN}/api/auth/callback`,
      },
    });
    if (userCredentials.error)
      throw new ApiError(
        userCredentials.error.status,
        userCredentials.error.message
      );
    // Get user profile from login credentials
    const userProfile = await supabase
      .from("profile")
      .select("*")
      .eq("user_id", userCredentials.data.user.id)
      .single();
    if (userProfile.error) {
      if (!userProfile.error.status) error.status = 400;
      throw new ApiError(userProfile.error.status, userProfile.error.message);
    }
    return NextResponse.json({
      error: null,
      data: { user: userProfile.data },
      status: 200,
      message: "Login successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode }
    );
  }
}
