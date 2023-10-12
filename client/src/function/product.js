import axios from "axios";

const token = process.env.REACT_APP_AUTH_TOKEN

export const getData   = async() => await axios.get(process.env.REACT_APP_API+'/product/', {
    headers: {
      'authtoken': token,
    }
  })

export const edit   = async(id) => await axios.get(process.env.REACT_APP_API+'/product/'+id, {
    headers: {
        'authtoken': token,
    }
})

export const CreatePro = async(form) => await axios.post(process.env.REACT_APP_API+'/product/',form,{
    headers: {
        'authtoken': token,
    }
})
export const Remove = async(id) => await axios.delete(process.env.REACT_APP_API+'/product/'+id,{
    headers:{
        'authtoken': token,
    }
})

export const Update  = async(id,data) => {
    return  await axios.put(process.env.REACT_APP_API+'/product/'+id,data,{
        headers:{
            'authtoken': token,
        }
    })
} 