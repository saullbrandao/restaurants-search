/* eslint-disable camelcase */
import TextField, { Input } from '@material/react-text-field'
import MaterialIcon from '@material/react-material-icon'
import React, { useState } from 'react'
import { ImageCard } from 'components/ImageCard'
import logo from 'assets/logo.svg'
import restaurantImg from 'assets/restaurant-fake.png'
import { RestaurantCard } from 'components/RestaurantCard'
import { Modal } from 'components/Modal'
import { Map } from 'components/Map'
import { Loader } from 'components/Loader'
import { useSelector } from 'react-redux'
import { LoadingSkeleton } from 'components/Skeleton/index'
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
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') setQuery(inputValue)
  }

  const handleOpenModal = (placeId) => {
    setPlaceId(placeId)
    setIsModalOpen(true)
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
          {restaurants.length > 0 ? (
            <>
              <S.CarouselTitle>Na Sua Área</S.CarouselTitle>
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
          ) : (
            <Loader />
          )}
        </S.Search>
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.place_id}
            restaurant={restaurant}
            onClick={() => {
              handleOpenModal(restaurant.place_id)
            }}
          />
        ))}
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
