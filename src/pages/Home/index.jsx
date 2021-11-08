/* eslint-disable camelcase */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import TextField, { Input } from '@material/react-text-field'
import MaterialIcon from '@material/react-material-icon'
import { ImageCard } from 'components/ImageCard'
import { Loader } from 'components/Loader'
import { Map } from 'components/Map'
import { Modal } from 'components/Modal'
import { RestaurantCard } from 'components/RestaurantCard'
import { LoadingSkeleton } from 'components/Skeleton'
import restaurantImg from 'assets/restaurant-fake.png'
import logo from 'assets/logo.svg'
import * as S from './styles'

export const HomePage = () => {
  const [inputValue, setInputValue] = useState('')
  const [query, setQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [placeId, setPlaceId] = useState(null)
  const { restaurants, restaurantSelected } = useSelector((state) => state.restaurantsReducer)

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    adaptiveHeight: true,
    arrows: false,
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') setQuery(inputValue)
  }

  const renderRestaurants = () => {
    if (restaurants.length === 0) return null
    return restaurants.map((restaurant) => (
      <RestaurantCard
        key={restaurant.place_id}
        restaurant={restaurant}
        onClick={() => {
          setPlaceId(restaurant.place_id)
          setIsModalOpen(true)
        }}
      />
    ))
  }

  const renderCarousel = () => {
    if (restaurants.length === 0) return <Loader />
    return (
      <>
        <S.CarouselTitle size="large">Na sua Área</S.CarouselTitle>
        <S.Carousel {...settings}>
          {restaurants.map((restaurant) => (
            <ImageCard
              key={restaurant.place_id}
              title={restaurant.name}
              photo={restaurant.photos ? restaurant.photos[0].getUrl() : restaurantImg}
            />
          ))}
        </S.Carousel>
      </>
    )
  }

  return (
    <S.Wrapper>
      <S.Container>
        <S.Search>
          <S.Logo src={logo} alt="Logo do Restaurant Finder" />
          <TextField
            label="Pesquisar"
            trailingIcon={<MaterialIcon role="button" icon="search" />}
            outlined>
            <Input
              value={inputValue}
              onKeyPress={handleKeyPress}
              onChange={(e) => setInputValue(e.currentTarget.value)}
            />
          </TextField>
          {renderCarousel()}
        </S.Search>
        {renderRestaurants()}
      </S.Container>
      <Map query={query} placeId={placeId} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(!isModalOpen)}>
        {restaurantSelected ? (
          <>
            <S.ModalTitle>{restaurantSelected?.name}</S.ModalTitle>
            <S.ModalContent>{restaurantSelected?.formatted_phone_number}</S.ModalContent>
            <S.ModalContent>{restaurantSelected?.formatted_address}</S.ModalContent>
            <S.ModalContent>
              {restaurantSelected?.opening_hours?.open_now
                ? 'Aberto agora'
                : 'Fechado neste momento'}
            </S.ModalContent>
          </>
        ) : (
          <>
            <LoadingSkeleton width="10px" height="10px" />
            <LoadingSkeleton width="10px" height="10px" />
            <LoadingSkeleton width="10px" height="10px" />
            <LoadingSkeleton width="10px" height="10px" />
          </>
        )}
      </Modal>
    </S.Wrapper>
  )
}
