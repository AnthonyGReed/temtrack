import React from 'react';
import { Row, Col, Form, Button, FloatingLabel, InputGroup } from 'react-bootstrap'
import './TemDropdowns.css'

const TemDropdowns = (props) => {
    const handleNewSelected = (e) => {
        let selectedTem = props.data.filter((tem) => {
            return tem.name === e.target.value
        })
        props.return(selectedTem[0], props.selected.length)
        e.target.value = null
    }
    const handleChangedSelected = (e, index) => {
        let selectedTem = props.data.filter((tem) => {
            return tem.name === e.target.value
        })
        props.return(selectedTem[0], index)
    }
    const handleDeleteSelected = (index, tem) => {
        props.delete(index, tem)
    }
    let dropdown = ""
    let fullTemList = ""
    if(props.data) {
        fullTemList = props.data.map((tem, index) => 
        <option value={tem.name} key={index}>{tem.name}</option>
        )
    }
    if(props.selected.length < 6) {
        dropdown = (
            <Form>
                <FloatingLabel label="Select tems to add to party">
                    <Form.Control as="select" onChange={handleNewSelected}>{fullTemList}</Form.Control>
                </FloatingLabel>
            </Form>
        )
    }
    let tems = ""
    if(props.selected.length > 0) {
        tems = props.selected.map((tem, index) => {
            return (
                <Col key={index}>
                    <InputGroup>
                        <Form.Control as="select" value={tem.name} onChange={(e) => handleChangedSelected(e, index)}>{fullTemList}</Form.Control>
                        <Button variant="outline-secondary" onClick={() => handleDeleteSelected(index, tem.name)}>X</Button>
                    </InputGroup>
                </Col>
            )
        })
    }
  return (
    <Row>
      <Row>
        {dropdown}
      </Row>
      <Row>
        {tems}
      </Row>
    </Row>);
};

export default TemDropdowns;
