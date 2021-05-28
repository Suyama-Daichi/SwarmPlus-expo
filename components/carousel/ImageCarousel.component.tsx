import React, { useState, memo, useRef, useCallback } from 'react'
import { Dimensions } from 'react-native'
import { Image } from 'react-native-elements'
import colors from '../../constants/Colors'
import Carousel, { Pagination } from 'react-native-snap-carousel'

const imageWidth = Dimensions.get('window').width * 1.0

export const ImageCarousel = memo((props: { images: string[] }) => {
  const { images } = props
  const [activeSlide, setActiveSlide] = useState(0)
  return (
    <>
      <Carousel
        data={images}
        renderItem={(d: any) => {
          return (
            <Image
              source={
                d.item ? { uri: d.item } : require('../../assets/images/20200501_noimage.png')
              }
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
