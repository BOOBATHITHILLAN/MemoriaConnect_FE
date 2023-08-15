import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import Datacontext from "../datacontext/Datacontext";

const forgotSchema = yup.object().shape({
  password: yup.string().required("required"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password mismatch")
    .required("required"),
});

const initialValuesforgot = {
  password: "",
  confirmpassword: "",
};

const PasswordReset = () => {
  const { url } = useContext(Datacontext);
  const { palette } = useTheme();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { id } = useParams();
  const Navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [expiry, setExpiry] = useState(false);

  const passwordReset = async (values, onSubmitProps) => {
    try {
      const Updated = await axios.patch(`${url}/auth/passwordreset/${id}`, {
        password: values.password,
      });
      setUpdate(true);
      setExpiry(false);
      setTimeout(() => {
        Navigate("/");
      }, 1500);
    } catch (error) {
      setUpdate(false);
      setExpiry(true);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await passwordReset(values, onSubmitProps);
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
          Password reset
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
                  label="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  type="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="confirm password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmpassword}
                  name="confirmpassword"
                  type="password"
                  error={
                    Boolean(touched.confirmpassword) &&
                    Boolean(errors.confirmpassword)
                  }
                  helperText={touched.confirmpassword && errors.confirmpassword}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Typography
                align="center"
                style={{ fontWeight: "bold", marginTop: "20px" }}
              >
                {update && "Password reset done successfully..."}
              </Typography>
              <Typography
                align="center"
                style={{ color: "red", fontWeight: "bold", marginTop: "20px" }}
              >
                {expiry && "Password reset link expired"}
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
                  Reset password
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

export default PasswordReset;
