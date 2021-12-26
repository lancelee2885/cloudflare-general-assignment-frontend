import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function AddPost() {
  const initialData = { title: "", username: "", content: "", type: "text" }
  const [formData, setFormData] = useState(initialData);
  const [err, setErr] = useState([]);
  const navigate = useNavigate();

  function handleChange(evt) {
    const input = evt.target;
    setFormData(formData => ({
      ...formData,
      [input.name]: input.value,
    }));
    console.log(formData)
  }

  function selectPostType(type) {
    if (type === 'text') {
      return (
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            rows="10"
            className="form-control"
            name="content"
            id="content"
            onChange={handleChange}
            value={formData.content}
            style={{ width: "30rem", margin: "10px auto" }}
          />
        </div>
      )
    }
    if (type === 'image') {
      return (

        <div>
          <label htmlFor="content">Image</label>
          <input
            type='url'
            className="form-control"
            name="content"
            id="content"
            onChange={handleChange}
            value={formData.content}
            style={{ width: "30rem", margin: "10px auto" }}
          />
        </div>
      )
    }
    if (type === 'link') {
      return (

        <div>
          <label htmlFor="content">Link</label>
          <input
            type='url'
            className="form-control"
            name="content"
            id="content"
            onChange={handleChange}
            value={formData.content}
            style={{ width: "30rem", margin: "10px auto" }}
          />
        </div>
      )
    }
  }

  /**
   *  calls handleSignUp upon submiting
   */
  async function handleSubmit(evt) {
    evt.preventDefault();

    const SUBMISSION_URL = 'https://workers.lancelee28851234.workers.dev/posts';
    const fields = {
      title: formData.title,
      username: formData.username,
      content: formData.content,
      type: formData.type,
    }
    try {
      await axios.post(SUBMISSION_URL, fields)
      navigate('/');
      toast.success('Post added, it can take up to a minute to update')
    } catch (e) {
      setErr(e);
    }
  }

  return (
    <div className="add-form text-center">
      <h1>Add a Post</h1>
      <form className="form-group " onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            className="form-control"
            name="title"
            id="title"
            onChange={handleChange}
            value={formData.title}
            style={{ width: "30rem", margin: "10px auto" }}
          />
        </div>
        <div>
          <label htmlFor="type">Post Type</label>
          <select
            className="form-control"
            name="type"
            id="type"
            onChange={handleChange}
            value={formData.type}
            style={{ width: "30rem", margin: "10px auto" }}
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="link">Link</option>
          </select>
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            name="username"
            id="username"
            onChange={handleChange}
            value={formData.username}
            style={{ width: "30rem", margin: "10px auto" }}
          />
        </div>
        {selectPostType(formData.type)}
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
      {/* <Error errors={err}/> */}
    </div>
  )
}

export default AddPost;