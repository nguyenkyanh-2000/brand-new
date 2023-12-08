import { NextResponse } from "next/server";
import productSchema from "@/schema/productSchema";
import transformedZodErrors from "@/utils/zod-utils";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { ApiError } from "next/dist/server/api-utils";

export async function GET(request) {
  try {
    const url = request.nextUrl;
    const searchParams = new URL(url).searchParams;
    let page = searchParams.get("page");
    let limit = searchParams.get("limit");
    let search = searchParams.get("search");
    // Extract categories and badges as arrays split by commas
    let categories = searchParams
      .getAll("category")
      .flatMap((category) => category.split(","));
    let badges = searchParams
      .getAll("badge")
      .flatMap((badge) => badge.split(","));

    let orderBy = searchParams.get("order_by");
    let pmin = searchParams.get("pmin");
    let pmax = searchParams.get("pmax");

    // Ensure page and limit are numbers. Default: Page 0, limit 10
    page = Number(page) || 0;
    limit = Number(limit) || 10;
    const offset = page * limit;

    const supabase = createRouteHandlerClient({ cookies });
    let query = supabase
      .from("product")
      .select(`*, product_image(*), product_variant(*)`, {
        count: "estimated",
      });

    // Apply keyword and category filters if they exist
    if (search) {
      query = query.ilike("name", `%${search}%`);
    }
    if (categories.length > 0) {
      // Apply filter for multiple categories using 'in'
      query = query.in("category", categories);
    }

    if (badges.length > 0) {
      // Apply filter for multiple badges using 'in'
      query = query.in("badge", badges);
    }

    // Apply price range filter if both pmin and pmax are provided
    if (pmin && pmax) {
      query = query
        .gte("price", pmin) // Greater than or equal to pmin
        .lte("price", pmax); // Less than or equal to pmax
    }

    // Apply order by if provided
    if (orderBy) {
      let column = "";
      let direction = "";

      // Map select options to columns and direction
      switch (orderBy) {
        case "price-asc":
          column = "price";
          direction = "asc";
          break;
        case "price-desc":
          column = "price";
          direction = "desc";
          break;
        case "name-asc":
          column = "name";
          direction = "asc";
          break;
        case "name-desc":
          column = "name";
          direction = "desc";
          break;
        default:
          // Default order by created_at if not specified or unrecognized
          column = "created_at";
          direction = "desc";
      }

      query = query.order(column, { ascending: direction === "asc" });
    } else {
      // Default order by created_at if not specified
      query = query.order("created_at", { ascending: false });
    }

    // Continue with the existing query
    const { data, count, error } = await query.range(
      offset,
      offset + limit - 1,
    );

    if (error) {
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }

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
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode },
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
      .select()
      .single();
    // User do not have sufficient rights to edit the products.

    if (error) {
      if (error.code === "42501")
        throw new ApiError(401, "User do not have sufficient rights");
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
      { status: error.statusCode },
    );
  }
}
