import React, { useState } from "react";
import "./updatep.scss";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UpdatePost = ({ setOpenUpdate, post }) => {
  const [desc, setDesc] = useState(post.desc);
  const [img, setImg] = useState(null);
  const [error, setError] = useState(null);

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      setError("Error uploading image");
      console.log(err);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (updatedPost) => {
      console.log(post);
      return makeRequest.put("/posts/" + post.id, updatedPost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
        setOpenUpdate(false);
      },
      onError: (error) => {
        setError("Error updating post");
        console.error(error);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    setError(null);

    let imgUrl = post.img;

    if (img) {
      imgUrl = await upload(img);
      if (!imgUrl) return; // Don't proceed if upload failed
    }

    mutation.mutate({ desc, img: imgUrl.imageUrl });
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Post</h1>
        <form>
          {error && <div className="error">{error}</div>}
          <div className="files">
            <label htmlFor="img">
              <span>Post Image</span>
              <div className="imgContainer">
                <img src={img ? URL.createObjectURL(img) : post.img} alt="" />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="img"
              style={{ display: "none" }}
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
          <label>Post Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <button onClick={handleClick}>Update Post</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default UpdatePost;
