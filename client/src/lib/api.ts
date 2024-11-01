const defaultHeaders = {
  "Content-Type": "application/json",
  // Add any default authorization headers if needed
  // 'Authorization': `Bearer ${token}`,
};

// Default CORS configurations
const corsConfig: RequestInit = {
  mode: "cors", // Enable CORS
  headers: defaultHeaders,
};

async function http<T>(path: string, config: RequestInit): Promise<T> {
  const finalConfig = {
    ...corsConfig,
    ...config,
    headers: {
      ...defaultHeaders,
      ...config.headers, // Allow overriding default headers
    },
  };

  const url = import.meta.env.VITE_APP_API_URL + path;

  const request = new Request(url, finalConfig);
  const response = await fetch(request);

  if (!response.ok) {
    // You might want to handle specific status codes differently
    if (response.status === 403) {
      throw new Error("CORS Error: Permission denied");
    }
    if (response.status === 401) {
      throw new Error("Authentication required");
    }
    throw new Error(response.statusText || `Error ${response.status}`);
  }

  // Parse JSON response
  try {
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw new Error("Invalid JSON response");
  }
}

export async function get<T>(path: string, config?: RequestInit): Promise<T> {
  const init = { method: "get", ...config };
  return await http<T>(path, init);
}

export async function post<T, U>(path: string, body: T, config: RequestInit): Promise<U> {
  const init = { method: "post", body: JSON.stringify(body), ...config };
  return await http<U>(path, init);
}

export async function put<T, U>(path: string, body: T, config: RequestInit): Promise<U> {
  const init = { method: "put", body: JSON.stringify(body), ...config };
  return await http<U>(path, init);
}

export async function remove<T, U>(path: string, body: T, config: RequestInit): Promise<U> {
  const init = { method: "delete", body: JSON.stringify(body), ...config };
  return await http<U>(path, init);
}
