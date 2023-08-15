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
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import Datacontext from "../datacontext/Datacontext";

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

const LoginPage = () => {

  const {url}=useContext(Datacontext);
  const { palette } = useTheme();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const Navigate = useNavigate();

  const [logged, setLogged] = useState(false);
  const [invalid, setInvalid] = useState(false);
 

  const login = async (values, onSubmitProps) => {
    try {
      const Loggedin = await axios.post(`${url}/auth/login`, {
        email: values.email,
        password: values.password,
      });
      window.localStorage.setItem(
        "loggedInUser",
        JSON.stringify(Loggedin.data)
      );
      onSubmitProps.resetForm();
      setLogged(true);
      setInvalid(false);
      setTimeout(() => {
        Navigate("/home");
      }, 1000);
    } catch (error) {
      setLogged(false);
      setInvalid(true);
      onSubmitProps.resetForm();
    }
  };
  const handleFormSubmit = async (values, onSubmitProps) => {
    await login(values, onSubmitProps);
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
          Welcome to MemoriaConnect, the Social Media for Sociopaths!
        </Typography>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesLogin}
          validationSchema={loginSchema}
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
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Typography
                align="center"
                style={{ fontWeight: "bold", marginTop: "20px" }}
              >
                {logged && "Logged in successfully..."}
              </Typography>
              <Typography
                align="center"
                style={{ color: "red", fontWeight: "bold", marginTop: "20px" }}
              >
                {invalid && "Invalid credentials..."}
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
                  LOGIN
                </Button>
                <Link to="/register">
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
                    "Don't have an account? Sign Up here."
                  </Typography>
                </Link>
                <Link to="/forgotpassword">
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
                    forgotPassword?
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

export default LoginPage;
