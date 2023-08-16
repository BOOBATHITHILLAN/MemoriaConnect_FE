import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import Datacontext from "../datacontext/Datacontext";

const ActivateUser = () => {
  const {
    isNonMobileScreens,
    isNonMobile,
    activatedone,
    activated,
    Activateaccount,
    setIdactivate,
  } = useContext(Datacontext);
  const { palette } = useTheme();
  const theme = useTheme();

  const { id } = useParams();
  useEffect(() => {
    setIdactivate(id);
  }, []);

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          MemoriaConnect
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          align="center"
          sx={{ mb: "1.5rem" }}
        >
          Click button to activate your account...
        </Typography>
        <form>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          ></Box>
          <Typography
            align="center"
            style={{ marginTop: "20px", fontWeight: "bold" }}
          >
            {activatedone && "Account activated successfully...."}
          </Typography>
          <Typography
            align="center"
            style={{ color: "red", marginTop: "20px", fontWeight: "bold" }}
          >
            {activated && "Account exist with activation...."}
          </Typography>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              onClick={Activateaccount}
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              Click me
            </Button>
            <Link to="/">
              <Typography
                sx={{
                  textDecoration: "underline",
                  color: palette.primary.dark,
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.primary.main,
                    gridColumn: "span 4",
                  },
                }}
              >
                Login
              </Typography>
            </Link>
            <Link to="/register">
              <Typography
                onClick={() => {}}
                sx={{
                  textDecoration: "underline",
                  color: palette.primary.dark,
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.primary.main,
                  },
                }}
              >
                Sign Up
              </Typography>
            </Link>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ActivateUser;
