import {React, useImperativeHandle, useState, forwardRef} from 'react';
import { Container, Row, Col, FormControl, InputGroup, Form, Button } from 'react-bootstrap'
import './TemData.css'

const TemData = forwardRef((props, ref) => {
    const [hpCurrent, setHpCurrent] = useState(0);
    const [hpTarget, setHpTarget] = useState(0);
    const [staminaCurrent, setStaminaCurrent] = useState(0);
    const [staminaTarget, setStaminaTarget] = useState(0);
    const [speedCurrent, setSpeedCurrent] = useState(0);
    const [speedTarget, setSpeedTarget] = useState(0);
    const [attackCurrent, setAttackCurrent] = useState(0);
    const [attackTarget, setAttackTarget] = useState(0);
    const [defenseCurrent, setDefenseCurrent] = useState(0);
    const [defenseTarget, setDefenseTarget] = useState(0);
    const [specialAttackCurrent, setSpecialAttackCurrent] = useState(0);
    const [specialAttackTarget, setSpecialAttackTarget] = useState(0);
    const [specialDefenseCurrent, setSpecialDefenseCurrent] = useState(0);
    const [specialDefenseTarget, setSpecialDefenseTarget] = useState(0);

    let statData = []
    statData.push({stat: "HP", short: "hp", current: hpCurrent, target: hpTarget, setCurrent: setHpCurrent, setTarget: setHpTarget})
    statData.push({stat: "Stamina", short: "sta", current: staminaCurrent, target: staminaTarget, setCurrent: setStaminaCurrent, setTarget: setStaminaTarget})
    statData.push({stat: "Speed", short: "spd", current: speedCurrent, target: speedTarget, setCurrent: setSpeedCurrent, setTarget: setSpeedTarget})
    statData.push({stat: "Attack", short: "atk", current: attackCurrent, target: attackTarget, setCurrent: setAttackCurrent, setTarget: setAttackTarget})
    statData.push({stat: "Defense", short: "def", current: defenseCurrent, target: defenseTarget, setCurrent: setDefenseCurrent, setTarget: setDefenseTarget})
    statData.push({stat: "Special Attack", short: "spatk", current: specialAttackCurrent, target: specialAttackTarget, setCurrent: setSpecialAttackCurrent, setTarget: setSpecialAttackTarget})
    statData.push({stat: "SpecialDefense", short: "spdef", current: specialDefenseCurrent, target: specialDefenseTarget, setCurrent: setSpecialDefenseCurrent, setTarget: setSpecialDefenseTarget})
    
    const addTVs = (stat, amount) => {
        const data = statData.find(data => data.stat === stat)
        const newValue = Number(data.current) + Number(amount)
        if(newValue > 500) { data.setCurrent(500) }
        else if(newValue < 0) { data.setCurrent(0) }
        else { data.setCurrent(Number(data.current) + Number(amount)) }
    }

    const inputCheckCurrent = (e, stat) => {
        stat.setCurrent(inputCheck(e.target.value, stat.current))
    }

    const inputCheckTarget = (e, stat) => {
        stat.setTarget(inputCheck(e.target.value, stat.target))
    }

    const inputCheck = (update, current) => {
        const test = update.match(/[^0-9]/g)
        if(test && test.length>0) {return current}
        else if(update > 500) {return 500}
        else if(update < 0) {return 0}
        else {return update}
    }

    useImperativeHandle(ref, () => {
        return {
            addTVs: addTVs
        }
    })

    const handleChangedSelected = (e, index) => {
        let selectedTem = props.data.filter((tem) => {
            return tem.name === e.target.value
        })
        props.return(selectedTem[0], index)
    }

    const handleDeleteSelected = (index, tem) => {
        props.delete(index, tem)
    }

    for(const stat in statData) {
        const data = statData[stat]
        if(data.current > data.target) { data.class = "over" } 
        else if (data.current === data.target) { data.class = "exact" } 
        else if (data.current >= data.target - 10) { data.class = "close" }
    }

    let fullTemList = ""
    if(props.data) {
        fullTemList = props.data.map((tem, index) => 
        <option value={tem.name} key={index}>{tem.name}</option>
        )
    }

    let TVList = ""
    TVList = statData.map((stat, index) => {
        return ( 
            <Row key={index}>
                <InputGroup>
                    <InputGroup.Text className={stat.class}>{stat.short}</InputGroup.Text>
                    <FormControl value={stat.current} onChange={(e) => inputCheckCurrent(e, stat)}/>
                    <FormControl value={stat.target} onChange={(e) => inputCheckTarget(e, stat)}/>
                </InputGroup>
            </Row>
    )})

  return (
    <Container key={props.index} className={props.tem.name}>
        <Row>
            <InputGroup>
                <Form.Control as="select" value={props.tem.name} 
                    onChange={(e) => handleChangedSelected(e, props.index)}>
                    {fullTemList}
                </Form.Control>
                <Button variant="outline-secondary" onClick={() => handleDeleteSelected(props.index, props.index.name)}>
                    X
                </Button>
            </InputGroup>
        </Row>
        <Row className="justify-content-center">
            <Col className="spacer">&nbsp;</Col>
            <Col className="d-flex justify-content-center"><small>Current TVs</small></Col>
            <Col className="d-flex justify-content-center"><small>Target TVs</small></Col>
        </Row>
        {TVList}
    </Container>
  )
});

export default TemData;
