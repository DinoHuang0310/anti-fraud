# bt-template
[Demo](https://dinohuang0310.github.io/bt-template/) 

## 無客製化
  1. 下載[static](https://github.com/DinoHuang0310/bt-template/tree/main/static) 資料夾
  2. 編輯index.html、infoData.json、更換圖檔等
  3. 上線


## 客製化
  1. 下載專案
  2. 安裝並啟動dev模式
     ```sh
     npm install

     npm run dev
     ```
  3. 必要編輯檔案:
     ```sh
     .env
     public/infoData.json
     ```
  4. 編輯客製內容
     ```sh
     src/App.vue
     src/components/...
     ```
  5. 打包
     ```sh
     npm run build
     ```
  6. 上線dist資料夾內容

  <br>
  <br>

## infoData.json 格式

<table>
  <tr>
    <th>key</th>
    <th>type</th>
    <th>description</th>
  </tr>
  <tr>
    <td> menu </td>
    <td> Array </td>
    <td> 設定網站選單:
<pre>
[
  {
    "title": "item1",
    "url": "#item1", // 傳入連結位置或錨點
    "isAnchor": true, // 非必傳; 是否為錨點, 傳入true則將url視為錨點
    "className": 'home', // 非必傳; 添加自訂class name
  }
]
</pre>
    </td>
  </tr>
  <tr>
    <td> title </td>
    <td> String </td>
    <td> 主文標題 </td>
  </tr>
  <tr>
    <td> description </td>
    <td> String </td>
    <td> 主文描述 </td>
  </tr>
  <tr>
    <td> url </td>
    <td> String </td>
    <td> 主文連結 </td>
  </tr>
  <tr>
    <td> article </td>
    <td> Array </td>
    <td> 設定主文內容:
<pre>
[
  {
    "type": "h3", // 指定任意tag, 或"chart"及"youtube"
    "content": "小標文字",
    "className": "myClass myClass2" // 非必傳; 添加自訂class name
  },
  {
    "type": "img", // 傳入"img", content則傳入圖檔url
    "content": "image url..."
  },
  {
    "type": "chart", // 傳入"chart"視為圖表, content則傳入echarts options
    "content": { ... }
  },
  {
    "type": "youtube", // 傳入"youtube"視為播放器, content則傳入youtube影片id
    "content": "youtubeId"
  }
]
</pre>
    </td>
  </tr>
  <tr>
    <td> slider </td>
    <td> Object </td>
    <td> 輪播區塊:
<pre>
{
  "title": "延伸閱讀", // 輪播區塊標題
  "content": [
    {
      "title": "文章標題",
      "url": "文章link",
      "image": "圖檔url"
    }
  ]
}
</pre>
    </td>
  </tr>
  <tr>
    <td> news </td>
    <td> Object </td>
    <td> 新聞區塊:
<pre>
{
  "title": "更多新聞", // 新聞區塊標題
  "content": [
    {
      "title": "文章標題",
      "description": "文章描述",
      "url": "文章link",
      "image": "圖檔url"
    }
  ]
}
</pre>
    </td>
  </tr>
  <tr>
    <td> copyright </td>
    <td> Array </td>
    <td>
<pre>
[
  {
    "type": "p", // 指定任意tag
    "content": "Copyright © 2024 今周刊.All rights reserved. 版權所有，禁止擅自轉貼節錄",
    "className": ""
  }
]
</pre>
    </td>
  </tr>
</table>
