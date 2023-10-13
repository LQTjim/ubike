import { useEffect, useMemo, useState } from "react";
import styled from "@/styles/site-infomation.module.sass";
import searchSVG from "@/assets/search.svg";
import { SiteConfig, siteConfig } from "@/config/siteConfig";
import { siteInfo } from "@/lib/fetchAllSiteInfo";
import { loadingStatus } from "@/hooks/useFetchAll";

type Props = {
  status: loadingStatus;
  setKeyword: (val: string) => void;
  selectSite: string;
  setSelectSite: (val: keyof SiteConfig | string) => void;
  selectDistricts: string[];
  setSelectDistricts: React.Dispatch<React.SetStateAction<string[]>>;
  data: siteInfo[];
};
export default function Selector({
  status,
  setKeyword,
  selectSite,
  setSelectSite,
  selectDistricts,
  setSelectDistricts,
  data,
}: Props) {
  const [inputKeyword, setInputKeyword] = useState("");
  const districts = useMemo(() => {
    const computedDistricts = Array.from(
      new Set(data.map((v) => v.district_tw))
    );
    return computedDistricts;
  }, [data]);

  useEffect(() => {
    setSelectDistricts(districts);
  }, [data]);
  /* 控制選縣市 */
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectSite(e.target.value);
  };
  /* 控制搜尋關鍵字 
  一個是用來更新typing時的input內容
  且切換縣市時清空內容。
  另外一個當按下搜尋時才真正去做父層關鍵字的更新。
  */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimValue = e.target.value.trim();
    setInputKeyword(trimValue);
  };
  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setKeyword(inputKeyword);
    }
  };
  /* 控制全選站點 */
  const handleCheckedAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectDistricts(districts);
    } else {
      setSelectDistricts([]);
    }
  };
  /* 控制單選站點 */
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      setSelectDistricts((prev) => prev.filter((d) => d !== e.target.name));
    } else {
      setSelectDistricts((prev) => [...prev, e.target.name]);
    }
  };

  return (
    <div className={`${styled["selector-inner"]}`}>
      <div className={`${styled["selector-select-search"]}`}>
        <div className={`${styled["select-wrapper"]}`}>
          <select onChange={handleSelectChange} defaultValue={selectSite}>
            <option value="">選擇縣市</option>
            {
              /* 強型斷言object keys 返還的是type SiteConfig的key*/
              (Object.keys(siteConfig) as Array<keyof SiteConfig>).map((v) => {
                return (
                  <option key={v} value={v}>
                    {siteConfig[v]}
                  </option>
                );
              })
            }
          </select>
        </div>
        <div className={`${styled["search-wrapper"]}`}>
          <input
            type="text"
            placeholder="搜尋站點"
            value={inputKeyword}
            onChange={handleSearchChange}
            onKeyUp={handleSearchEnter}
          />
          <img src={searchSVG} alt="" />
        </div>
      </div>

      <label className={`${styled["checkall-wrapper"]}`}>
        <input
          type="checkbox"
          id="checkAll"
          checked={districts.length === selectDistricts.length}
          onChange={handleCheckedAll}
        />
        <span className={`${styled["check-mark"]}`}></span>
        <span>全部勾選</span>
      </label>

      <div className={`${styled["check-wrapper"]}`}>
        { status !== "succeeded"  ? (
          <>{Array(15).fill( <div className={`${styled["check-template"]}`}>&nbsp;</div>).map((v)=>v)}
          </>
        ) : (
          districts.map((el) => {
            return (
              <label key={el} className={`${styled["check"]}`}>
                <input
                  type="checkbox"
                  name={`${el}`}
                  id={`${el}`}
                  onChange={handleChecked}
                  checked={selectDistricts.includes(el)}
                />
                <span className={`${styled["check-mark"]}`}></span>
                <span>{el}</span>
              </label>
            );
          })
        )}
      </div>
    </div>
  );
}
