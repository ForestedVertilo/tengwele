import { combineReducers } from 'redux'
import { reducer as lessonReducer, NAME as LESSON_NAME } from './LessonScreen/reducer'

const appReducer = combineReducers({
    [LESSON_NAME]: lessonReducer
  })
  
  export default appReducer