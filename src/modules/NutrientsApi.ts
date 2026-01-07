import { NUTRIENTS_MOCK } from "./mock";

const API_BASE = import.meta.env.VITE_API_BASE;

const apiFetch = (path: string, init: RequestInit = {}) => {
  return fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: "include",
  });
};


export interface Nutrients {
  id: number;
  name: string;
  short_desc: string;
  daily_dose_min: string;
  daily_dose_max: string;
  img_url: string;
  full_desc?: string;
};

export interface NutrientsResult {
  resultCount: number;
  results: Nutrients[];
}

export interface DishCompositionBtn {
  dish_composition_draft: {
        id: number,
        nutrient_types_amount: number
    }
}

export const getNutrientsByName = async (name = ""): Promise<Nutrients[]> => {
  return apiFetch(`/nutrients?nutrient_search_text=${encodeURIComponent(name)}`)
    .then(r => r.json())
    .catch(() => NUTRIENTS_MOCK.filter(n => n.name.toLowerCase().includes(name)));
};

export const getNutrientById = async (id: number | string): Promise<Nutrients> => {
  return apiFetch(`/nutrients/${id}`)
    .then(r => r.json())
    .catch(() => {
      const numId = Number(id);
      return numId >= 1 && numId <= 2 ? NUTRIENTS_MOCK[numId - 1] : undefined as any;
    });
};

export const getDishCompositionBtn = async (): Promise<DishCompositionBtn> => {
  return apiFetch(`/dish_compositions/draft`)
    .then(r => r.json())
    .catch(() => ({
      dish_composition_draft: { id: -1, nutrient_types_amount: 0 }
    }));
};
