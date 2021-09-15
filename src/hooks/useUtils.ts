import { useCallback } from 'react'
import { URL } from 'react-native-url-polyfill'

export const useUtils = () => {
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

  return { generateImageUrl, removeShoutWith, parseURLParams }
}
