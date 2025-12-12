export interface GeoData {
  success: boolean;
  ip: string;
  mt_geo?: MeituanGeoData;
  ipsb?: IpSbGeoData;
}

export interface MeituanGeoData {
  lat: number;
  lng: number;
  country: string;
  province: string;
  city: string;
  district: string;
  detail: string;
}

export interface IpSbGeoData {
  isp: string;
  organization: string;
  asn: string;
  asn_organization: string;
  country: string;
  country_code: string;
  region: string;
  region_code: string;
  city: string;
  latitude: number;
  longitude: number;
}
