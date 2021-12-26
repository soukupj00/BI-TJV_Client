import {Button, Form, FormGroup, Input, Table} from "reactstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

import classes from "../styles/CreateEdit.module.scss"
import classesList from "../styles/ListPages.module.scss"


const AddFitnessCenter = (props) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('All-purpose');
    const [addressId, setAddressId] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const [addressSelected, setAddressSelected] = useState(false);
    //const types = ['All-purpose', 'Bodybuilding', 'Crossfit', 'Powerlifting', 'Strongman'];

    useEffect( () => {
        axios.get(`http://localhost:8080/addresses`)
            .then(res => {
                setAddresses(res.data)
            })
            .catch(err => {
                //Not in the 200 response range
                console.log(err.data);
                console.log(err.status);
                console.log(err.headers);
            })

        if (props.match.params.id !== 'new') {
            axios.get(`http://localhost:8080/fitness_centers/${props.match.params.id}`).then(res => {
                setName(res.data.name)
                setType(res.data.type)
                setAddressId(res.data.idAddress)
                setAddressSelected(true);
            }).catch(err => {
                //Not in the 200 response range
                console.log(err.data);
                console.log(err.status);
                console.log(err.headers);
            });
        }
    });

    function convertType () {
        switch (type) {
            case 'ALL-PURPOSE' : return 1;
            case 'STRONGMAN' : return 2;
            case 'POWERLIFTING' : return 3;
            case 'CROSSFIT' : return 4;
            case 'BODYBUILDING' : return 5;
            default : return 0;
        }
    }

    const addressList = addresses.map(address => {
        return <tr key={address.idAddress}>
            <td>{address.city}</td>
            <td>{address.street}</td>
            <td>{address.houseNumber}</td>
            <td>{address.postalCode}</td>
            <td>
                <Button className={classesList.container_button_edit} onClick={() => {setAddressSelected(true); setAddressId(address.idAddress)}}>Select Address</Button>
            </td>
        </tr>
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (!name || !type) {
            alert('Please fill out the form.');
            return;
        }

        if (!addressSelected) {
            alert('Please select address where fitness center will be located at.');
            return;
        }

        let typeInt = Number(convertType(type));

        if (props.match.params.id === 'new') {
            axios.post(`http://localhost:8080/fitness_centers`, {
                    name: name,
                    type: typeInt,
                    idAddress: addressId
                },
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
        } else {
            axios.put(`http://localhost:8080/fitness_centers/${props.match.params.id}`,{
                    name: name,
                    type: typeInt,
                    idAddress: addressId
                },
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
        }
        setName('');
        setType('');
        setAddressId(0);
        setAddressSelected(false);
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
                            <select className={classes.inputFields} value={type} placeholder="Type" onChange={e => setType(e.target.value)}>
                                <option value="ALL-PURPOSE">All-purpose</option>
                                <option value="BODYBUILDING">Bodybuilding</option>
                                <option value="CROSSFIT">Crossfit</option>
                                <option value="POWERLIFTING">Powerlifting</option>
                                <option value="STRONGMAN">Strongman</option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Button className={classes.createButton} value="Save fitness center">Save</Button>
                            <Button className={classes.createButton} tag={Link} to="/">Cancel</Button>
                        </FormGroup>
                    </Form>
                </ul>

                <h3>Address has {addressSelected ? '' : 'not'} been selected</h3>

            </div>

            <div className={classesList.container}>
                <div className={classesList.content_table}>
                    <Table className="mt-4" width="100%">
                        <thead>
                        <tr>
                            <th width="20%">City</th>
                            <th width="30%">Street</th>
                            <th width="15%">House number</th>
                            <th width="10%">Postal code</th>
                            <th width="25%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {addressList}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default AddFitnessCenter;