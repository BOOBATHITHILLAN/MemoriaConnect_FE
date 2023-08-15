import React, { useEffect, useState } from "react";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import Datacontext from "../../datacontext/Datacontext";

function Friend({ user, friendId, name, subtitle, userPicturePath, token }) {
  const { url } = useContext(Datacontext);
  const Navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [isFriend, setIsfriend] = useState(false);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  useEffect(() => {
    setFriends(user.friends);
    const isFriend = friends.find((friend) => friend._id === friendId);
    isFriend && setIsfriend(true);
  }, []);

  const patchFriend = async () => {
    const res = axios.patch(`${url}/users/${user._id}/${friendId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setFriends(res.data);
  };
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            Navigate(`/profile/${friendId}`);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {user._id == friendId ? null : (
        <IconButton
          disabled
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
}

export default Friend;
