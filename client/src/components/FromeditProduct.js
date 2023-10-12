import React, { useEffect , useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
//useParams เป็น Hook ที่ใช้ในการดึงพารามิเตอร์ จาก url ของเส้นทางปัจจุบัน
//useNavigate เป็น Hook ที่ใช้ในการสร้างฟังก์ชันการนำทางเพื่อเปลี่ยนเส้นทางในแอป
import { edit,Update } from '../function/product'
const FromeditProduct = () => {
  const params = useParams()
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    detail: '',
    price: ''
})
  useEffect(() => {
    loadData(params.id)
  },[])

  const  handleChange = (e) =>{ 
    setData({
        ...data,
        [e.target.name] : e.target.value
        
    })
  } 
  const loadData = async (id) => {
    edit(id)
    .then((res) => {
      setData(res.data.response.products)
    }).catch((err) => {
      alert(err.response.data.msg)
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(data)
    Update(params.id, data)
        .then(res => {
            alert('อัพเดทสำเร็จ')
            navigate('/')
        })
        .catch((err) => console.log(err))
}
  return (
    <div>
      <h1>Form Edit id :: {params.id}</h1>
        <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='name'
                    onChange={e => handleChange(e)}
                    placeholder='name'
                    value={data.name}
                /> <br />

                <input type='text'
                    name='detail'
                    placeholder='detail'
                    value={data.detail}
                    onChange={e => handleChange(e)}
                /><br />

                <input
                    type='text'
                    name='price'
                    placeholder='price'
                    value={data.price}
                    onChange={e => handleChange(e)} />
                <br />
                <button>Submit</button>
        </form>
    </div>
  )

}

export default FromeditProduct
