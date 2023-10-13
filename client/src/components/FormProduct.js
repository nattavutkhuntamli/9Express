import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Remove , CreatePro ,getData} from '../function/product';
import { Link } from 'react-router-dom';

function FormProduct() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    name: '',
    detail: '',
    price: '',
    file: null, // ใช้สำหรับการเลือกไฟล์
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      getData().then((response) =>{
          setData(response.data.products);
      }) 
      .catch((error) => {
        console.log(error)
      })
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการโหลดข้อมูลสินค้า:', error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setForm({
        ...form,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!form.file) {
        alert('กรุณาเลือกไฟล์รูปภาพ');
        return;
      }

      const formData = new FormData();
      for(const key in form){
        formData.append(key,form[key])
      }

        CreatePro(formData).then((res) => { 
            if(res.status === 201){
              alert('อัปโหลดรูปภาพและข้อมูลสินค้าสำเร็จ');
              setForm({
                name: '',
                detail: '',
                price: '',
                file: null,
              });
              loadData();
            }
        }).catch(err => {
            alert(err.response.data.msg)
        })
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพและข้อมูลสินค้า:', error);
      alert('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพและข้อมูลสินค้า');
    }
  };
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
      <h1>Form crud</h1>

      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <input type='text' name="name" value={form.name} onChange={handleChange} placeholder='ชื่อสินค้า' /><br />
        <input type='text' name="detail" value={form.detail} onChange={handleChange} placeholder='รายละเอียดสินค้า' /><br />
        <input type='text' name="price" value={form.price} onChange={handleChange} placeholder='ราคาสินค้า' /><br />
        <input type='file' name="file" onChange={handleChange} placeholder='รูปสินค้า' /><br />
        <button type='submit'>Add Product</button>
      </form>
      {/* ตารางแสดงข้อมูลสินค้า */}
      <table border="1px" className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ชื่อสินค้า</th>
            <th scope="col">รูปสินค้า</th>
            <th scope="col">รายละเอียด</th>
            <th scope="col">ราคา</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <td scope='row'>{index + 1}</td>
              <td scope='row'>{item.name}</td>
              <td scope='row'><img src={item.file} width={'100px'} height={'60px'}/></td>
              <td scope='row'>{item.detail}</td>
              <td scope='row'>{item.price}</td>
              <td>
                <button onClick={() => handleRemove(item._id)}>ลบ</button> &nbsp;
                <Link to={`/edit/${item._id}`}>
                  <button>แก้ไข</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormProduct;
