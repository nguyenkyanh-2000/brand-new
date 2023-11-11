import { NextResponse } from "next/server";
import productSchema from "@/schema/productSchema";
import transformedZodErrors from "@/utils/zod-utils";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { ApiError } from "next/dist/server/api-utils";
import { filterSearchParams } from "@/utils/searchparams-utils";

export async function GET(request) {
  try {
    const allowedParams = ["page", "limit"];
    const filteredParams = filterSearchParams(request.nextUrl, allowedParams);
    let { page, limit } = filteredParams;
    // Ensure page and limit are numbers. Default: Page 1, limit 10
    page = Number(page) || 1;
    limit = Number(limit) || 10;
    const offset = (page - 1) * limit;
    const supabase = createRouteHandlerClient({ cookies });
    // Supabase uses 0-based index and equal on both side for "range".
    const { data, count, error } = await supabase
      .from("product")
      .select(`*, product_image(url)`, { count: "exact" })
      .range(offset, offset + limit - 1);

    if (error) {
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    } else {
      const res = {
        error: null,
        data: {
          products: data,
          currentPage: page,
          totalPages: Math.ceil(count / limit),
        },
        status: 200,
        message: "OK",
      };
      return NextResponse.json(res);
    }
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode }
    );
  }
}

export async function POST(request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    // Request's body validation. Always return 400 error if invalid.
    let product = await request.json();
    const result = productSchema.safeParse(product);
    if (result.error) throw transformedZodErrors(result.error);
    else product = result.data;
    const { data, error } = await supabase
      .from("product")
      .insert(product)
      .select();
    // User do not have sufficient rights to edit the products.
    if (error?.code === "42501")
      throw new ApiError(401, "User do not have sufficient rights");
    if (error) {
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }
    return NextResponse.json({
      error: null,
      data: { product: data },
      status: 200,
      message: "OK",
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode }
    );
  }
}
