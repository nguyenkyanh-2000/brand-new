import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ApiError } from "next/dist/server/api-utils";
import profileSchema from "@/schema/profileSchema";
import transformedZodErrors from "@/utils/zod-utils";

export async function GET(request, context) {
  try {
    const userId = context.params.id;
    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();
    if (!data)
      throw new ApiError(400, "Not sufficient rights or user does not exist!");
    if (error) {
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }
    return NextResponse.json({
      error: null,
      data: { user: data },
      status: 200,
      message: "Get user's profile successfully!",
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode },
    );
  }
}

export async function PUT(request, context) {
  try {
    const userId = context.params.id;
    const supabase = createRouteHandlerClient({ cookies });
    // Request's body validation. Always return 400 error if invalid.
    let user = await request.json();
    const result = profileSchema.safeParse(user);
    if (result.error) throw transformedZodErrors(result.error);
    else user = result.data;
    const { data, error } = await supabase
      .from("profile")
      .update(user)
      .eq("user_id", userId)
      .select()
      .maybeSingle();
    if (!data)
      throw new ApiError(400, "Not sufficient rights or user does not exist!");
    if (error) {
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }
    return NextResponse.json({
      error: null,
      data: { user: data },
      status: 200,
      message: "Update user successfully!",
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode },
    );
  }
}
