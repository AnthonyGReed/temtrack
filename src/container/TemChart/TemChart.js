import {React, useState, useRef} from 'react';
import TemData from '../../components/TemData/TemData';
import { Row, Col, Container, ToggleButton, ToggleButtonGroup, Button, Form, FloatingLabel } from 'react-bootstrap'

const TemChart = (props) => {
    const [temList, setTemList] = useState([])
    const [involvedTems, setInvolvedTems] = useState([])
    const [protiens, setProtiens] = useState("")
    const [eraser, setEraser] = useState("")
    const [eraserPlus, setEraserPlus] = useState("")
    const [defeatedTem, setDefeatedTem] = useState("")

    const ref0 = useRef(null)
    const ref1 = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)
    const ref4 = useRef(null)
    const ref5 = useRef(null)
    const refs = [ref0, ref1, ref2, ref3, ref4, ref5]

    const setTem = (tem, slot) => {
        let newList = [...temList]
        newList[slot] = tem
        setTemList(newList)
    }

    const handleSelectedTemsChange = (val) => {
        for(const tem in val) {
            let inList = false
            for(const data in temList) {
                if(temList[data].name === val[tem]) {
                    inList = true
                }
            }
            if(!inList) {
                val.splice(tem, 1)
            }
        }
        setInvolvedTems(val)
    }
    const handleProtiens = (e) => {
        setProtiens(e.target.value)
    }
    const handleEraser =(e) => {
        setEraser(e.target.value)
    }
    const handleEraserPlus = (e) => {
        setEraserPlus(e.target.value)
    }
    const handleDefeatedTem = (e) => {
        setDefeatedTem(e.target.value)
    }

    const handleAddTVs = () => {
        involvedTems.forEach(tem => {
            const index = temList.map((e) => {return e.name}).indexOf(tem)
            const defeatedIndex = props.data.map((e) => {return e.name}).indexOf(defeatedTem)
            const defeatedTemInfo = props.data[defeatedIndex]
            const ref = refs[index]
            let statChanges = []
            statChanges.push({"stat": "HP", "amount": defeatedTemInfo.tvYields.hp})
            statChanges.push({"stat": "Stamina", "amount": defeatedTemInfo.tvYields.sta})
            statChanges.push({"stat": "Speed", "amount": defeatedTemInfo.tvYields.spd})
            statChanges.push({"stat": "Attack", "amount": defeatedTemInfo.tvYields.atk})
            statChanges.push({"stat": "Defense", "amount": defeatedTemInfo.tvYields.def})
            statChanges.push({"stat": "Special Attack", "amount": defeatedTemInfo.tvYields.spatk})
            statChanges.push({"stat": "Special Defense", "amount": defeatedTemInfo.tvYields.spdef})
            for(const stat in statChanges) {
                const data = statChanges[stat]
                if(data.amount > 0) {
                    if(protiens === tem) {
                        ref.current.addTVs(data.stat, data.amount * 2)
                    } else if(eraser === tem) {
                        ref.current.addTVs(data.stat, Math.ceil(data.amount / 2) * -1)
                    } else if(eraserPlus === tem) {
                        ref.current.addTVs(data.stat, data.amount * -1)
                    } else {
                        ref.current.addTVs(data.stat, data.amount)
                    }
                }
            }
        });
    }

    let selectedTems = temList.map((tem, index) => 
        <option key={index} value={tem.name}>{tem.name}</option>
    )
    let allTems = []
    if(props.data) {
        allTems = props.data.map((tem, index) => 
            <option key={index} value={tem.name}>{tem.name}</option>
        )
    }

    let defeatedTemObject = ""
    if(defeatedTem !== "") {
        const defeatedIndex = props.data.map((e) => { return e.name }).indexOf(defeatedTem)
        defeatedTemObject = props.data[defeatedIndex]
    }
    
    let temData = ""
    temData = refs.map((ref, index) => {
        return (<Col key={index}>
            <TemData index={index} defeated={defeatedTemObject} data={props.data} return={(info, index) => setTem(info, index)} ref={ref} />
        </Col>
        )
    })

    let multiButtons = ""
    multiButtons = temList.map((tem, index) => {
        const name = tem.name
        return <ToggleButton key={index} value={name} variant="outline-primary" id={name + index}>{name}</ToggleButton>
    })

  return (
    <Container>
        <Row>
            {/* <Row className={"mx-auto pb-3"}>
                <TemDropdowns data={props.data} selected={temList} return={(info, index) => setTem(info, index)}/>
            </Row> */}
            <Row className={"pb-3"}>
                {temData}
            </Row>
        </Row>
        <Row>
            <Form>
                <Row>
                    <Form.Label>Select which tems will get TVs</Form.Label>
                    <ToggleButtonGroup type="checkbox" onChange={handleSelectedTemsChange}>
                        {multiButtons}
                    </ToggleButtonGroup>
                </Row>
                <FloatingLabel controlId="floatingselect1" label="Select which tem has protiens">
                    <Form.Control as="select" value={protiens} aria-label="Protiens" onChange={handleProtiens}>
                        <option></option>
                        {selectedTems}
                    </Form.Control>
                </FloatingLabel>
                <FloatingLabel controlId="floatingselect2" label="Select which tem has the eraser">
                    <Form.Control as="select" value={eraser} aria-label="Eraser" onChange={handleEraser}>
                        <option></option>
                        {selectedTems}
                    </Form.Control>
                </FloatingLabel>
                <FloatingLabel controlId="floatingselect3" label="Select which tem has the eraser+">
                    <Form.Control as="select" value={eraserPlus} aria-label="Eraser Plus" onChange={handleEraserPlus}>
                        <option></option>
                        {selectedTems}
                    </Form.Control>
                </FloatingLabel>
                <FloatingLabel controlId="floatingselect4" label="Select which tem you have defeated">
                    <Form.Control as="select" value={defeatedTem} aria-label="Defeated Tem" onChange={handleDefeatedTem}>
                        {allTems}
                    </Form.Control>
                </FloatingLabel>
                <Form.Control as={Button} aria-label="Add TVs" onClick={handleAddTVs}>Add TVs</Form.Control>
            </Form>
        </Row>
    </Container>
)};

export default TemChart;
