import { NUTRIENTS_MOCK } from "./mock";

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
  return fetch(`/api/v1/nutrients?nutrient_search_text=${name}`)
  .then(
    (response) => {
      //console.log('Получили данные', response);
      return response.json();
    }
  )
  .catch(
    () => {
      //console.log('Ошибка получения данных', NUTRIENTS_MOCK);
      return NUTRIENTS_MOCK.filter((nutrient: Nutrients) => nutrient.name.toLowerCase().includes(name));
    }
  )
};

// export function getNutrientsByName() {
//   const dispatch = useDispatch();
//   const name = useNutrientsFilterName();

//   async function fetchNutrients() {
//     const response = await fetch(`/api/v1/nutrients?search_text=${name}`)
//     .then(
//       (response) => {
//         console.log('Получили данные', response);
//         return response.json();
//       }
//     )
//     .catch(
//       () => {
//         console.log('Ошибка получения данных', NUTRIENTS_MOCK);
//         return NUTRIENTS_MOCK;
//       }
//     )
//     dispatch(setNutrientsAction(response)) 
//   }

//   useEffect(() => {
//     fetchNutrients()
//   }, [])
// }

export const getNutrientById = async (
  id: number | string
): Promise<Nutrients> => {
  return fetch(`/api/v1/nutrients/${id}`).then(
    (response) => {
        console.log('Получили данные', response);
        return response.json()
      }
  )
  .catch(
    () => {
      console.log('Ошибка получения данных');
      const num_id = Number(id)
      return num_id >= 0 && num_id <= 2 ? NUTRIENTS_MOCK[Number(id) - 1] : undefined;
    }
  )
};

export const getDishCompositionBtn = async () : Promise<DishCompositionBtn> => {
  return fetch(`/api/v1/dish_compositions/draft`).then(
    (response) => {
        console.log('Получили данные', response);
        return response.json()
      }
  )
  .catch(
    () => {
      console.log('Ошибка получения данных');
      return {
        dish_composition_draft: {
          id: -1,
          nutrient_types_amount: 0
          }
      };
    }
  ) 
}