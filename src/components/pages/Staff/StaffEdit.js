import {Button, Form, FormGroup, Input} from "reactstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

import classes from "../styles/CreateEdit.module.scss"


const StaffEdit = (props) => {
    const [name, setName] = useState('');
    const [personalNumber, setPersonalNumber] = useState('');
    const [language, setLanguage] = useState('');
    const [salary, setSalary] = useState('');

    useEffect( () => {
        if (props.match.params.id !== 'new') {
            axios.get(`http://localhost:8080/staff/${props.match.params.id}`).then(res => {
                setName(res.data.name);
                setPersonalNumber(res.data.personalNumber);
                setLanguage(res.data.language);
                setSalary(res.data.salary);
            }).catch(err => {
                //Not in the 200 response range
                console.log(err.data);
                console.log(err.status);
                console.log(err.headers);
            });
        }
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        let pnInt = parseInt(personalNumber);
        let salaryInt = parseInt(salary);

        if (!name || !personalNumber || !language || !salary || salaryInt === 0 || pnInt === 0) {
            alert('Please fill out the form.');
            return;
        }

        if (props.match.params.id === 'new') {
            axios.post(`http://localhost:8080/staff`, {
                    name: name,
                    personalNumber: personalNumber,
                    language: language,
                    salary: salary
                },
                {
                    headers: {
                        'Content-type': 'application/json; charset=utf-8'
                    }
                })
                .catch(err => {
                    //Not in the 200 response range
                    if (err?.response?.status === 409) {
                        alert("Cannot create new staff with personal number, that is already in database. Personal number must be unique.")
                        return;
                    }
                    console.log(err.data);
                    console.log(err.status);
                    console.log(err.headers);
                });
        } else {
            axios.put(`http://localhost:8080/staff/${props.match.params.id}`,{
                    name: name,
                    personalNumber: personalNumber,
                    language: language,
                    salary: salary
                },
                {
                    headers: {
                        'Content-type': 'application/json; charset=utf-8'
                    }
                })
                .catch(err => {
                    //Not in the 200 response range
                    if (err?.response?.status === 409) {
                        alert("Cannot create new staff with personal number, that is already in database. Personal number must be unique.")
                        return;
                    }
                    console.log(err.data);
                    console.log(err.status);
                    console.log(err.headers);
                });
        }
        setName('');
        setPersonalNumber('');
        setLanguage('');
        setSalary('');
    }

    return (
        <div className={classes.createContainer}>
            <div className={classes.createForm}>

                <h2>Please fill all information below</h2>
                <ul className={classes.noBullet}>

                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Input className={classes.inputFields} type="text" name="name" value={name} placeholder="Name"
                                   onChange={e => setName(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <Input className={classes.inputFields} type="number" name="personalNumber" value={personalNumber} placeholder="Personal number"
                                   onChange={e => setPersonalNumber(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <Input className={classes.inputFields} type="text" name="language" value={language} placeholder="Language"
                                   onChange={e => setLanguage(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <Input className={classes.inputFields} type="number" name="salary" value={salary} placeholder="Salary"
                                   onChange={e => setSalary(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <Button className={classes.createButton} value="save_staff">Save</Button>
                            <Button className={classes.createButton} tag={Link} to="/">Cancel</Button>
                        </FormGroup>
                    </Form>
                </ul>
            </div>
        </div>
    );
};

export default StaffEdit;