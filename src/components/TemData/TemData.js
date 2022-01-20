import {React, useImperativeHandle, useState, forwardRef} from 'react';
import { Container, Row, Col, FormControl, InputGroup } from 'react-bootstrap'
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
        const test = e.target.value.match(/[^0-9]/g)
        if(test && test.length > 0) { stat.setCurrent(stat.current) }
        else if(e.target.value > 500) {stat.setCurrent(500)}
        else if(e.target.value < 0) {stat.setCurrent(0)}
        else {stat.setCurrent(e.target.value)}
    }

    const inputCheckTarget = (e, stat) => {
        const test = e.target.value.match(/[^0-9]/g)
        if(test && test.length > 0) { stat.setTarget(stat.target) }
        else if(e.target.value > 500) {stat.setTarget(500)}
        else if(e.target.value < 0) {stat.setTarget(0)}
        else {stat.setTarget(e.target.value)}
    }

    useImperativeHandle(ref, () => {
        return {
            addTVs: addTVs
        }
    })

    for(const stat in statData) {
        const data = statData[stat]
        if(data.current > data.target) { data.class = "over" } 
        else if (data.current === data.target) { data.class = "exact" } 
        else if (data.current >= data.target - 10) { data.class = "close" }
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
            <Col>&nbsp;</Col>
            <Col>Current TVs</Col>
            <Col>Target TVs</Col>
        </Row>
        {TVList}
    </Container>
  )
});

export default TemData;
