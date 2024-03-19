import axios from "axios";

//----------
//TODO:Cambiar a variable de entorno 
const URL = 'http://localhost:4000/app'
//-----------
const clienteAxios = axios.create({
    baseURL:`${URL}`
});

export {
    clienteAxios
}