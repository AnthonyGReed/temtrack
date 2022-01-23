import {React, useImperativeHandle, useState, forwardRef} from 'react';
import { Container, Row, Col, FormControl, InputGroup, Form, Button } from 'react-bootstrap'
import './TemData.css'

const TemData = forwardRef((props, ref) => {
    const [tem, setTem] = useState(0);
    const [hpCurrent, setHpCurrent] = useState(0);
    const [hpTarget, setHpTarget] = useState(0);
    const [hpRemaining, setHpRemaining] = useState("-");
    const [staminaCurrent, setStaminaCurrent] = useState(0);
    const [staminaTarget, setStaminaTarget] = useState(0);
    const [staminaRemaining, setStaminaRemaining] = useState("-");
    const [speedCurrent, setSpeedCurrent] = useState(0);
    const [speedTarget, setSpeedTarget] = useState(0);
    const [speedRemaining, setSpeedRemaining] = useState("-");
    const [attackCurrent, setAttackCurrent] = useState(0);
    const [attackTarget, setAttackTarget] = useState(0);
    const [attackRemaining, setAttackRemaining] = useState("-");
    const [defenseCurrent, setDefenseCurrent] = useState(0);
    const [defenseTarget, setDefenseTarget] = useState(0);
    const [defenseRemaining, setDefenseRemaining] = useState("-");
    const [specialAttackCurrent, setSpecialAttackCurrent] = useState(0);
    const [specialAttackTarget, setSpecialAttackTarget] = useState(0);
    const [specialAttackRemaining, setSpecialAttackRemaining] = useState("-");
    const [specialDefenseCurrent, setSpecialDefenseCurrent] = useState(0);
    const [specialDefenseTarget, setSpecialDefenseTarget] = useState(0);
    const [specialDefenseRemaining, setSpecialDefenseRemaining] = useState("-");
    const [totalCurrent, setTotalCurrent] = useState(0);
    const [totalTarget, setTotalTarget] = useState(0);
    const [totalRemaining, setTotalRemaining] = useState("-");
    const [defeated, setDefeated] = useState(props.defeated);


    let statData = []
    statData.push({stat: "HP", short: "hp", current: hpCurrent, target: hpTarget, remaining: hpRemaining, setCurrent: setHpCurrent, setTarget: setHpTarget, setRemaining: setHpRemaining})
    statData.push({stat: "Stamina", short: "sta", current: staminaCurrent, target: staminaTarget, remaining: staminaRemaining, setCurrent: setStaminaCurrent, setTarget: setStaminaTarget, setRemaining: setStaminaRemaining})
    statData.push({stat: "Speed", short: "spd", current: speedCurrent, target: speedTarget, remaining: speedRemaining, setCurrent: setSpeedCurrent, setTarget: setSpeedTarget, setRemaining: setSpeedRemaining})
    statData.push({stat: "Attack", short: "atk", current: attackCurrent, target: attackTarget, remaining: attackRemaining, setCurrent: setAttackCurrent, setTarget: setAttackTarget, setRemaining: setAttackRemaining})
    statData.push({stat: "Defense", short: "def", current: defenseCurrent, target: defenseTarget, remaining: defenseRemaining, setCurrent: setDefenseCurrent, setTarget: setDefenseTarget, setRemaining: setDefenseRemaining})
    statData.push({stat: "Special Attack", short: "spatk", current: specialAttackCurrent, target: specialAttackTarget, remaining: specialAttackRemaining, setCurrent: setSpecialAttackCurrent, setTarget: setSpecialAttackTarget, setRemaining: setSpecialAttackRemaining})
    statData.push({stat: "SpecialDefense", short: "spdef", current: specialDefenseCurrent, target: specialDefenseTarget, remaining: specialDefenseRemaining, setCurrent: setSpecialDefenseCurrent, setTarget: setSpecialDefenseTarget, setRemaining: setSpecialDefenseRemaining})
    statData.push({stat: "Total", short: "total", current: totalCurrent, target: totalTarget, remaining: totalRemaining, setCurrent: setTotalCurrent, setTarget: setTotalTarget, setRemaining: setTotalRemaining})
    
    const addTVs = (stat, amount) => {
        const data = statData.find(data => data.stat === stat)
        const newValue = Number(data.current) + Number(amount)
        if(newValue > 500) { data.setCurrent(500) }
        else if(newValue < 0) { data.setCurrent(0) }
        else if((Number(amount) + Number(totalCurrent)) > 1000) { 
            console.log("amount: " + amount)
            console.log("total current: " + totalCurrent)
            console.log("newValue: " + newValue)
            const val = Number(newValue) - ((Number(amount) + Number(totalCurrent)) - 1000)
            data.setCurrent(val)
            calculateCurrentTotal()
        }
        else {
            data.setCurrent(newValue)
            calculateCurrentTotal()
        }
    }

    const inputCheckCurrent = (e, stat) => {
        const value = inputCheck(e.target.value, stat.current, totalCurrent)
        setTotalCurrent((Number(totalCurrent) - Number(stat.current)) + Number(value))
        stat.setCurrent(Number(value))

    }

    const inputCheckTarget = (e, stat) => {
        const value = inputCheck(e.target.value, stat.target, totalTarget)
        setTotalTarget((Number(totalTarget) - Number(stat.target)) + Number(value))
        stat.setTarget(Number(value))
    }

    const inputCheck = (update, current, total) => {
        const test = update.match(/[^0-9]/g)
        if((test && test.length>0) || update > 500) {return current}
        else if(update < 0) {return 0}
        else if(((Number(total) - Number(current)) + Number(update) )> 1000) {return current}
        else {return update}
    }
    
    const calculateCurrentTotal = () => {
        let total = 0
        for(const stat in statData) {
            const data = statData[stat]
            if(data.name !== "Total") {
               total += Number(data.current)
            }
        }
        setTotalCurrent(total)
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
        setTem(selectedTem[0])
        props.return(selectedTem[0], index)
    }

    const handleDeleteSelected = () => {
        for(const data in statData) {
            statData[data].setCurrent(0)
            statData[data].setTarget(0)
        }
    }

    if(props.defeated.name !== undefined && props.defeated.name !== defeated.name) {
        setDefeated(props.defeated)
    }

    if(defeated.tvYields !== undefined) {
        let total = 0
        for(const stat in statData) {
            const data = statData[stat]
            if(data.short === "total") {
                if(data.remaining !== total) {
                    data.setRemaining(Number(total))
                } 
            } else {
                const tvYield = defeated.tvYields[data.short]
                if(tvYield > 0) {
                    let turnsRemaining = ((Number(data.target) - Number(data.current)) / Number(tvYield))
                    console.log(props.protiens)
                    console.log(tem.name)
                    if(props.protiens === tem.name) {
                        turnsRemaining = Math.floor(turnsRemaining/2)
                    }
                    if(data.remaining !== turnsRemaining) {
                        data.setRemaining(turnsRemaining)
                    }
                    total += turnsRemaining
                } else {
                    if(data.remaining !== "-") {
                        data.setRemaining("-")
                    }
                }
            }
        }
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
                <InputGroup className={"text-center"}>
                    <InputGroup.Text className={stat.class}>{stat.short}</InputGroup.Text>
                    <FormControl className={"px-0 text-center"} readOnly={stat.stat === "Total"} value={stat.current} onChange={(e) => inputCheckCurrent(e, stat)}/>
                    <FormControl className={"px-0 text-center"} readOnly={stat.stat === "Total"} value={stat.target} onChange={(e) => inputCheckTarget(e, stat)}/>
                    <FormControl className={"px-0 text-center"} readOnly value={stat.remaining}/>
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
                <Button variant="outline-secondary" onClick={handleDeleteSelected}>
                    X
                </Button>
            </InputGroup>
        </Row>
        <Row className="justify-content-end pt-2">
            <Col className="px-0 mx-0">&nbsp;</Col>
            <Col className="text-center px-0 mx-0"><h6>Current<br/>TVs</h6></Col>
            <Col className="text-center px-0 mx-0"><h6>Target<br/>TVs</h6></Col>
            <Col className="text-center px-0 mx-0"><h6>Remaining<br/>Encounters</h6></Col>
        </Row>
        {TVList}
    </Container>
  )
});

export default TemData;
