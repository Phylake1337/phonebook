import axios from "axios"
const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = (person) => {
    return axios.post(baseUrl, person).then(response => response.data)
}

const remove = id => {
    const url = `${baseUrl}/${id}`
    const request = axios.delete(url)
    return request.then(response => response.data)
  }

const update = (id, updatedObject) => {
const url = `${baseUrl}/${id}`
const request = axios.put(url, updatedObject)
return request.then(response => response.data)
}

export default {
    getAll,
    create,
    remove,
    update
}