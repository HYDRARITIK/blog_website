import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
// import { uploadImage } from "../../../api/utils/image_storage";

const Write = () => {
  const location = useLocation();
  console.log(location);
  const state=location.state;
  const post_id=location.pathname.split('/')[2] || null
 
  console.log("previous stored state is->",state)

 


  const [content, setContent] = useState("");
  const [title, setTitle] = useState( "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");

  
// for creating image url to be stored in database
  const Upload = async (filee) => {
    
 try {
    const data = new FormData();
    const filename = Date.now() + filee;
    data.append("name", filename);
    data.append("file", filee);
    setFile(filename);
    const resp=await axios.post("http://localhost:8000/api/upload", data);
    console.log("image sent",resp.data);
  
 } catch (error) {
    console.log(error);
 }


  };

  //update post
  const updatePost = async () => {
    const imageurl = await Upload();
    //get user id from cookie
   
    const resp = await axios.patch(
      `http://localhost:8000/api/posts/post/${post_id}`,
      {
        title:title,
        content: content,
        category: cat
      }
    );
    console.log(resp.data);
  };

  //create post

    const createPost=async ()=>{
      const imageurl=await Upload();

      console.log(document.cookie);
      //checking user_id from cookie
      // const userid = JSON.parse(
      //   document.cookie.split("=")[1].split(";")[0]
      // )._id;
      // console.log("userid", userid);
  
      const resp=await axios.post('http://localhost:8000/api/posts', {
        title:title,
        content: content,
        category: cat,
        image: file?imageurl:"",
        _id:"63f3a2f30d97eb90862bf71f"
      
  
      }
      )
      console.log(resp.data);
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    //if there is already previous state then update the post else create a new post
    post_id ? updatePost() : createPost();
   
  }
  const handleImage=(e)=>{
    e.preventDefault();
  Upload();
  }



  useEffect(()=>{

    const fetchdetails=async()=>{
      const pathSplit = location.pathname.split('/');
      const post_id = pathSplit.length <= 2 ? "":  pathSplit[2];
      console.log("category--->",post_id);
      const resp=await axios.get(`http://localhost:8000/api/posts/post/${post_id}`)
      const _state=resp.data
      console.log("see this",_state);
      setContent(_state.content);
      setTitle(_state.title);
      setCat(_state.category);
      setFile(_state.image);
      
    }
    
    fetchdetails();
  },[location])


  
  return (
    <div className="add">
    <div className="content">
      <input
        type="text"
        placeholder="Title"
        value = {title}
        onChange={(e) => {setTitle(e.target.value)
        console.log(title)}
        }
      />
      <div className="editorContainer">
        <ReactQuill
          className="editor"
          theme="snow"
          value={content}
          onChange={setContent}
        />
      </div>
    </div>
    <div className="menu">
      <div className="item">
        <h1>Publish</h1>
        <span >
          <b>Status: </b> Draft
        </span>
        <span>
          <b>Visibility: </b> Public
        </span>
        <input
          style={{ display: "none" }}
          type="file"
          id="file"
          name=""
          onChange={(e) => {
            setFile(e.target.files[0])
            // Upload(e.target.files[0])
          }}
        />
        <label className="file" htmlFor="file">
          Upload Image
        </label>
        <div className="buttons">
          <button>Save as a draft</button>
          <button onClick={handleSubmit}>Publish</button>
        </div>
      </div>
      <div className="item">
        <h1>Category</h1>
        <div className="cat">
          <input
            type="radio"
            checked={cat === "art"}
            name="cat"
            value="art"
            id="art"
            onChange={(e) => setCat(e.target.value)}
          />
          <label htmlFor="art">Art</label>
        </div>
        <div className="cat">
          <input
            type="radio"
            checked={cat === "science"}
            name="cat"
            value="science"
            id="science"
            onChange={(e) => setCat(e.target.value)}
          />
          <label htmlFor="science">Science</label>
        </div>
        <div className="cat">
          <input
            type="radio"
            checked={cat === "technology"}
            name="cat"
            value="technology"
            id="technology"
            onChange={(e) => setCat(e.target.value)}
          />
          <label htmlFor="technology">Technology</label>
        </div>
        <div className="cat">
          <input
            type="radio"
            checked={cat === "cinema"}
            name="cat"
            value="cinema"
            id="cinema"
            onChange={(e) => setCat(e.target.value)}
          />
          <label htmlFor="cinema">Cinema</label>
        </div>
        <div className="cat">
          <input
            type="radio"
            checked={cat === "design"}
            name="cat"
            value="design"
            id="design"
            onChange={(e) => setCat(e.target.value)}
          />
          <label htmlFor="design">Design</label>
        </div>
        <div className="cat">
          <input
            type="radio"
            checked={cat === "food"}
            name="cat"
            value="food"
            id="food"
            onChange={(e) => setCat(e.target.value)}
          />
          <label htmlFor="food">Food</label>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Write;
