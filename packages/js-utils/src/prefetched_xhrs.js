

// These are helpful methods you can use along side the ruby ApplicationHelper::prefetch_xhr helper method in canvas

export function getPrefetchedXHR(id){
  return window.prefetched_xhrs && window.prefetched_xhrs[id]
}

/**
 * Transforms a `fetch` request into something that looks like an `axios` response
 * with a `.data` and `.headers` property, so you can pass it to our parseLinkHeaders stuff
 *
 * @param {Promise<Response>} fetchRequest
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export function asAxios(fetchRequest) {
  if (!fetchRequest) return
  return fetchRequest.then(checkStatus).then(res =>
    res.json().then(data => ({data, headers: {link: res.headers.get('Link')}}))
  )
}

/**
 * Takes a `fetch` request and returns a promise of the json data of the response
 *
 * @param {Promise<Response>} fetchRequest
 * @returns {Promise<JSON_data>}
 */
export function asJson(fetchRequest) {
  if (!fetchRequest) return
  return fetchRequest.then(checkStatus).then(res => res.json())
}

/**
 * Takes a `fetch` request and returns a promise of the text of the response
 *
 * @param {Promise<Response>} fetchRequest
 * @returns {Promise<USVString>}
 */
export function asText(fetchRequest) {
  if (!fetchRequest) return
  return fetchRequest.then(checkStatus).then(res => res.text())
}


/**
 * filter a response to raise an error on a 400+ status
 *
 * @param {Promise<Response>} response
 * @returns {Promise<Response>}
 */
export function checkStatus(response) {
  if (response.status < 400) {
    return response
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export const defaultFetchOptions = {
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json+canvas-string-ids, application/json'
  }
}
