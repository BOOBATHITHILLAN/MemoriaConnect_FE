import React, { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "../theme";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const Datacontext = createContext({});

export const DataProvider = ({ children }) => {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => createTheme(themeSettings(mode)));
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const url = import.meta.env.VITE_URL;
  const Navigate = useNavigate();

  //Login Page
  const [logged, setLogged] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [activatepending,setActivatepending]=useState(false);

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
        setLogged(false);
      }, 1000);
    } catch (error) {
      setLogged(false);

      if (error.response.status == 400 || error.response.status == 500) {
        setInvalid(true);
      }else{
        setActivatepending(true)
      }           
      onSubmitProps.resetForm();
      setTimeout(() => {
        setInvalid(false);
        setActivatepending(false)
      }, 1500);
    }
  };

  //Register Page
  const [activate, setActivate] = useState(false);
  const [exist, setExist] = useState(false);

  const register = async (values, onSubmitProps) => {
    try {
      // this allows us to send form info with image
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      formData.append("picturePath", values.picture.name);
      const Registered = await axios.post(`${url}/auth/register`, formData);
      if (Registered) {
        onSubmitProps.resetForm();
        setActivate(true);
        setExist(false);
        setTimeout(() => {
          Navigate("/");
          setActivate(false);
        }, 1500);
      }
    } catch (error) {
      setExist(true);
      onSubmitProps.resetForm();
      setTimeout(() => {
        setExist(false);
      }, 1000);
    }
  };

  //Activate user page
  const [activatedone, setActivatedone] = useState(false);
  const [activated, setActivated] = useState(false);
  const [idactivate, setIdactivate] = useState("");

  const Activateaccount = async (e) => {
    e.preventDefault();
    try {
      const Activated = await axios.patch(
        `${url}/auth/activateuser/${idactivate}`
      );
      if (Activated) {
        setActivatedone(true);
        setActivated(false);
        setTimeout(() => {
          setActivatedone(false);
          Navigate("/");
        }, 1000);
      }
    } catch (error) {
      setActivated(true);
      setActivatedone(false);
    }
  };

  //Forgot Password page
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
        setActivationlink(false);
      }, 1500);
    } catch (error) {
      setActivationlink(false);
      setExpiry(true);
    }
  };

  //Password reset update page
  const [update, setUpdate] = useState(false);
  const [expirycheck, setExpirycheck] = useState(false);
  const [updateid, setUpdateid] = useState("");

  const passwordReset = async (values, onSubmitProps) => {
    try {
      const Updated = await axios.patch(
        `${url}/auth/passwordreset/${updateid}`,
        {
          password: values.password,
        }
      );
      setUpdate(true);
      setExpirycheck(false);
      setTimeout(() => {
        Navigate("/");
        setUpdate(false);
      }, 1500);
    } catch (error) {
      setUpdate(false);
      setExpirycheck(true);
    }
  };

  return (
    <Datacontext.Provider
      value={{
        url,
        theme,
        mode,
        setMode,
        logged,
        invalid,
        activatepending,
        login,
        isNonMobileScreens,
        isNonMobile,
        activate,
        setActivate,
        exist,
        setExist,
        register,
        activatedone,
        activated,
        Activateaccount,
        setIdactivate,
        activationlink,
        expiry,
        forgotPassword,
        update,
        expirycheck,
        setUpdateid,
        passwordReset,
      }}
    >
      {children}
    </Datacontext.Provider>
  );
};

export default Datacontext;
