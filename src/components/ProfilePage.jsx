import React, { useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import Navbar from "./Navbar";
import UserWidget from "./Widgets/UserWidget";
import MyPostWidget from "./Widgets/MyPostWidget";
import PostsWidget from "./Widgets/PostsWidget";
import AdvertWidget from "./Widgets/AdvertWidget";
import { useParams } from "react-router-dom";
import Barchart from "./Widgets/Barchart";
import axios from "axios";
import { useContext } from "react";
import Datacontext from "../datacontext/Datacontext";

function ProfilePage() {
  const { url } = useContext(Datacontext);
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [picturePath, setPicturepath] = useState("");
  const { userId } = useParams();
  const [loggedId, setLoggedId] = useState("");
  const [posts, setPosts] = useState("");
  const [newpost, setNewpost] = useState("");
  const [post, setPost] = useState(newpost);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();

  const getUser = async () => {
    let data = window.localStorage.getItem("loggedInUser");
    data = JSON.parse(data);
    const res = await axios.get(`${url}/users/${userId}`, {
      headers: { Authorization: `Bearer ${data.token}` },
    });
    setToken(data.token);
    setUser(res.data);
    setPicturepath(res.data.picturePath);
  };

  const currentUser = async () => {
    let data = window.localStorage.getItem("loggedInUser");
    data = JSON.parse(data);
    const res = await axios.get(`${url}/users`, {
      headers: { Authorization: `Bearer ${data.token}` },
    });
    setLoggedId(res.data._id);
    setName(`${res.data.firstName} ${res.data.lastName}`);
  };

  useEffect(() => {
    getUser();
    currentUser();
  }, []);
  return (
    <Box>
      <Navbar name={name} />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          {user && (
            <UserWidget
              userId={userId}
              picturePath={picturePath}
              token={token}
              user={user}
            />
          )}
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {userId === loggedId ? (
            <>
              <MyPostWidget
                picturePath={picturePath}
                id={userId}
                token={token}
                setPosts={setPosts}
                newpost={newpost}
                setNewpost={setNewpost}
              />
              <PostsWidget
                user={user}
                userId={userId}
                token={token}
                posts={posts}
                setPosts={setPosts}
                post={post}
                setPost={setPost}
                isProfile={true}
              />
            </>
          ) : (
            <Typography
              fontSize="2rem"
              marginTop="3rem"
              align="center"
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
                height: "3rem",
              }}
            >
              Data Private
            </Typography>
          )}
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <Barchart user={user} post={post} posts={posts} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ProfilePage;
