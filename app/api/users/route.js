import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const url = request.nextUrl;
    const searchParams = new URL(url).searchParams;
    let page = searchParams.get("page");
    let limit = searchParams.get("limit");
    // Ensure page and limit are numbers
    page = Number(page) || 1;
    limit = Number(limit) || 10;
    const offset = (page - 1) * limit;
    const supabase = createRouteHandlerClient({ cookies });
    // Supabase uses 0-based index and equal on both side for "range".
    const { data, count, error } = await supabase
      .from("profile")
      .select("*", { count: "exact" })
      .range(offset, offset + limit - 1);

    if (error) {
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    } else {
      const res = {
        error: null,
        data: {
          users: data,
          currentPage: page,
          totalPages: Math.ceil(count / limit),
        },
        status: 200,
        message: "Get the list of users successfully!",
      };
      return NextResponse.json(res);
    }
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode },
    );
  }
}
