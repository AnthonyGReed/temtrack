import {React, useImperativeHandle, useState, forwardRef} from 'react';
import { Container, Row, Col, FormControl, InputGroup, Form, Button } from 'react-bootstrap'
import './TemData.css'

const TemData = forwardRef((props, ref) => {
    const [tem, setTem] = useState(0);
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
    const [totalCurrent, setTotalCurrent] = useState(0);
    const [totalTarget, setTotalTarget] = useState(0);

    let statData = []
    statData.push({stat: "HP", short: "hp", current: hpCurrent, target: hpTarget, setCurrent: setHpCurrent, setTarget: setHpTarget})
    statData.push({stat: "Stamina", short: "sta", current: staminaCurrent, target: staminaTarget, setCurrent: setStaminaCurrent, setTarget: setStaminaTarget})
    statData.push({stat: "Speed", short: "spd", current: speedCurrent, target: speedTarget, setCurrent: setSpeedCurrent, setTarget: setSpeedTarget})
    statData.push({stat: "Attack", short: "atk", current: attackCurrent, target: attackTarget, setCurrent: setAttackCurrent, setTarget: setAttackTarget})
    statData.push({stat: "Defense", short: "def", current: defenseCurrent, target: defenseTarget, setCurrent: setDefenseCurrent, setTarget: setDefenseTarget})
    statData.push({stat: "Special Attack", short: "spatk", current: specialAttackCurrent, target: specialAttackTarget, setCurrent: setSpecialAttackCurrent, setTarget: setSpecialAttackTarget})
    statData.push({stat: "SpecialDefense", short: "spdef", current: specialDefenseCurrent, target: specialDefenseTarget, setCurrent: setSpecialDefenseCurrent, setTarget: setSpecialDefenseTarget})
    statData.push({stat: "Total", short: "total", current: totalCurrent, target: totalTarget, setCurrent: setTotalCurrent, setTarget: setTotalTarget})
    
    const addTVs = (stat, amount) => {
        const data = statData.find(data => data.stat === stat)
        const newValue = Number(data.current) + Number(amount)
        if(newValue > 500) { data.setCurrent(500) }
        else if(newValue < 0) { data.setCurrent(0) }
        else { data.setCurrent(Number(data.current) + Number(amount)) }
    }

    const inputCheckCurrent = (e, stat) => {
        const value = inputCheck(e.target.value, stat.current, totalCurrent)
        setTotalCurrent((Number(totalCurrent) - Number(stat.current)) + Number(value))
        stat.setCurrent(Number(value))
    }

    const inputCheckTarget = (e, stat) => {
        const value = inputCheck(e.target.value, stat.target, totalTarget)
        setTotalTarget((totalTarget - stat.target) + value)
        stat.setTarget(value)
    }

    const inputCheck = (update, current, total) => {
        const test = update.match(/[^0-9]/g)
        if((test && test.length>0) || update > 500) {return current}
        else if(update < 0) {return 0}
        else if(((Number(total) - Number(current)) + Number(update) )> 1000) {return current}
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
        setTem(selectedTem)
        props.return(selectedTem[0], index)
    }

    const handleDeleteSelected = (index, tem) => {
        for(const data in statData) {
            statData[data].setCurrent(0)
            statData[data].setTarget(0)
        }
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
                    <FormControl readOnly={stat.stat === "Total"} value={stat.current} onChange={(e) => inputCheckCurrent(e, stat)}/>
                    <FormControl readOnly={stat.stat === "Total"} value={stat.target} onChange={(e) => inputCheckTarget(e, stat)}/>
                </InputGroup>
            </Row>
    )})

  return (
    <Container key={props.index}>
        <Row>
            <InputGroup>
                <Form.Control as="select" value={tem.name} 
                    onChange={(e) => handleChangedSelected(e, props.index)}>
                    <option readOnly>Select a Tem...</option>
                    {fullTemList}
                </Form.Control>
                <Button variant="outline-secondary" onClick={() => handleDeleteSelected(props.index, tem.name)}>
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
