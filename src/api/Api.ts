/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Nutrient {
  /** ID */
  id?: number;
  /**
   * Название
   * @minLength 1
   * @maxLength 50
   */
  name: string;
  /**
   * Дневная норма (г/кг массы тела) от
   * @format decimal
   */
  daily_dose_min?: string | null;
  /**
   * Дневная норма (г/кг массы тела) до
   * @format decimal
   */
  daily_dose_max?: string | null;
  /**
   * Краткое описание
   * @maxLength 255
   */
  short_desc?: string | null;
  /** Полное описание */
  full_desc?: string | null;
  /**
   * Ссылка на изображение
   * @format uri
   * @maxLength 200
   */
  img_url?: string | null;
}

export interface DishCompositionNutrient {
  nutrient?: Nutrient;
  /**
   * Количество в блюде
   * @format decimal
   */
  quantity_in_dish?: string | null;
  /**
   * Доля в дневной норме
   * @format decimal
   */
  daily_dose_percentage?: string | null;
}

export interface DishCompositionRequestFlat {
  /** Статус */
  status?: "DR" | "DE" | "FO" | "CO" | "RE";
  /**
   * Дата создания
   * @format date-time
   */
  creation_datetime?: string;
  /**
   * Дата формирования
   * @format date-time
   */
  formation_datetime?: string | null;
  /**
   * Дата завершения
   * @format date-time
   */
  completion_datetime?: string | null;
  /**
   * Client
   * @minLength 1
   */
  client?: string;
  /**
   * Manager
   * @minLength 1
   */
  manager?: string;
  /**
   * Body mass
   * @min -2147483648
   * @max 2147483647
   */
  body_mass?: number | null;
  /**
   * Dish mass
   * @min -2147483648
   * @max 2147483647
   */
  dish_mass?: number | null;
  /** Dish */
  dish?: number | null;
}

export interface DishCompositionRequest {
  /** Статус */
  status?: "DR" | "DE" | "FO" | "CO" | "RE";
  /**
   * Дата создания
   * @format date-time
   */
  creation_datetime?: string;
  /**
   * Дата формирования
   * @format date-time
   */
  formation_datetime?: string | null;
  /**
   * Дата завершения
   * @format date-time
   */
  completion_datetime?: string | null;
  /**
   * Client
   * @minLength 1
   */
  client?: string;
  /**
   * Manager
   * @minLength 1
   */
  manager?: string;
  /**
   * Body mass
   * @min -2147483648
   * @max 2147483647
   */
  body_mass?: number | null;
  /**
   * Dish mass
   * @min -2147483648
   * @max 2147483647
   */
  dish_mass?: number | null;
  /** Dish */
  dish?: number | null;
  nutrients?: DishCompositionNutrient[];
}

export interface User {
  /**
   * Email адрес
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email: string;
  /**
   * Пароль
   * @minLength 1
   */
  password: string;
  /**
   * Is staff
   * @default false
   */
  is_staff?: boolean;
  /**
   * Is superuser
   * @default false
   */
  is_superuser?: boolean;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://localhost:8000/api/v1",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000/api/v1
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  dishCompositions = {
    /**
     * No description
     *
     * @tags dish_compositions
     * @name DishCompositionsList
     * @request GET:/dish_compositions
     * @secure
     */
    dishCompositionsList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/dish_compositions`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags dish_compositions
     * @name DishCompositionsDraftList
     * @request GET:/dish_compositions/draft
     * @secure
     */
    dishCompositionsDraftList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/dish_compositions/draft`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags dish_compositions
     * @name DishCompositionsNutrientDeleteDelete
     * @request DELETE:/dish_compositions/{dish_composition_pk}/nutrient/{nutrient_pk}/delete
     * @secure
     */
    dishCompositionsNutrientDeleteDelete: (
      dishCompositionPk: string,
      nutrientPk: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/dish_compositions/${dishCompositionPk}/nutrient/${nutrientPk}/delete`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags dish_compositions
     * @name DishCompositionsNutrientPutUpdate
     * @request PUT:/dish_compositions/{dish_composition_pk}/nutrient/{nutrient_pk}/put
     * @secure
     */
    dishCompositionsNutrientPutUpdate: (
      dishCompositionPk: string,
      nutrientPk: string,
      data: DishCompositionNutrient,
      params: RequestParams = {},
    ) =>
      this.request<DishCompositionNutrient, any>({
        path: `/dish_compositions/${dishCompositionPk}/nutrient/${nutrientPk}/put`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags dish_compositions
     * @name DishCompositionsRead
     * @request GET:/dish_compositions/{id}
     * @secure
     */
    dishCompositionsRead: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/dish_compositions/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags dish_compositions
     * @name DishCompositionsCompleteUpdate
     * @request PUT:/dish_compositions/{id}/complete
     * @secure
     */
    dishCompositionsCompleteUpdate: (
      id: string,
      data: DishCompositionRequestFlat,
      params: RequestParams = {},
    ) =>
      this.request<DishCompositionRequestFlat, any>({
        path: `/dish_compositions/${id}/complete`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags dish_compositions
     * @name DishCompositionsDeleteDelete
     * @request DELETE:/dish_compositions/{id}/delete
     * @secure
     */
    dishCompositionsDeleteDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/dish_compositions/${id}/delete`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags dish_compositions
     * @name DishCompositionsPutUpdate
     * @request PUT:/dish_compositions/{id}/put
     * @secure
     */
    dishCompositionsPutUpdate: (
      id: string,
      data: DishCompositionRequest,
      params: RequestParams = {},
    ) =>
      this.request<DishCompositionRequest, any>({
        path: `/dish_compositions/${id}/put`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags dish_compositions
     * @name DishCompositionsSubmitUpdate
     * @request PUT:/dish_compositions/{id}/submit
     * @secure
     */
    dishCompositionsSubmitUpdate: (
      id: string,
      data: DishCompositionRequestFlat,
      params: RequestParams = {},
    ) =>
      this.request<DishCompositionRequestFlat, any>({
        path: `/dish_compositions/${id}/submit`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  login = {
    /**
     * No description
     *
     * @tags login
     * @name LoginCreate
     * @request POST:/login/
     * @secure
     */
    loginCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  logout = {
    /**
     * No description
     *
     * @tags logout
     * @name LogoutCreate
     * @request POST:/logout/
     * @secure
     */
    logoutCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/logout/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  nutrients = {
    /**
     * No description
     *
     * @tags nutrients
     * @name NutrientsList
     * @request GET:/nutrients
     * @secure
     */
    nutrientsList: (
      query?: {
        /** Фильтр по названию нутриента */
        nutrient_search_text?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Nutrient[], any>({
        path: `/nutrients`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags nutrients
     * @name NutrientsCreate
     * @request POST:/nutrients
     * @secure
     */
    nutrientsCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/nutrients`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags nutrients
     * @name NutrientsRead
     * @request GET:/nutrients/{id}
     * @secure
     */
    nutrientsRead: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/nutrients/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags nutrients
     * @name NutrientsCreate2
     * @request POST:/nutrients/{id}
     * @originalName nutrientsCreate
     * @duplicate
     * @secure
     */
    nutrientsCreate2: (
      id: string,
      data: Nutrient,
      params: RequestParams = {},
    ) =>
      this.request<Nutrient, any>({
        path: `/nutrients/${id}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags nutrients
     * @name NutrientsUpdate
     * @request PUT:/nutrients/{id}
     * @secure
     */
    nutrientsUpdate: (id: string, data: Nutrient, params: RequestParams = {}) =>
      this.request<Nutrient, any>({
        path: `/nutrients/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags nutrients
     * @name NutrientsDelete
     * @request DELETE:/nutrients/{id}
     * @secure
     */
    nutrientsDelete: (id: string, data: Nutrient, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/nutrients/${id}`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags nutrients
     * @name NutrientsImgCreate
     * @request POST:/nutrients/{id}/img
     * @secure
     */
    nutrientsImgCreate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/nutrients/${id}/img`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  users = {
    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags users
     * @name UsersList
     * @request GET:/users/
     * @secure
     */
    usersList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/users/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Функция регистрации новых пользователей Если пользователя c указанным в request email ещё нет, в БД будет добавлен новый пользователь.
     *
     * @tags users
     * @name UsersCreate
     * @request POST:/users/
     * @secure
     */
    usersCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags users
     * @name UsersRead
     * @request GET:/users/{id}/
     * @secure
     */
    usersRead: (id: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags users
     * @name UsersUpdate
     * @request PUT:/users/{id}/
     * @secure
     */
    usersUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags users
     * @name UsersPartialUpdate
     * @request PATCH:/users/{id}/
     * @secure
     */
    usersPartialUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags users
     * @name UsersDelete
     * @request DELETE:/users/{id}/
     * @secure
     */
    usersDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
