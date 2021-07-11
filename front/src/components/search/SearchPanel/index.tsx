import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useInput } from "../../../utils/hooks";
import Input from "../../../components/common/inputs/Input"

export interface ISearchPanelProps {
    onClick?: (value: String) => void;
}

const SearchPanel: React.FunctionComponent<ISearchPanelProps> = (props) => {
    const { onClick } = props;

    const input = useInput("")

    const clickHandler = () => {
        onClick && onClick(input.value);
    };

    return (
        <div className="container offset-md-2">
            <Row >
                <Col md={1}>
                    <Button onClick={clickHandler}>Искать</Button>
                </Col>
                <Col md={6}>
                    <Input type="text" onChange={input.onChange} placeholder="Введите ФИО" />
                    {/* <Input {...input} type="text" placeholder="Введите ФИО" /> */}
                </Col>
            </Row>
            {/* <Form >
        <Form.Group controlId="formBasicEmail" >
          <Form.Row>
            <Col>
              <Button onClick={clickHandler}>Искать</Button>
            </Col>
            <Col>
              <Form.Control {...input} type="text" placeholder="Введите ФИО" />
            </Col>
          </Form.Row>
        </Form.Group>
        </Form> */}
        </div>
    );
};

export default SearchPanel;
