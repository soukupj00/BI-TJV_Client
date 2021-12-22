import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

import classes from "../CreateEdit.module.scss"


const AddFitnessCenter = (props) => {
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [houseNumber, setHouseNumber] = useState(0);

    useEffect( () => {
        if (props.match.params.id !== 'new') {
            axios.get(`http://localhost:8080/addresses/${props.match.params.id}`).then(res => {
                setCity(res.data.city)
                setStreet(res.data.street)
                setPostalCode(res.data.postalCode)
                res.data.houseNumber ? setHouseNumber(res.data.houseNumber) : setHouseNumber(0)
            }).catch(err => {
                //Not in the 200 response range
                console.log(err.data);
                console.log(err.status);
                console.log(err.headers);
            });
        }
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        if (!city || !street || !postalCode) {
            alert('Please fill out the form.');
            return;
        }

        if (props.match.params.id === 'new') {
            axios.post(`http://localhost:8080/addresses`,
                {city, street, postalCode, houseNumber},
                {
                    headers: {
                        'Content-type': 'application/json; charset=utf-8'
                    }
                })
                .catch(err => {
                    //Not in the 200 response range
                    console.log(err.data);
                    console.log(err.status);
                    console.log(err.headers);
                });

            setCity('');
            setStreet('');
            setPostalCode('');
            setHouseNumber(0);
        } else {
            axios.put(`http://localhost:8080/addresses/${props.match.params.id}`,
                {city, street, postalCode, houseNumber},
                {
                    headers: {
                        'Content-type': 'application/json; charset=utf-8'
                    }
                })
                .catch(err => {
                    //Not in the 200 response range
                    console.log(err.data);
                    console.log(err.status);
                    console.log(err.headers);
                });

            setCity('');
            setStreet('');
            setPostalCode('');
            setHouseNumber(0);
        }
    }

    return (
        <div className={classes.createContainer}>
            <div className={classes.createForm}>

                <h2>Please fill all information below</h2>
                <ul className={classes.noBullet}>

                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Input className={classes.inputFields} type="text" name="city" value={city} placeholder="City"
                                   onChange={e => setCity(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <Input className={classes.inputFields} type="text" name="street" value={street} placeholder="Street"
                                   onChange={e => setStreet(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <Input className={classes.inputFields} type="text" name="postalCode" value={postalCode} placeholder="Postal code"
                                   onChange={e => setPostalCode(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <Input className={classes.inputFields} type="text" name="houseNumber" value={houseNumber} placeholder="House number"
                                   onChange={e => setHouseNumber(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <Button className={classes.createButton} value="Save address">Save</Button>{' '}
                            <Button className={classes.createButton} tag={Link} to="/">Cancel</Button>
                        </FormGroup>
                    </Form>
                </ul>
            </div>
        </div>
    );
};

export default AddFitnessCenter;