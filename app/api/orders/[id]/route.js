import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ApiError } from "next/dist/server/api-utils";
import { validate } from "uuid";

export async function GET(request, context) {
  try {
    const orderId = context.params.id;
    if (!validate(orderId)) throw new ApiError(400, "Wrong order ID");
    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase
      .from("order")
      .select("*, order_item(*)")
      .eq("id", orderId)
      .maybeSingle();

    if (!data) throw new ApiError(400, "Order does not exist!");
    if (error) {
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }
    return NextResponse.json({
      error: null,
      data: { order: data },
      status: 200,
      message: "Get the order successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode },
    );
  }
}
