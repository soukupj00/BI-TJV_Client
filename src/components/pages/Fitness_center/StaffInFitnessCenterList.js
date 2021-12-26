import {Fragment, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {Button, Table} from 'reactstrap';
import axios from "axios";

import classes from "../styles/ListPages.module.scss"

const StaffInFitnessCenterList = (props) => {

    const [staff, setStaff] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/staff/fitness_center/${props.match.params.id}`)
            .then(res => {
                setStaff(res.data)
            })
            .catch(err => {
                //Not in the 200 response range
                console.log(err.data);
                console.log(err.status);
                console.log(err.headers);
            })
    }, []);

    const staffList = staff.map(staffMember => {
        return <tr key={staffMember.idStaff}>
            <td>{staffMember.name}</td>
            <td>{staffMember.personalNumber}</td>
            <td>{staffMember.language}</td>
            <td>{staffMember.salary}</td>
        </tr>
    });

    return (
        <Fragment>
            <div className={classes.background}>
                <div className={classes.container}>
                    <div className={classes.container_button}>
                        <Button className={classes.button} tag={Link} to="/fitness_centers">Return to Fitness Center List</Button>
                    </div>

                    <div className={classes.content_table}>
                        <Table className="mt-4" width="100%">
                            <thead>
                            <tr>
                                <th width="35%">Name</th>
                                <th width="20%">Personal Number</th>
                                <th width="20%">Language</th>
                                <th width="15%">Salary</th>
                            </tr>
                            </thead>
                            <tbody>
                            {staffList}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default StaffInFitnessCenterList;