export const initialState = {
    isLoading: false
  }
  
  export const NAME = 'LessonScrean'
  
  export const types = {
    SET_LOADING: `${NAME}/SET_LOADING`
  }
  
  export function reducer (state = initialState, action) {
    switch (action.type) {
      case types.SET_LOADING:
        return {
          ...state,
          isLoading: action.payload
        }
      default:
        return { ...state }
    }
  }
  