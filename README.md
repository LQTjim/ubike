2.0
https://apis.youbike.com.tw/json/station-yb2.json
https://apis.youbike.com.tw/json/area-all.json
{
"00":"臺北市",
"05":"新北市",
"0B":"新竹縣",
"09":"新竹市",
"10":"新竹科學園區",
"0A":"苗栗縣",
"01":"臺中市",
"08":"嘉義市",
"13":"臺南市",
"12":"高雄市",
"14":"屏東縣",
}

---

寫比較久的地方在於 Selector 相關的型別分配
本來想用 enum 去限制範圍，但是 API 拿到的 code 是上面的 00、10 等等的值，而像是 10、12 這些都會被視為 numericnn 所以不好用，
且我把選擇縣市這個選項的值設為""(空字串)，最後是先決定是用物件 mapping 這些值和對應的字。
然後後面麻煩的點在傳遞設定縣市的 value 在預設的情況由 e.target.value 決定 input 內的屬性 text 已經決定這個 value 的 type 是 string 了
