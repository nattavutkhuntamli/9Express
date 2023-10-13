import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
//useParams เป็น Hook ที่ใช้ในการดึงพารามิเตอร์ จาก url ของเส้นทางปัจจุบัน
//useNavigate เป็น Hook ที่ใช้ในการสร้างฟังก์ชันการนำทางเพื่อเปลี่ยนเส้นทางในแอป
import { edit, Update } from "../function/product"; //เรียกใช้งาน function edit update
const FromeditProduct = () => {
  const params = useParams(); //params ดึง พารามิเตอร์ จาก url
  const navigate = useNavigate(); //ใช้สำหรับ rediract หน้า
  //ใช้สำหรับเก็บข้อมุล
  const [data, setData] = useState({
    name: "",
    detail: "",
    price: "",
    file: null, // ใช้สำหรับการเลือกไฟล์
  });

  const [fileold, setFileOld] = useState();

  // ทำหน้าที่ load ข้อมูลก่อน
  useEffect(() => {
    loadData(params.id); //ส่ง id ที่ได้จาก url ไป function loadData
  }, []);

  // ดึงข้อมูลที่ทำการแก้ไข
  const loadData = async (id) => {
    edit(id)
      .then((res) => {
        let result = {
          _id: res.data.response.products._id,
          name: res.data.response.products.name,
          file: res.data.response.products.file.split("/")[3],
          price: res.data.response.products.price,
          detail: res.data.response.products.detail,
        };
        setData(result); // set ข้อมูลที่ดึงมาให้อยู่ในตัวแปร data
        setFileOld(result.file); // set เก็บชื่อข้อมูลรูปเก่า
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };
  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setData({
        ...data,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    console.log(fileold);
    const formData = new FormData();
    for (const key in data) {
      console.log(data[key])
      formData.append(key, data[key]);
    }
    formData.append("fileold", fileold);
    Update(params.id, formData)
      .then((res) => {
        alert("อัพเดทสำเร็จ");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1>Form Edit id :: {params.id}</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          onChange={(e) => handleChange(e)}
          placeholder="name"
          value={data.name}
        />{" "}
        <br />
        <input
          type="text"
          name="detail"
          placeholder="detail"
          value={data.detail}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <input
          type="text"
          name="price"
          placeholder="price"
          value={data.price}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <input
          type="file"
          name="file"
          onChange={(e) => handleChange(e)}
          placeholder="รูปสินค้า"
        />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default FromeditProduct;
