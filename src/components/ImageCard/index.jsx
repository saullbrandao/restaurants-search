import { LoadingSkeleton } from 'components/Skeleton/index'
import React, { useEffect, useState } from 'react'
import * as S from './styles'

export const ImageCard = ({ photo, title }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  useEffect(() => {
    const imageLoader = new Image()
    imageLoader.src = photo
    imageLoader.onload = () => setIsImageLoaded(true)
  }, [photo])

  return (
    <>
      {isImageLoaded ? (
        <S.Card photo={photo}>
          <S.Title>{title}</S.Title>
        </S.Card>
      ) : (
        <LoadingSkeleton width="90px" height="90px" />
      )}
    </>
  )
}
