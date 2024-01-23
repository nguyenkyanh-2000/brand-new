import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ApiError } from "next/dist/server/api-utils";
import transformedZodErrors from "@/utils/zod-utils";
import OrderPaymentSchema from "@/schema/orderPaymentSchema";

export async function PUT(request, context) {
  try {
    const orderId = context.params.id;
    const supabase = createRouteHandlerClient({ cookies });
    let order = await request.json();
    // Validation
    const result = OrderPaymentSchema.safeParse(order);
    if (result.error) throw transformedZodErrors(result.error);
    else order = result.data;

    const { data, error } = await supabase
      .from("order")
      .update(order)
      .eq("id", orderId)
      .select()
      .maybeSingle();
    if (!data)
      throw new ApiError(400, "Not sufficient rights or order does not exist!");
    if (error) {
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }
    return NextResponse.json({
      error: null,
      data: { order: data },
      status: 200,
      message: "Update order payment successfully!",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode },
    );
  }
}
