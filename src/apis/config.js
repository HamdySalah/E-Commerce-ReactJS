import axios from "axios";

const instance= axios.create({
    baseURL:'https://dummyjson.com/products'
})

export default  instance;