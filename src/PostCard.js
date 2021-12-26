import React, { useState } from 'react';
import './PostCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import axios from 'axios';

function PostCard({ data }) {

  const { title, username, content, createdAt, type, votes, comments } = data;
  const [commentsData, setCommentsData] = useState(comments);
  const [newComment, setNewComment] = useState({ content: "", createdAt: null });
  const [newVotes, setNewVotes] = useState(votes);

  function getDate(time) {
    let date = new Date(time);
    return date.toLocaleString();
  }

  function upvote() {
    setNewVotes((v) => {
      return v + 1;
    });
    try {
      const PUT_API_URL = 'https://workers.lancelee28851234.workers.dev/posts'
      const fields = { ...data, votes: newVotes + 1 }
      axios.put(PUT_API_URL, fields);
      toast.success('You liked a post.');
    } catch (e) {
      console.log(e);
    }
  }

  function downvote() {
    setNewVotes((v) => {
      return v - 1;
    });
    try {
      const PUT_API_URL = 'https://workers.lancelee28851234.workers.dev/posts'
      const fields = { ...data, votes: newVotes - 1 }
      axios.put(PUT_API_URL, fields);
      toast.success('You disliked a post.');
    } catch (e) {
      console.log(e);
    }
  }

  function handleChangeNewComment(evt) {
    const input = evt.target;
    setNewComment(c => ({
      content: input.value,
      createdAt: null,
    }));
  }


  async function handleSubmitComment(evt) {
    evt.preventDefault();
    const date = Date.now();
    const comment = { ...newComment, createdAt: date };
    setCommentsData(c => [comment, ...c]);
    setNewComment({ content: "", createdAt: null });

    try {
      const newData = { ...data, comments: [comment, ...commentsData], votes: newVotes };
      const PUT_API_URL = 'https://workers.lancelee28851234.workers.dev/posts'
      axios.put(PUT_API_URL, newData);
      toast.success('You commented a post.');
    } catch (e) {
      console.log(e);
    }
  }

  function displayType(type) {
    if (type === 'text') {
      return (
        <p className="card-text">{content}</p>
      )
    }
    if (type === 'image') {
      return (
        <img src={content} className="img-fluid img-thumbnail" alt={title} >
        </img>
      )
    }
    if (type === 'link') {
      return (
        <a href={content} className="card-link">{content}</a>
      )
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h4 className="card-title">{title}</h4>
          <small><FontAwesomeIcon icon={faArrowUp} /> {newVotes}</small>
        </div>
        <h6 className="card-subtitle mb-2 text-muted">By {username}</h6>
        <h6 className="card-subtitle mb-2 text-muted">{getDate(createdAt)}</h6>
        {displayType(type)}
        <div className="card-vote">
          <span className="card-link upvote" >
            <FontAwesomeIcon icon={faThumbsUp} onClick={upvote} />
          </span>
          <span className="card-link">
            <FontAwesomeIcon icon={faThumbsDown} onClick={downvote} />
          </span>
        </div>
        <hr />
        {commentsData ? commentsData.map((c) =>
          <div key={c.createdAt}>
            <p>{c.content}</p>
            <p className="card-subtitle mb-2 text-muted">... posted at {getDate(c.createdAt)}</p>
          </div>)
          : null}
        <form className="d-flex justify-content-between" onSubmit={handleSubmitComment}>
          <input
            className="form-control"
            name="comment"
            id="comment"
            value={newComment.content}
            style={{ width: "30rem" }}
            onChange={handleChangeNewComment}
            required
          />
          <button className="btn btn-primary" type="submit">
            Comment
          </button>
        </form>
      </div>
    </div>
  )
}
  

export default PostCard