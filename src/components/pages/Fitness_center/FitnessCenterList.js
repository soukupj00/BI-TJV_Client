import {Fragment, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {Button, ButtonGroup, Table} from 'reactstrap';
import axios from "axios";

import classes from "../styles/ListPages.module.scss"

const FitnessCenterList = () => {

    const [fitnessCenters, setFitnessCenters] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/fitness_centers')
            .then(res => {
                setFitnessCenters(res.data)
            })
            .catch(err => {
                //Not in the 200 response range
                console.log(err.data);
                console.log(err.status);
                console.log(err.headers);
            })
    }, []);

    function deleteAddress(id) {
        axios.delete(`http://localhost:8080/fitness_centers/${id}`)
            .catch(err => {
                //Not in the 200 response range
                console.log(err.data);
                console.log(err.status);
                console.log(err.headers);
            })
        window.location.reload();
    }

    const fitnessCenterList = fitnessCenters.map(fitnessCenter => {
        return <tr key={fitnessCenter.idFitnessCenter}>
            <td>{fitnessCenter.name}</td>
            <td>{fitnessCenter.type}</td>
            <td>
                <ButtonGroup>
                    <Button className={classes.container_button_edit} tag={Link} to={"/fitness_centers/" + fitnessCenter.idFitnessCenter}>Edit</Button>
                    <Button className={classes.container_button_delete} onClick={() => deleteAddress(fitnessCenter.idFitnessCenter)}>Delete Fitness Center</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <Fragment>
            <div className={classes.container}>
                <div className={classes.container_button}>
                    <Button className={classes.button} tag={Link} to="/fitness_centers/new">Add Fitness Center</Button>
                </div>

                <div className={classes.content_table}>
                    <Table className="mt-4" width="100%">
                        <thead>
                        <tr>
                            <th width="40%">Name</th>
                            <th width="30%">Type of Fitness center</th>
                            <th width="30%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {fitnessCenterList}
                        </tbody>
                    </Table>
                </div>
            </div>
        </Fragment>
    );
};

export default FitnessCenterList;