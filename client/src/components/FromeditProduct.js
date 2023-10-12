import React, { useEffect , useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
//useParams เป็น Hook ที่ใช้ในการดึงพารามิเตอร์ จาก url ของเส้นทางปัจจุบัน
//useNavigate เป็น Hook ที่ใช้ในการสร้างฟังก์ชันการนำทางเพื่อเปลี่ยนเส้นทางในแอป
import { edit,Update } from '../function/product' //เรียกใช้งาน function edit update
const FromeditProduct = () => {
  const params = useParams() //params ดึง พารามิเตอร์ จาก url
  const navigate = useNavigate(); //ใช้สำหรับ rediract หน้า
  //ใช้สำหรับเก็บข้อมุล
  const [data, setData] = useState({
    name: '',
    detail: '',
    price: ''
})
// ทำหน้าที่ load ข้อมูลก่อน
  useEffect(() => {
    loadData(params.id) //ส่ง id ที่ได้จาก url ไป function loadData
  },[])


  const  handleChange = (e) =>{ 
    setData({
        ...data,
        [e.target.name] : e.target.value
        
    })
  } 
  // ดึงข้อมูลที่ทำการแก้ไข
  const loadData = async (id) => {
    edit(id)
    .then((res) => {
      setData(res.data.response.products) // set ข้อมูลที่ดึงมาให้อยู่ในตัวแปร data
    }).catch((err) => {
      alert(err.response.data.msg)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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
