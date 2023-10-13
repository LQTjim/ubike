export const siteConfig: SiteConfig = {
  "00": "臺北市",
  "05": "新北市",
  "0B": "新竹縣",
  "09": "新竹市",
  "10": "新竹科學園區",
  "0A": "苗栗縣",
  "01": "臺中市",
  "08": "嘉義市",
  "13": "臺南市",
  "12": "高雄市",
  "14": "屏東縣",
};
/* 不用enum是因為api給的key像是10什麼的會被當成 numeric 無法成為key值*/
export type SiteConfig = {
  "00": "臺北市";
  "05": "新北市";
  "0B": "新竹縣";
  "09": "新竹市";
  "10": "新竹科學園區";
  "0A": "苗栗縣";
  "01": "臺中市";
  "08": "嘉義市";
  "13": "臺南市";
  "12": "高雄市";
  "14": "屏東縣";
};