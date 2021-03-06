import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { TiArrowBackOutline } from "react-icons/ti";
import { FaMapMarkedAlt } from "react-icons/fa";
import { SiOpenstreetmap } from "react-icons/si";
import { GiPawPrint } from "react-icons/gi";
import { BiGlassesAlt } from "react-icons/bi";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "./Spiner";

const EncountersPokemon = () => {
  let { id } = useParams();

  let history = useHistory();
  let encounters = id;
  const [data, setData] = useState();
  const [dataRender, setDataRender] = useState([]);

  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${encounters}/encounters`)
      .then((dataApi) => {
        setData(dataApi);
        setHasData(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [encounters]);

  useEffect(() => {
    if (data) {
      const renderLocation = data.data.map((values, index) => (
        <div key={values + index}>
          <span className="card-encounters text-center">
            <FaMapMarkedAlt /> Location area: {values.location_area.name}
          </span>
        </div>
      ));
      setDataRender(renderLocation);
    }
  }, [data]);

  return (
    <>
      <h2 className="text-center">
        {" "}
        {`Where to find it? `} <GiPawPrint /> <BiGlassesAlt />
      </h2>
      <div className="d-flex justify-content-center align-items-center">
        {hasData ? (
          <Container>
            <Row className="d-inline-block">
              <Col className="col-md-12 mt-5 padding-custom-encounters">
                {" "}
                {dataRender && dataRender.length > 0 ? (
                  <span>{dataRender && dataRender}</span>
                ) : (
                  <span className="card-encounters text-center">
                    {" "}
                    <SiOpenstreetmap /> Location not found
                  </span>
                )}
              </Col>
            </Row>
          </Container>
        ) : (
          <Spinner />
        )}
        <Button
          className="mt-5 mb-3 mr-5"
          variant="warning"
          onClick={() => history.goBack()}
        >
          <TiArrowBackOutline /> Back
        </Button>{" "}
      </div>
    </>
  );
};

export default EncountersPokemon;
