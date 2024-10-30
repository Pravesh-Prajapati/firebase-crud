import { useEffect, useState } from 'react'
import { db } from './Firebase-config';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';


function App() {
  let getUserdata = collection(db, "users")
  const [data, setdata] = useState({})
  let [list, setlist] = useState([])
  const [pos, setpos] = useState(null)
  useEffect(() => {
    setTimeout(() => {
      getuserdata()
    }, 1000);
  }, [])
  let getuserdata = () => {
    let getuser = async () => {
      let getdata = await getDocs(getUserdata)
      let newarr = []
      getdata.docs.map((val) => {
        let newobj = { ...val.data(), id: val.id }
        newarr.push(newobj)
      })
      setlist(newarr)
    }
    getuser()
  }
  // console.log(list);

  let setinput = (e) => {
    let { name, value } = e.target;
    setdata({ ...data, [name]: value })
  }
  let submit = async (e) => {
    e.preventDefault()
    if (pos) {
      // console.log(pos);
      console.log(data);
      let updatedata= await updateDoc(doc(getUserdata,pos),data)
      // console.log(updatedata);
    }
    else {
      let addata = await addDoc(getUserdata, data)
      console.log(addata);
      
    }
    getuserdata()
    setdata({})
  }
  let remove = async (userid) => {
    console.log(userid);
    let deletedata = await deleteDoc(doc(getUserdata, userid))
    getuserdata()
  }
  let updatedata = async (id) => {
    setpos(id)
    // console.log(id);
    let getobj = await getDoc(doc(getUserdata, id))
    // console.log(getobj.data());
    setdata(getobj.data())
    // setdata({})
  }

  
  return (
    <>
      <table border={1} align='center' style={{backgroundColor:"#404040",color:"white", fontWeight:"700", color:"white" ,boxShadow: "-10px 10px 5px 2px rgba(0,0,0,0.75)"}}>
        <tr>
          <td>Name</td>
          <td>Email</td>
          <td>Action</td>
        </tr>
        {list.map((val, i) => {
          // console.log(val); 
          return (
            <>
              <tr>
                <td style={{padding:"5px 20px"}}>{val.name}</td>
                <td style={{padding:"5px 20px"}}>{val.email}</td>
                <td style={{padding:"5px 20px"}}>
                  <button onClick={() => { remove(val.id) }}>Delete</button>
                  <button onClick={() => { updatedata(val.id) }}>Update</button>
                </td>
              </tr>
            </>
          )
        })
        }
      </table>

      <form action="" onSubmit={(e) => { submit(e) }} style={{ marginTop: "60px" }}>
        <table border={1} align='center' >
          <tr>
            <th style={{padding:"5px 20px"}}>Name</th>
            <th  style={{padding:"5px 20px"}}>Email</th>
          </tr>
          <tr>
            <td  >
              <input style={{padding:"5px 20px"}} type="text" value={data.name ? data.name : ""} name='name' onChange={(e) => { setinput(e) }} />
            </td>
            <td>
              <input style={{padding:"5px 20px"}} type="email" value={data.email ? data.email : ""} name='email' onChange={(e) => { setinput(e) }} />
            </td>
          </tr>
          <button type='submit' style={{ textAlign: "center" }}>{pos == null ? "submit" : "edit"}</button>
        </table>
      </form>

    </>
  )

}

export default App
