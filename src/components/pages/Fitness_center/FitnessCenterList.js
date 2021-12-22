import {Fragment, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {Button, ButtonGroup, Table} from 'reactstrap';
import axios from "axios";

import classes from "../ListPages.module.scss"

const FitnessCenterList = () => {

    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/addresses')
            .then(res => {
                setAddresses(res.data)
            })
            .catch(err => {
                //Not in the 200 response range
                console.log(err.data);
                console.log(err.status);
                console.log(err.headers);
            })
    }, []);

    function deleteAddress(id) {
        axios.delete(`http://localhost:8080/addresses/${id}`)
            .catch(err => {
                //Not in the 200 response range
                console.log(err.data);
                console.log(err.status);
                console.log(err.headers);
            })
        window.location.reload();
    };

    const addressList = addresses.map(address => {
        return <tr key={address.idAddress}>
            <td>{address.city}</td>
            <td>{address.street}</td>
            <td>{address.houseNumber}</td>
            <td>{address.postalCode}</td>
            <td>
                <ButtonGroup>
                    <Button className={classes.container_button_edit} tag={Link} to={"/addresses/" + address.idAddress}>Edit</Button>
                    <Button className={classes.container_button_delete} onClick={() => deleteAddress(address.idAddress)}>Delete Address</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <Fragment>
            <div className={classes.container}>
                <div className={classes.container_button}>
                    <Button className={classes.button} tag={Link} to="/addresses/new">Add Address</Button>
                </div>

                <div className={classes.content_table}>
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
        </Fragment>
    );
};

export default FitnessCenterList;