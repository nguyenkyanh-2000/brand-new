import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ApiError } from "next/dist/server/api-utils";

export async function GET(request, context) {
  try {
    const userId = context.params.id;
    const url = request.nextUrl;
    const searchParams = new URL(url).searchParams;
    let page = searchParams.get("page");
    let limit = searchParams.get("limit");
    const supabase = createRouteHandlerClient({ cookies });

    // Ensure page and limit are numbers. Default: Page 0, limit 10
    page = Number(page) || 0;
    limit = Number(limit) || 10;
    const offset = page * limit;

    const { data, count, error } = await supabase
      .from("order")
      .select("*, order_item(*)", { count: "estimated" })
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }

    const totalPages = Math.ceil(count / limit);

    const res = {
      error: null,
      data: {
        orders: data,
        currentPage: page,
        totalPages: totalPages,
      },
      status: 200,
      message: "Get orders for the user successfully!",
    };

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode || 500 },
    );
  }
}
