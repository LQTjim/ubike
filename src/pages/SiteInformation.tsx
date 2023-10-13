import React, { useState, useMemo, useEffect } from "react";
import styled from "@/styles/site-infomation.module.sass";
import bike from "@/assets/bike.svg";
import Selector from "@/components/Selector";

import Item from "@/components/Item";
import useFetchAll from "@/hooks/useFetchAll";
import { SiteConfig } from "@/config/siteConfig";

export default function SiteInformation() {
  const [selectSite, setSelectSite] = useState<keyof SiteConfig | string>("00");
  const [selectDistricts, setSelectDistricts] = useState<string[]>([]);
  const [keyword, setKeyword] = useState("");
  const { data, status } = useFetchAll();
  const selectSiteData = useMemo(() => {
    if (selectSite) return data.filter((el) => el.area_code === selectSite);
    return [];
  }, [data, selectSite]);
  useEffect(() => {
    setKeyword("");
  }, [selectSite]);

  const displayData = useMemo(() => {
    if (selectSite && selectDistricts.length > 0) {
      let filterData = selectSiteData.filter((v) =>
        selectDistricts.includes(v.district_tw)
      );
      if (keyword) {
        const filterWithDebouncedValueData = filterData.filter((v) =>
          v.name_tw.includes(keyword)
        );
        filterData = filterWithDebouncedValueData;
      }
      return (
        <>
          {filterData.length === 0 ? (
            <TrTemplate>搜尋站點不存在</TrTemplate>
          ) : (
            filterData.map((v) => <Item key={v.name_tw} {...v} />)
          )}
        </>
      );
    }
    return <TrTemplate>站點不存在</TrTemplate>;
  }, [keyword, data, selectDistricts]);
  /* 控制站點選擇 */

  /* if (selectDistricts.length > 0) {
    displayData = displayData.filter((v) => {
      return selectDistricts.includes(v.district_tw);
    });
  } */
  return (
    <section>
      <h1 className={`${styled["title"]}`}>站點資訊</h1>
      <div className={`${styled["selector-wrapper"]}`}>
        <div className={`${styled["selector-outer"]}`}>
          <Selector
            status={status}
            setKeyword={setKeyword}
            selectSite={selectSite}
            setSelectSite={setSelectSite}
            setSelectDistricts={setSelectDistricts}
            selectDistricts={selectDistricts}
            data={selectSiteData}
          />
        </div>
        <div className={`${styled["img-wrapper"]}`}>
          <img src={bike} alt="bike" />
        </div>
      </div>
      <div className={`${styled["table-wrapper"]}`}>
        <table className={`${styled["table"]}`}>
          <thead>
            <tr>
              <th>縣市</th>
              <th>區域</th>
              <th>站點名稱</th>
              <th>可借車輛</th>
              <th>可還空位</th>
            </tr>
          </thead>
          <tbody>
            {(status === "pending" && <TrTemplate>載入中...</TrTemplate>) ||
              (status === "succeeded" && displayData) || (
                <TrTemplate>請選擇縣市</TrTemplate>
              )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
type TrTemplateProps = { children?: React.ReactNode };
function TrTemplate({ children }: TrTemplateProps) {
  return (
    <tr>
      <td colSpan={5} style={{ textAlign: "center" }}>
        {children}
      </td>
    </tr>
  );
}
