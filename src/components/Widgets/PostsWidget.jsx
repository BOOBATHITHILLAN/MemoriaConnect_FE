import React, { useEffect, useState } from "react";
import axios from "axios";
import PostWidget from "./PostWidget";
import { useContext } from "react";
import Datacontext from "../../datacontext/Datacontext";

function PostsWidget({
  user,
  userId,
  token,
  posts,
  setPosts,
  post,
  setPost,
  isProfile
}) {
  const {url}=useContext(Datacontext);
  const [addcomment, setAddcomment] = useState("");
  const getPosts = async () => {
    let data = window.localStorage.getItem("loggedInUser");
    data = JSON.parse(data);
    const res = await axios.get(`${url}/posts`, {
      headers: { Authorization: `Bearer ${data.token}` },
    });    
    setPosts(res.data);    
  };
  const getUserPosts = async () => {
    let data = window.localStorage.getItem("loggedInUser");
    data = JSON.parse(data);
    const res = await axios.get(`${url}/posts/${userId}/posts`, {
      headers: { Authorization: `Bearer ${data.token}` },
    });
    setPosts(res.data);
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [post, addcomment]);
  return (
    <>
      {posts &&
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              user={user}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
              post={post}
              setPost={setPost}
              token={token}
              addcomment={addcomment}
              setAddcomment={setAddcomment}
            />
          )
        )}
    </>
  );
}

export default PostsWidget;
