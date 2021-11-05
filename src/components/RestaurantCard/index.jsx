import React, { useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import restaurantImg from 'assets/restaurant-fake.png'
import { LoadingSkeleton } from 'components/Skeleton/index'
import * as S from './styles'

export const RestaurantCard = ({ restaurant, onClick }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <S.Restaurant onClick={onClick}>
      <S.RestaurantInfo>
        <S.Title>{restaurant.name}</S.Title>
        <ReactStars count={5} isHalf value={restaurant.rating} activeColor="#e7711c" edit={false} />
        <S.Address>{restaurant.vicinity || restaurant.formatted_address}</S.Address>
      </S.RestaurantInfo>
      <S.RestaurantPhoto
        isLoaded={isImageLoaded}
        src={restaurant.photos ? restaurant.photos[0].getUrl() : restaurantImg}
        onLoad={() => setIsImageLoaded(true)}
        alt="Foto do Restaurante"
      />
      {!isImageLoaded && <LoadingSkeleton width="100px" height="100px" />}
    </S.Restaurant>
  )
}
