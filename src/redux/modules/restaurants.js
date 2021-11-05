export const Types = {
  SET_RESTAURANTS: 'restaurants/SET_RESTAURANTS',
  SET_RESTAURANT: 'restaurants/SET_RESTAURANT',
}
const initialState = {
  restaurants: [],
  restaurantSelected: null,
}

export const restaurantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_RESTAURANTS:
      return { ...state, restaurants: action.payload }
    case Types.SET_RESTAURANT:
      return { ...state, restaurantSelected: action.payload }
    default:
      return state
  }
}

export const setRestaurants = (restaurants) => {
  return {
    type: Types.SET_RESTAURANTS,
    payload: restaurants,
  }
}

export const setRestaurant = (restaurant) => {
  return {
    type: Types.SET_RESTAURANT,
    payload: restaurant,
  }
}
