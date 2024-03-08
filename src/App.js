
import { useEffect, useState } from 'react';
import './App.css';
import Createalbum from './components/createalbum';
import Addimage from './components/albumlist';
import Components from './components/Component';
import { db } from './firebase-init';

import { collection, deleteDoc, doc, getDocs, onSnapshot, setDoc, arrayRemove, updateDoc, arrayUnion, query, FieldValue } from "firebase/firestore";




function App() {
  async function deleteRegionAtIndex(documentId, regionIndex) {
    try {
      const docRef = doc(db, 'kathir', documentId);
      await updateDoc(docRef, {
        region: arrayRemove(regionIndex)
      });
      console.log('Region deleted successfully.');
    } catch (error) {
      console.error('Error deleting region:', error);
    }
  }




  const [tigger, Settrigger] = useState(false)
  const [tigger1, Settrigger1] = useState(true)
  const [blogs, setBlogs] = useState([]);
  const [id, setid] = useState([]);
  const [arr, Setarr] = useState([])
  

  //Read the data for inital rendering
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "ALBUM"), (snapShot) => {

      const dbdata = snapShot.docs.map((doc, i) => {
        return {
          id: doc.id,
          ...doc.data(),

        }
      })

      setBlogs(dbdata)
    });
  }, [])
  //Function Add to firebaseDB
  const addDate = async (data) => {

    try {
      const docref = doc(collection(db, "ALBUM"))
      await setDoc(docref, {
        title: data.name,
        date: data.date
      })
    } catch (err) {
      console.log(err);
    } finally {
      console.log(data.name);
    }
  }
//Function to add the images is array union
  const addimage = async (data) => {
    var frankDocRef = doc(db, "ALBUM", id);
    await updateDoc(frankDocRef, {
      region: arrayUnion(data)
    });

    console.log("testing", data);
    setBlogs(blogs)
  }
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "kathir"), (snapShot) => {

      const dbdata = snapShot.docs.map((doc, i) => {
        return {
          id: doc.id,
          ...doc.data(),

        }
      })

      Setarr(dbdata)
    });
  }, [])
  //Function to removing the images
  const removing = async (name, image) => {
    var frankDocRef = doc(db, "ALBUM", id);
    try {
      await updateDoc(frankDocRef, {
        region: arrayRemove({ imagename: name, urls: image })

      });
      console.log("sucess");
    } catch (e) {
      console.log(e);
    }
    setBlogs(blogs)

  }



  const active = () => {
    Settrigger((tigger) => !tigger)
  }
  //Add the image is array un
  const active1 = (id) => {
    Settrigger1((tigger1) => !tigger1)
    console.log(id);
    setid(id)
  }



  return (
    <>
      {/* <Addimage /> */}
      {tigger ? <Createalbum addDate={addDate} /> : null}
      {tigger1 ? <Components blogs={blogs}
        active={active}
        active1={active1}
        tigger={tigger} />
        : <Addimage id={id} act={active1} blogs={blogs} addimage={addimage} removing={removing} />}

    </>
  );
}

export default App;
