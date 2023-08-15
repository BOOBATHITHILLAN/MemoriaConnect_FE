import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import {
  Close,
  DarkMode,
  Help,
  LightMode,
  Message,
  Notifications,
  Search,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Datacontext from "../datacontext/Datacontext";

function Navbar({name}) {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  
  const {mode,setMode}=useContext(Datacontext);
  const Navigate = useNavigate();


  const HandleLogout = async () => {
    window.localStorage.clear();
    Navigate("/");
  };

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontSize="clamp(1rem,2rem,2.5rem)"
          fontWeight="bold"
          color="primary"
          onClick={() => Navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          MemoriaConnect
        </Typography>
        {isNonMobileScreen && (
          <FlexBetween
            backgroundColor={neutralLight}
            gap="3rem"
            padding="0.1rem 1.5rem"
            borderRadius="9px"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* Desktop nav */}

      {isNonMobileScreen ? (
        <FlexBetween gap="2rem">
          <IconButton
            onClick={() =>
              mode === "light" ? setMode("dark") : setMode("light")
            }
          >
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: "dark", fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={name}>
            <Select
              value={name}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={name}>
                <Typography>{name}</Typography>
              </MenuItem>
              <MenuItem onClick={HandleLogout}>Log out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Mobile nav */}

      {!isNonMobileScreen && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* close icon */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* Menu Items */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() =>
                mode === "light" ? setMode("dark") : setMode("light")
              }
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={name}>
              <Select
                value={name}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={name}>
                  <Typography>{name}</Typography>
                </MenuItem>
                <MenuItem onClick={HandleLogout}>Log out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
}

export default Navbar;
