import React, { useState, memo } from 'react'
import { Dimensions, ImageSourcePropType } from 'react-native'
import { Image } from 'react-native-elements'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import colors from '@/constants/Colors'

const imageWidth = Dimensions.get('window').width * 1.0

type Props = {
  images: string[]
}

export const ImageCarousel = memo(({ images }: Props) => {
  const [activeSlide, setActiveSlide] = useState(0)
  return (
    <>
      <Carousel
        data={images}
        renderItem={(d) => {
          const image = (
            d.item
              ? { uri: d.item as string }
              : require('../../../assets/images/20200501_noimage.png')
          ) as ImageSourcePropType

          return (
            <Image
              source={image}
              placeholderStyle={{ backgroundColor: colors.light.background }}
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
          backgroundColor: colors.light.pink,
        }}
      />
    </>
  )
})
