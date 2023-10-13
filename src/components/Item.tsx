import { SiteConfig, siteConfig } from "@/config/siteConfig";
import { siteInfo } from "@/lib/fetchAllSiteInfo";

/* sno(站點代號)、sna(中文場站名稱)、tot(場站總停車格)、sbi(可借車位數)、sarea(中文場站區域)、mday(資料更新時間)、lat(緯度)、lng(經度)、ar(中文地址)、sareaen(英文場站區域)、snaen(英文場站名稱)、aren(英文地址)、bemp(可還空位數)、act(場站是否暫停營運) */
export default function Item({
  area_code,
  district_tw,
  name_tw,
  available_spaces,
  empty_spaces,
}: siteInfo) {
  return (
    <tr>
      <td>{siteConfig[area_code as keyof SiteConfig]}</td>
      <td>{district_tw}</td>
      <td>{name_tw}</td>
      <td>{available_spaces}</td>
      <td>{empty_spaces}</td>
    </tr>
  );
}
