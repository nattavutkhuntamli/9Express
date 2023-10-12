import React ,{ useState , useEffect } from 'react'
import axios from 'axios'
import { Remove , CreatePro ,getData} from '../function/product';
import { Link } from 'react-router-dom';

function FormProduct() {
  // Javascript
  const [data, setData] = useState([]);
  const [form,setForm] = useState({})
  const [token,setToken] = useState(process.env.REACT_APP_AUTH_TOKEN)
 
useEffect(() => {
  loadData();
}, []); 

const loadData = async () => {
    getData()
    .then((res) => {
        setData(res.data.products)
    }).catch((err) => {
        console.log(err)
    })
 
};

const  handleChange = (e) =>{ 
    setForm({
        ...form,
        [e.target.name] : e.target.value
        
    })
}
 
 const handleSubmit = async (e) => {
    e.preventDefault()
    CreatePro(form).then((res) => { 
         if(res.status === 201){
            alert('บันทึกข้อมูลสำเร็จ')
            loadData()
         }
    }).catch(err => {
        alert(err.response.data.msg)
    })
 }

 const handleRemove = async (id) => {
    Remove(id)
    .then((res) => {
        if(res.status ===200){
            alert('ลบข้อมูลสำเร็จ')
            loadData()

        }
    }).catch((err) => {
        alert(err.response.data.msg)
    })
 }

  return (
    <div>
       {/* HTML */}
       <h1>Form crud</h1>

        <form onSubmit={handleSubmit}>
            <input type='text' name="name"  onChange={ e=> handleChange(e)} placeholder='ชื่อสินค้า'/><br/>
            <input type='text' name="detail"onChange={ e=> handleChange(e)} placeholder='รายละเอียดสินค้า'/><br/>
            <input type='text' name="price" onChange={ e=> handleChange(e)} placeholder='ราคาสินค้า'/><br/>
            <button type='submit'>Add Product</button>
        </form>
        <table border="1px" className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">ชื่อสินค้า</th>
                <th scope="col">รายละเอียด</th>
                <th scope="col">ราคา</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
               {
                  data ? data.map((item, index) =>
                    <tr key={index}>
                        <td scope='row'>{index+1}</td>
                        <td scope='row'>{item.name}</td>
                        <td scope='row'>{item.detail}</td>
                        <td scope='row'>{item.price}</td>
                        <td>
                            <button onClick={ ()=> handleRemove(item._id)}> ลบ</button> &nbsp;

                            <Link to={'/edit/'+item._id}>
                              <button> แก้ไข</button>
                            </Link>
                        </td>
                    </tr>

                  ) 
                  : null
               }
            </tbody>
        </table>
    </div>
  )
}

export default FormProduct
 