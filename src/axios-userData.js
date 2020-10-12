import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-myproject-1007c.firebaseio.com/'
})

export default instance;