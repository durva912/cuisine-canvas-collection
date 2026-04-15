export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export type AuthResponse = {
  access_token: string;
  token_type: "bearer";
  user: AuthUser;
};

export type Recipe = {
  id: number;
  title: string;
  description: string;
  cook_time: string;
  servings: number;
  image_url: string | null;
  tags: string[];
  ingredients: string[];
  instructions: string[];
  rating: number;
  created_at: string;
};

export type FavoriteRecipe = {
  id: string;
  title: string;
  image: string;
  time: string;
  servings: number;
  tags: string[];
  rating: number;
};

type RecipeOverride = Partial<
  Pick<Recipe, "title" | "description" | "cook_time" | "servings" | "image_url" | "tags" | "ingredients" | "instructions">
>;

const RECIPE_OVERRIDES_KEY = "cc_recipe_overrides";
const FAVORITES_KEY = "cc_favorites";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function readErrorMessage(res: Response): Promise<string> {
  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    try {
      const data = (await res.json()) as { detail?: string | { msg?: string }[] };
      if (typeof data?.detail === "string") return data.detail;
      if (Array.isArray(data?.detail) && data.detail[0]?.msg) return data.detail[0].msg;
    } catch {
      // ignore parse errors
    }
  }
  try {
    const text = await res.text();
    if (text) return text;
  } catch {
    // ignore
  }
  return "Request failed";
}

export async function signup(payload: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new ApiError(await readErrorMessage(res), res.status);
  return (await res.json()) as AuthResponse;
}

export async function login(payload: { email: string; password: string }): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new ApiError(await readErrorMessage(res), res.status);
  return (await res.json()) as AuthResponse;
}

export function saveAuth(auth: AuthResponse) {
  localStorage.setItem("cc_token", auth.access_token);
  localStorage.setItem("cc_user", JSON.stringify(auth.user));
}

export function getStoredAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem("cc_user");
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function saveStoredAuthUser(user: AuthUser) {
  localStorage.setItem("cc_user", JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem("cc_token");
  localStorage.removeItem("cc_user");
}

export function isAuthenticated(): boolean {
  return Boolean(localStorage.getItem("cc_token"));
}

export async function listRecipes(): Promise<Recipe[]> {
  const res = await fetch(`${API_URL}/recipes`);
  if (!res.ok) throw new ApiError(await readErrorMessage(res), res.status);
  return (await res.json()) as Recipe[];
}

export async function createRecipe(payload: {
  title: string;
  description: string;
  cook_time: string;
  servings: number;
  image_url?: string | null;
  tags: string[];
  ingredients: string[];
  instructions: string[];
}): Promise<Recipe> {
  const res = await fetch(`${API_URL}/recipes`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new ApiError(await readErrorMessage(res), res.status);
  return (await res.json()) as Recipe;
}

export function getRecipeOverrides(): Record<string, RecipeOverride> {
  try {
    const raw = localStorage.getItem(RECIPE_OVERRIDES_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, RecipeOverride>;
  } catch {
    return {};
  }
}

export function saveRecipeOverride(recipeId: number, override: RecipeOverride) {
  const all = getRecipeOverrides();
  all[String(recipeId)] = override;
  localStorage.setItem(RECIPE_OVERRIDES_KEY, JSON.stringify(all));
}

export function getFavoriteRecipes(): FavoriteRecipe[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as FavoriteRecipe[];
  } catch {
    return [];
  }
}

export function saveFavoriteRecipes(favorites: FavoriteRecipe[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

