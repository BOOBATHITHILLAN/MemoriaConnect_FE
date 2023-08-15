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
import Dropzone from "react-dropzone";
import axios from "axios";
import FlexBetween from "./FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState } from "react";
import { useContext } from "react";
import Datacontext from "../datacontext/Datacontext";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),  
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",  
};

function RegisterPage() {
  const { url } = useContext(Datacontext);
  const { palette } = useTheme();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const Navigate=useNavigate();
  const [activate,setActivate]=useState(false);
  const [exist,setExist]=useState(false);

  const register = async (values, onSubmitProps) => {
    try {
      // this allows us to send form info with image
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }      
      formData.append("picturePath", values.picture.name);
      const Registered=await axios.post(`${url}/auth/register`,formData);
      if(Registered){
        onSubmitProps.resetForm();
        setActivate(true);
        setExist(false)
        setTimeout(() => {
          Navigate("/");
          setActivate(false);
        }, 1500);
      }
      
    } catch (error) {
      setExist(true);
      onSubmitProps.resetForm();      
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await register(values, onSubmitProps);
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
          Join our family registry
        </Typography>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesRegister}
          validationSchema={registerSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
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
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>

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
              <Typography align="center">
                    {activate && "Check Your mail to activate"}
                </Typography>
                <Typography align="center" style={{color:"red"}}>
                    {exist && "User exist, try with new datas"}
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
                  REGISTER
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
                    Already have an account? Login here..
                  </Typography>
                </Link>
                
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default RegisterPage;
