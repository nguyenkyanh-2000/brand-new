import { ApiError } from "next/dist/server/api-utils";

function transformedZodErrors(zodError) {
  const errorMessage = zodError.issues.map((issue) => issue.message).join(" ");
  const combinedError = new ApiError(400, errorMessage);
  return combinedError;
}

export default transformedZodErrors;
