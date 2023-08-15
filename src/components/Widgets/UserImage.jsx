import React from "react";
import { Box } from "@mui/material";
import { useContext } from "react";
import Datacontext from "../../datacontext/Datacontext";

function UserImage({ image, size = "60px" }) {
  const { url } = useContext(Datacontext);
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${url}/assets/${image}`}
      />
    </Box>
  );
}

export default UserImage;
