import React from 'react';
import { Row, Form, FloatingLabel, Container } from 'react-bootstrap'

const TemDropdowns = (props) => {
    const handleNewSelected = (e) => {
        let selectedTem = props.data.filter((tem) => {
            return tem.name === e.target.value
        })
        props.return(selectedTem[0], props.selected.length)
        e.target.value = null
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
  return (
    <Container>
      <Row>
        {dropdown}
      </Row>
    </Container>);
};

export default TemDropdowns;
