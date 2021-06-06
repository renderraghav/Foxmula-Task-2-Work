import axios from 'axios'
import {
    FETCH_TEMPERATURE_REQUEST,
    FETCH_TEMPERATURE_SUCCESS, 
    FETCH_TEMPERATURE_FAILURE
} from './temperatureTypes'

export const fetchTemperatureRequest = () => {
    return {
        type: FETCH_TEMPERATURE_REQUEST
    }
}

export const fetchTemperatureSuccess = temp => {
    return {
        type: FETCH_TEMPERATURE_SUCCESS,
        payload: temp
    }
}

export const fetchTemperatureFailure = error => {
    return {
        type: FETCH_TEMPERATURE_FAILURE,
        payload: error
    }
}

export const fetchTemperature = () => {
    return (dispatch) => {
        dispatch(fetchTemperatureRequest())
        axios
        .get(`http://api.openweathermap.org/data/2.5/weather?id=${process.env.REACT_APP_CITY_ID}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
        .then(respose => {
             const temp = respose.data.main.temp
             dispatch(fetchTemperatureSuccess(temp))
         })
         .catch(error => {
             const errorMsg = error.message
             dispatch(fetchTemperatureFailure(errorMsg))
         })
    }
}
