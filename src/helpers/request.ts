import config from "@/config/configuration";

export const requestGraphQL = async <T>(
  query: string,
  variables: Record<string, any> = {},
  options: { auth?: boolean; url?: string } = {}
): Promise<T> => {
  const response = await fetch(options.url || config.GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        options.auth ? localStorage.getItem("token") : ""
      }`,
      authversion: "2",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(errors.map((error: any) => error.message).join(", "));
  }

  return data;
};
