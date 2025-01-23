import { ref } from 'vue';
import api from '../services/api';

const info = ref({})

const menu = ref([
  {
    "title": "關於防詐",
    "url": "#about",
    "isAnchor": true
  },
  {
    "title": "165打詐儀錶板",
    "url": "#app",
    "isAnchor": true
  },
  {
    "title": "防詐影片",
    "url": "#media",
    "isAnchor": true
  },
  {
    "title": "防詐最前線",
    "url": "#slider",
    "isAnchor": true
  },
  {
    "title": "防詐大調查",
    "url": "#antiFraud",
    "isAnchor": true
  },
  {
    "title": "防詐守門員",
    "url": "#card",
    "isAnchor": true,
    "className": "hidden"
  },
  {
    "title": "防詐陣線",
    "url": "#corporate-sponsor",
    "isAnchor": true
  }
])

export default () => {
  const isDev = import.meta.env.DEV;

  const getInfo = () => {
    api.get(`${isDev ? '' : '.'}/infoData.json?${new Date().getTime()}`).then((response) => {
      if (typeof response === 'object') {
        info.value = response;
        getContent()
      } else {
        alert('取得文章錯誤')
        console.error(response);
      }

    }).catch((error) => {
      alert('取得文章失敗')
      console.error(error)
    })

    const getContent = () => {
      const mapping = (arr) => {
        return arr.map((item) => ({
          "title": item.title,
          "url": item.href,
          "image": (item.image_url || item.image_url_a)
          })
        )
      }
      
      const tagApiBase = `https://www.businesstoday.com.tw/tag/toJson/?v=${new Date().getTime()}&name=`
      api.get(`${tagApiBase}%E9%98%B2%E8%A9%90%E6%9C%80%E5%89%8D%E7%B7%9A`).then((response) => {
        if (response?.article_lists?.length) {
          info.value.slider = {
            "title": "防詐最前線",
            "content": mapping(response.article_lists)
          }
        } else {
          console.warn('"防詐最前線"暫無文章', response)
        }
      }).catch((error) => {
        console.error('取得"防詐最前線"錯誤: ', error)
      })

      api.get(`${tagApiBase}%E9%98%B2%E8%A9%90%E5%AE%88%E9%96%80%E5%93%A1`).then((response) => {
        if (response?.article_lists?.length) {
          info.value.news = {
            "title": "防詐守門員",
            "content": mapping(response.article_lists)
          }
        } else {
          console.warn('"防詐守門員"暫無文章', response)
        }
      }).catch((error) => {
        console.error('取得"防詐守門員"錯誤: ', error)
      })
    }
  }

  return {
    info,
    menu,
    getInfo,
  }
}