import React, { useState, useEffect } from "react";

import axios from "axios";
import "./styles.scss";

import BfiResult from "../../components/bfiResult";
import ServqualResult from "../../components/servqualResult";
import AspectsResult from "../../components/aspectsResult";

const ResultTotal = (props) => {
  const [mount, setMount] = useState(false);
  const [aspects, setAspects] = useState({});
  const [bfi, setBfi] = useState({});
  const [servqual, setServqual] = useState({});

  const id = props.location.user;
  const name = props.location.name;
  const user = props.location.userTotal;

  console.log(user);
  useEffect(() => {
    axios({
      url: `/api/bfi/${id}`,
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        setBfi(Object.values(response.data.data)[0]);
      })
      .catch((error) => {
        console.log(error);
      });

    axios({
      url: `/api/servqual/${id}`,
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        setServqual(Object.values(response.data.data)[0]);
      })
      .catch((error) => {
        console.log(error);
      });

    axios({
      url: `/api/aspects/${id}`,
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);

        setAspects(Object.values(response.data.data));
        setMount(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  console.log(aspects);
  return !mount ? (
    <p></p>
  ) : (
    <>
      <div style={{marginLeft:"auto", marginRight:"auto"}}><strong>Name: </strong> { user.name }</div>
      <div><strong>Age: </strong>{ user.age }</div>
      <div><strong>Educational Level: </strong>{ user.educationalLevel }</div>
      <div><strong>Gender: </strong>{ user.gender }</div>
      <div><strong>Hobbies: </strong>{ user.hobbies }</div>
      <div><strong>Nacionality: </strong>{ user.nationality }</div>
      <div><strong>Profession: </strong>{ user.profession }</div>
      <BfiResult bfi={bfi} id={id} name={name} />
      <ServqualResult servqual={servqual} id={id} name={name} />
      <AspectsResult aspects={aspects} id={id} name={name} />
    </>
  );
};

export default ResultTotal;
