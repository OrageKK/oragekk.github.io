import { AxiosResponse } from "./../../../../node_modules/axios/index.d";
// To parse this data:
import axios from "axios";

export interface BingResponse {
  Code: number;
  Data: Datum[];
  Msg: string;
}

export interface Datum {
  Ssd: string;
  Path: string;
  Url: string;
  Copyright: string;
  CopyrightLink: string;
  Title: string;
  EN?: Datum;
}

// Converts JSON strings to/from your types
export class BingApi {
  public static toBingResponse(json: string): BingResponse {
    return JSON.parse(json);
  }

  public static bingResponseToJson(value: BingResponse): string {
    return JSON.stringify(value);
  }
  public static request(): Promise<AxiosResponse<BingResponse>> {
    return axios.get<BingResponse>("//file.mo7.cc/api/public/url");
  }
}
