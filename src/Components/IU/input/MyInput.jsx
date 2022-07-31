import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const MyInput = (props) => {
  return (
    <InputGroup className=" mb-2">
      <Form.Control {...props} aria-describedby="basic-addon1" />
    </InputGroup>
  );
};

export default MyInput;
