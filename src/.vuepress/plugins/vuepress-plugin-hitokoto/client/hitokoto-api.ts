import axios, { AxiosResponse } from "axios";

export interface Hitokoto {
  id: number;
  uuid: string;
  hitokoto: string;
  type: string;
  from: string;
  from_who: null;
  creator: string;
  creator_uid: number;
  reviewer: number;
  commit_from: string;
  created_at: string;
  length: number;
}

// Converts JSON strings to/from your types
export class HitokotoApi {
  public static toHitokoto(json: string): Hitokoto {
    return JSON.parse(json);
  }

  public static HitokotoToJson(value: Hitokoto): string {
    return JSON.stringify(value);
  }
  public static request(): Promise<AxiosResponse<Hitokoto>> {
    return axios.get<Hitokoto>("https://v1.hitokoto.cn/");
  }
}
