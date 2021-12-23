import {Fragment, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {Button, ButtonGroup, Table} from 'reactstrap';
import axios from "axios";

import classes from "../styles/ListPages.module.scss"

const StaffList = () => {

    const [staff, setStaff] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/staff')
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

    function deleteStaff(id) {
        axios.delete(`http://localhost:8080/staff/${id}`)
            .catch(err => {
                //Not in the 200 response range
                console.log(err.data);
                console.log(err.status);
                console.log(err.headers);
            })
        window.location.reload();
    }

    const staffList = staff.map(staffMember => {
        return <tr key={staffMember.idStaff}>
            <td>{staffMember.name}</td>
            <td>{staffMember.personalNumber}</td>
            <td>{staffMember.language}</td>
            <td>{staffMember.salary}</td>
            <td>
                <ButtonGroup>
                    <Button className={classes.container_button_edit} tag={Link}
                            to={"/fitness_centers/" + staffMember.idStaff}>Edit</Button>
                    <Button className={classes.container_button_add} tag={Link}
                            to={"/staff/" + staffMember.idStaff + "/add"}>Add to Fitness Center</Button>
                    <Button className={classes.container_button_delete}
                            onClick={() => deleteStaff(staffMember.idStaff)}>Remove Staff</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <Fragment>
            <div className={classes.background}>
                <div className={classes.container}>
                    <div className={classes.container_button}>
                        <Button className={classes.button} tag={Link} to="/staff/new">Add Staff</Button>
                    </div>

                    <div className={classes.content_table}>
                        <Table className="mt-4" width="100%">
                            <thead>
                            <tr>
                                <th width="25%">Name</th>
                                <th width="20%">Personal Number</th>
                                <th width="15%">Language</th>
                                <th width="10%">Salary</th>
                                <th width="30%">Actions</th>
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

export default StaffList;