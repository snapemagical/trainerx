import axios from 'axios'
const baseURL = process.env.REACT_APP_API_ENDPOINT
const commonParams = {}
export default function Fetch(endPoint, params, option, callback) {
  const method = option?.method ?? 'get'
  const inFormData = option?.inFormData ?? false // formType === true
  const cachedData = option?.cacheData;
  const url = option?.url
  let oneTimeApiCall = true
  let parameters = {
    ...commonParams,
    ...params,
  }
  const FetchHeader = (token) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    if (!token) {
      delete headers['Authorization']
    }
    return {
      headers,
    }
  }
  // console.log(window?.caches, window, params?.cacheKey, 'cached===');
  // const cacheKey = params?.cacheKey || {}
  // if (cacheKey in (window?.caches || {})) {
  //   callback && callback(window?.caches[cacheKey])
  //   cachedData && cachedData(window?.caches[cacheKey])
  // }
  const convertToForm = () => {
    let formData = new FormData()
    for (let name in parameters) {
      formData.append(name, parameters[name])
    }
    return formData
  }
  const fetch = (token) => {
    return axios[method](
      url ? url : baseURL + endPoint,
      inFormData
        ? convertToForm()
        : Object.keys(parameters)?.length
          ? parameters
          : FetchHeader(token),
      FetchHeader(token),
    )
      .then((d) => {
        const dataParse = { data: d.data, status: true }
        // if (cacheKey) {
        //   window.caches[cacheKey] = dataParse
        // }
        // callback && callback(dataParse)
        return dataParse
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          if(oneTimeApiCall){
            oneTimeApiCall=false
            return fetch(localStorage.token)
          }
        }else{
          return { ...err?.response?.data, status: false }
        }
      })
  }
  return fetch(localStorage.token)
}
export const refreshToken = async () => {
  return await Fetch('accounts/api/token/refresh/', { refresh: localStorage.refresh_token })
}