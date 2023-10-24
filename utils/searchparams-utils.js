// Function to parse and filter URL search parameters
export function filterSearchParams(url, allowedParams) {
  const searchParams = new URL(url).searchParams;

  // Create an object to store the allowed parameters and their values
  const filteredParams = {};

  // Loop through allowedParams and include them in the filteredParams object
  allowedParams.forEach((param) => {
    if (searchParams.has(param)) {
      filteredParams[param] = searchParams.get(param);
    }
  });

  return filteredParams;
}
