// To parse this data:
import axios, { AxiosResponse } from "axios";

export interface BingResponse {
  images: Image[];
  tooltips: Tooltips;
}

export interface Image {
  bot: number;
  copyright: string;
  copyrightlink: string;
  drk: number;
  enddate: string;
  fullstartdate: string;
  hs: any[];
  hsh: string;
  quiz: string;
  startdate: string;
  title: string;
  top: number;
  url: string;
  urlbase: string;
  wp: boolean;
}

export interface Tooltips {
  loading: string;
  next: string;
  previous: string;
  walle: string;
  walls: string;
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
    return axios.get<BingResponse>(
      "/bing/HPImageArchive.aspx?format=js&idx=0&n=7&mkt=zh-CN"
    );
  }
}
