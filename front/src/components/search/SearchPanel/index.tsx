import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import { Container, Row, Col, Form, Button, InputGroup, FormControl } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useInput } from "../../../utils/hooks";
import Input from "../../../components/common/inputs/Input"
import { ISearchRegistryItemRequest } from "../../../store/Interfaces"

export interface ISearchPanelProps {
  onClick?: (value: ISearchRegistryItemRequest) => void;
}

const SearchPanel: React.FunctionComponent<ISearchPanelProps> = (props) => {
  const { onClick } = props;

  const inputSurname = useInput("")
  const inputName = useInput("")
  const inputPatrname = useInput("")
  const inputBirthdate = useInput("")

  const clickHandler = () => {
    onClick && onClick({
      surname: inputSurname.value,
      name: inputName.value,
      patrname: inputPatrname.value,
      birthdate: inputBirthdate.value
    });
  };

  return (
    <Form inline className="p-5 offset-md-1">
      <Form.Group>
        <Button type="button" className="mb-2 px-5 mr-sm-2" onClick={clickHandler}>
          Искать
        </Button>
      </Form.Group>
      <Form.Control
        className="mb-2 mr-sm-2"
        id="inlineFormInputName3"
        placeholder="Введите фамилию"
        onChange={inputSurname.onChange}
      />
      <Form.Control
        className="mb-2 mr-sm-2"
        id="inlineFormInputName4"
        placeholder="Введите имя"
        onChange={inputName.onChange}
      />
      <Form.Control
        className="mb-2 mr-sm-2"
        id="inlineFormInputName5"
        placeholder="Введите отчество"
        onChange={inputPatrname.onChange}
      />
      <Form.Control
        className="mb-2 mr-sm-2"
        id="inlineFormInputName6"
        placeholder="Введите дату рождения"
        onChange={inputBirthdate.onChange}
      />

    </Form>
  );
};

export default SearchPanel;
