import React, { useState, useEffect } from "react";

import axios from "axios";
import "./styles.scss";

import BFIComparison from "../../components/Comparisons/BFIComparison";
import ServqualComparison from "../../components/Comparisons/ServqualComparison";
import AspectComparison from "../../components/Comparisons/AspectComparison";

const ComparisonResult = (props) => {
  const [mount, setMount] = useState(false);

  //BFI of the two users
  const [bfi1, setBfi1] = useState({});
  const [bfi2, setBfi2] = useState({});

  //Servqual of the two users
  const [srv1, setSrv1] = useState({});
  const [srv2, setSrv2] = useState({});

  //Aspects of the two users
  const [aspects1, setAspects1] = useState({});
  const [aspects2, setAspects2] = useState({});

  const user1 = props.location.state.user1;
  const user2 = props.location.state.user2;

  console.log(user1, user2);
  useEffect(() => {
    axios({
      url: `/api/bfi/${user1.id}`,
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        setBfi1(Object.values(response.data.data)[0]);
      })
      .catch((error) => {
        console.log(error);
      });

    axios({
      url: `/api/bfi/${user2.id}`,
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        setBfi2(Object.values(response.data.data)[0]);
      })
      .catch((error) => {
        console.log(error);
      });

    axios({
      url: `/api/servqual/${user1.id}`,
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        setSrv1(Object.values(response.data.data)[0]);
      })
      .catch((error) => {
        console.log(error);
      });

    axios({
      url: `/api/servqual/${user2.id}`,
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        setSrv2(Object.values(response.data.data)[0]);
      })
      .catch((error) => {
        console.log(error);
      });

    axios({
      url: `/api/aspects/${user1.id}`,
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        setAspects1(Object.values(response.data.data));
      })
      .catch((error) => {
        console.log(error);
      });

    axios({
      url: `/api/aspects/${user2.id}`,
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        setAspects2(Object.values(response.data.data));
        setMount(true)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(aspects1, aspects2);
  return !mount ? <p></p> : (
    <div className="elements">
      <BFIComparison bfi1={bfi1} bfi2={bfi2} />
      <ServqualComparison servqual1={srv1} servqual2={srv2} />
      <AspectComparison aspects={aspects1} aspects2={aspects2} name1={user1.name} name2={user2.name} />
    </div>
  );
};

export default ComparisonResult;
