import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import Datacontext from "../datacontext/Datacontext";

const forgotSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
});

const initialValuesforgot = {
  email: "",
};

const ForgotPassword = () => {
  const { url } = useContext(Datacontext);
  const { palette } = useTheme();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const Navigate = useNavigate();
  const [activationlink, setActivationlink] = useState(false);
  const [expiry, setExpiry] = useState(false);

  const forgotPassword = async (values, onSubmitProps) => {
    try {
      const res = await axios.put(`${url}/auth/forgotpassword`, {
        email: values.email,
      });
      onSubmitProps.resetForm();
      setActivationlink(true);
      setExpiry(false);
      setTimeout(() => {
        Navigate("/");
      }, 1500);
    } catch (error) {
      setActivationlink(false);
      setExpiry(true);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await forgotPassword(values, onSubmitProps);
  };
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
          Enter your registered mail id...
        </Typography>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesforgot}
          validationSchema={forgotSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Typography
                align="center"
                style={{ fontWeight: "bold", marginTop: "20px" }}
              >
                {activationlink && "Mail send successfully..."}
              </Typography>
              <Typography
                align="center"
                style={{ color: "red", fontWeight: "bold", marginTop: "20px" }}
              >
                {expiry && "Invalid credentials..."}
              </Typography>
              {/* BUTTONS */}
              <Box>
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                >
                  Send mail
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
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
