import React, { useState, useEffect } from "react";

import axios from "axios";
import "./styles.scss";

import BfiResult from "../../components/bfiResult";
import ServqualResult from "../../components/servqualResult";
import AspectsResult from "../../components/aspectsResult";

const ResultTotal = (props) => {
  const [aspects, setAspects] = useState({});
  const [bfi, setBfi] = useState({});
  const [servqual, setServqual] = useState({});

  const id = props.location.user;
  const name = props.location.name;

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
        setServqual(Object.values(response.data.data)[0]);
      })
      .catch((error) => {
        console.log(error);
      });

      

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <BfiResult bfi={bfi} id={id} name={name} />
      <ServqualResult servqual={servqual} id={id} name={name} />
      <AspectsResult id={id} name={name} />
    </>
  );
};

export default ResultTotal;
