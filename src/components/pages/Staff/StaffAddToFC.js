import {Fragment, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {Button, Table} from 'reactstrap';
import axios from "axios";

import classes from "../styles/ListPages.module.scss"

const StaffAddToFC = (props) => {
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
            });
    }, []);

    const handleChange = (idFitnessCenter) => {
        axios.put(`http://localhost:8080/staff/${props.match.params.id}/add_to_fc/${idFitnessCenter}`)
            .catch(err => {
                //Not in the 200 response range
                console.log(err.data);
                console.log(err.status);
                console.log(err.headers);
            });
        alert("Staff was added to chosen fitness center.");
    }

    const fitnessCenterList = fitnessCenters.map(fitnessCenter => {
        return <tr key={fitnessCenter.idFitnessCenter}>
            <td>{fitnessCenter.name}</td>
            <td>{fitnessCenter.type}</td>
            <td>
                <Button className={classes.container_button_edit} onClick={() => handleChange(fitnessCenter.idFitnessCenter)}>Add to this Fitness Center</Button>
            </td>
        </tr>
    });

    return (
        <Fragment>
            <div className={classes.container}>
                <div className={classes.container_button}>
                    <Button className={classes.button} tag={Link} to="/staff">Return to Staff List</Button>
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

export default StaffAddToFC;