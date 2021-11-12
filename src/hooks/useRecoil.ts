import { atom, useRecoilState } from 'recoil'

const requestAtom = atom<{ url: string; request: Promise<any> }[]>({
  key: 'request',
  default: [],
})

const selectedDateOnMapAtom = atom<Date | undefined>({
  key: 'selectedDateOnMap',
  default: undefined,
})

export const useRecoil = () => {
  const [selectedDateOnMap, setSelectedDateOnMap] = useRecoilState(selectedDateOnMapAtom)
  const [requestCache, setRequestCache] = useRecoilState(requestAtom)

  return {
    requestCache,
    setRequestCache,

    selectedDateOnMap,
    setSelectedDateOnMap,
  }
}
