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
      <div className="elements__first">
        <div className="elements__first__userContainer">
          <h2>User 1</h2>
          <br></br>
          <div><strong>Name: </strong> { user1.name }</div>
          <div><strong>Age: </strong>{ user1.age }</div>
          <div><strong>Educational Level: </strong>{ user1.educationalLevel }</div>
          <div><strong>Gender: </strong>{ user1.gender }</div>
          <div><strong>Stratum: </strong>{ user1.stratum }</div>
          <div><strong>Hobbies: </strong>{ user1.hobbies }</div>
          <div><strong>Nationality: </strong>{ user1.nationality }</div>
          <div><strong>Profession: </strong>{ user1.profession }</div>
        </div>

        <div className="elements__first__userContainer">
          <h2>User 2</h2>
          <br></br>
          <div><strong>Name: </strong> { user2.name }</div>
          <div><strong>Age: </strong>{ user2.age }</div>
          <div><strong>Educational Level: </strong>{ user2.educationalLevel }</div>
          <div><strong>Gender: </strong>{ user2.gender }</div>
          <div><strong>Stratum: </strong>{ user2.stratum }</div>
          <div><strong>Hobbies: </strong>{ user2.hobbies }</div>
          <div><strong>Nationality: </strong>{ user2.nationality }</div>
          <div><strong>Profession: </strong>{ user2.profession }</div>
        </div>
      </div>
      <BFIComparison bfi1={bfi1} bfi2={bfi2} />
      <ServqualComparison servqual1={srv1} servqual2={srv2} />
      <AspectComparison aspects={aspects1} aspects2={aspects2} name1={user1.name} name2={user2.name} />
    </div>
  );
};

export default ComparisonResult;
