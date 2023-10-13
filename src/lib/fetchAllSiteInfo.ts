import { stationApi } from "@/config/apiConfig";
export interface siteInfo {
  country_code: string;
  area_code: string;
  type: number;
  status: number;
  station_no: string;
  name_tw: string;
  district_tw: string;
  address_tw: string;
  name_en: string;
  district_en: string;
  address_en: string;
  name_cn: string;
  district_cn: string;
  address_cn: string;
  parking_spaces: number;
  available_spaces: number;
  available_spaces_detail: { [key: string]: number };
  available_spaces_level: number;
  empty_spaces: number;
  forbidden_spaces: number;
  lat: string;
  lng: string;
  img: string;
  updated_at: Date;
  time: Date;
}

export default async function fetchAllSiteInfo(): Promise<siteInfo[]> {
  const res = await fetch(stationApi);
  return res.json();
}
