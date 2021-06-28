import { useCallback } from 'react'
import { useDate } from '@/hooks/useDate'
import { Checkins } from '@/types/Foursquare'
import { URL } from 'react-native-url-polyfill'

export const useUtils = () => {
  const { getDateString, getDateArray, getMinMaxDate } = useDate()

  /**
   * チェックインデータをAgendaItemsオブジェクトに変換
   * @param checkin チェックインオブジェクト
   * @returns AgendaItems: object
   */
  const convertAgendaObject = (checkin: Checkins) => {
    const hoge: any = checkin.items.reduce((result, current) => {
      const currentDateStr = getDateString(current.createdAt)
      const exist = result.find((f) => {
        return f.currentDateStr === currentDateStr
      })
      if (exist) {
        exist.current.push(current)
      } else {
        result.push({ currentDateStr, current: [current] })
      }
      return result
    }, [])

    const minMax = getMinMaxDate(hoge.map((m) => m.currentDateStr))

    const dateArray = getDateArray(minMax.min, minMax.max)

    const getArraysDiff = (array01: string[], array02: string) => {
      const arr01 = [...new Set(array01)],
        arr02 = [...new Set(array02)]
      return [...arr01, ...arr02].filter(
        (value) => !arr01.includes(value) || !arr02.includes(value)
      )
    }

    const noEventDays = getArraysDiff(
      dateArray,
      hoge.map((m) => m.currentDateStr)
    )

    const AgendaObject = Object.fromEntries(hoge.map((m) => [m.currentDateStr, m.current]))

    noEventDays.forEach((f) => {
      AgendaObject[f] = []
    })

    return AgendaObject
  }

  /**
   * 画像URLを生成
   * @param checkin チェックインオブジェクト
   * @returns AgendaItems: object
   */
  /**
   * 画像URLを生成
   * @param prefix
   * @param suffix
   * @param size サイズ
   * @returns {string} URL
   */
  const generateImageUrl = useCallback(
    (prefix: string, suffix: string, size: number | string = 'original') => {
      return `${prefix}${size}${suffix}`
    },
    []
  )

  /**
   * 誰かとチェックインした場合、シャウトの末尾に付いてしまう「〇〇と一緒に」を取り除く
   */
  const removeShoutWith = useCallback((shout: string) => {
    const regObj = RegExp(/((— |.).*(と一緒に))/g)
    return shout.replace(regObj, '')
  }, [])

  /**
   * URLのパラメータから指定のキーの値を取得する
   * @param rawUrl 対象のURL
   * @param key 取得したいパラメータのキー
   * @returns 取得した値
   */
  const parseURLParams = (rawUrl: string, key: string) => {
    const url = new URL(rawUrl)
    const params = url.searchParams

    if (params.has(key)) {
      return params.get(key)
    }
  }

  return { convertAgendaObject, generateImageUrl, removeShoutWith, parseURLParams }
}
