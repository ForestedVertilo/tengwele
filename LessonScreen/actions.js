import { types } from './reducer'

export const actions = {
    setLoading: (loading) => ({ type: types.SET_LOADING, payload: loading })
}