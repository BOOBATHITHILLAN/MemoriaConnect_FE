import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";
import { useContext } from "react";
import Datacontext from "../../datacontext/Datacontext";

function Barchart({user,post,posts,newpost}) {
  const { url } = useContext(Datacontext);

  const [userdata, setUserdata] = useState({
    labels: ["Users", "Posts"],
    datasets: [
      {
        label: "Overall Users Gained",
        data: [0, 0],
      },
    ],
  });

  const getUserPost = async () => {
    let data = window.localStorage.getItem("loggedInUser");
    data = JSON.parse(data);
    const res = await axios.get(`${url}/posts/userpost`, {
      headers: { Authorization: `Bearer ${data.token}` },
    });
    if (res.data.userLength && res.data.postLength) {
      setUserdata({
        labels: ["Users", "Posts"],
        datasets: [
          {
            label: "Overall Users Gained",
            data: [res.data.userLength, res.data.postLength],
          },
        ],
      });
    }
  };

  useEffect(() => {
    getUserPost();
  }, [user,post,posts,newpost]);
  return <Bar data={userdata} />;
}

export default Barchart;
