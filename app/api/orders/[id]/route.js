import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ApiError } from "next/dist/server/api-utils";
import orderSchema from "@/schema/orderDetailSchema";
import transformedZodErrors from "@/utils/zod-utils";

export async function PUT(request, context) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    let order = await request.json();
    // Validation
    const result = orderSchema.safeParse(order);
    if (result.error) throw transformedZodErrors(result.error);
    else order = result.data;

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
