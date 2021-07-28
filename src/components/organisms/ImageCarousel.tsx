import React, { useState, memo } from 'react'
import { Dimensions, ImageSourcePropType } from 'react-native'
import { Image } from 'react-native-elements'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { COLORS } from '@/constants/Colors'
import useColorScheme from '@/hooks/useColorScheme'
import NoImage from '../../../assets/images/20200501_noimage.png'

const imageWidth = Dimensions.get('window').width * 1.0

type Props = {
  images: string[]
}

export const ImageCarousel = memo(({ images }: Props) => {
  const colorScheme = useColorScheme()
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <>
      <Carousel
        data={images}
        renderItem={({ item }) => {
          const image = (item ? { uri: item as string } : NoImage) as ImageSourcePropType

          return (
            <Image
              source={image}
              placeholderStyle={{ backgroundColor: COLORS[colorScheme].background }}
              transition
              style={{
                width: imageWidth,
                height: imageWidth,
              }}
              resizeMode="contain"
            />
          )
        }}
        itemWidth={imageWidth}
        sliderWidth={imageWidth}
        onSnapToItem={(index: number) => setActiveSlide(index)} // for pagination
      />
      <Pagination
        dotsLength={images?.length} // dotの数
        activeDotIndex={activeSlide} // どのdotをactiveにするか
        containerStyle={{ paddingVertical: 9.19 }} // デフォルトではちと広い
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 5,
          marginHorizontal: 4,
          backgroundColor: COLORS[colorScheme].pink,
        }}
      />
    </>
  )
})
