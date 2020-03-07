import * as React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {Container} from "react-bootstrap";

class LocalSearch extends React.Component{
  render() {
    return (
      <Container className="search-container pt-4">
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search events"
            aria-label="Search events"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <Button className="m-button">Find</Button>
          </InputGroup.Append>
        </InputGroup>
      </Container>
    )
  }
}

export default LocalSearch;
