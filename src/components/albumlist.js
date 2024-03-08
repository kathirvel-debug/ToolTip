import { useEffect, useRef, useState } from 'react';

import { onSnapshot, collection, doc } from 'firebase/firestore'
import { db } from '../firebase-init';
import '../App.css';
function Addimage({ act, addimage, blogs, id, removing }) {
  const title = useRef();
  const url = useRef()
  const [check, Setcheck] = useState()
  const [arr, Setarr] = useState([])
  const [imageurl, Setimageurl] = useState([])
  const [formData, setformData] = useState({ imagename: "", urls: "" })
  const [b, setBlogs] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "ALBUM"), (snapShot) => {

      const dbdata = snapShot.docs.map((doc, i) => {
        return {
          id: doc.id,
          ...doc.data(),

        }
      })

      Setarr(dbdata)
    });
  }, [])

  function submit(e) {
    e.preventDefault()
    addimage(formData)
  }
  useEffect(() => {
    const album = arr.find(item => item.id === id);
    if (album) {
      Setcheck(album);
      console.log(album);
    }
  }, [id, arr]);
  //delete function data pass to the App.js
  // const removedImage=(d)=>{
  //   console.log("hi",d);
  // }
  function removedImage(image, url) {
    console.log("print", image, url);
    removing(image, url)
  }
  return (

    <>
      <button onClick={act} >Back</button>
      <div className="create">
        <div>
          <h1>Add an Image</h1>
        </div>
        <div className="searchbox-wrap">
          <input ref={title} type="text" placeholder="Title..."
            onChange={(e) => setformData({ imagename: e.target.value, urls: formData.urls })}
          />
        </div>
        <div className="searchbox-wrap">
          <input ref={url} type="text" placeholder="Image URL..."
            onChange={(e) => setformData({ imagename: formData.imagename, urls: e.target.value })}
          />
          <button onClick={submit}><span>Send</span> </button>
        </div>
      </div>
      <div id="container" >
        {check && check.region && check.region.map((x) => (
          <div class="image-area">
            <img src={x.urls} alt="Preview" />
            <a className="remove-image" onClick={() => removedImage(x.imagename, x.urls)} style={{ display: "inline" }}>&#215;</a>
          </div>

        ))}
      </div>
    </>
  )
}
export default Addimage