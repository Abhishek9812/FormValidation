import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Table, Container } from 'react-bootstrap';
import axios from "axios";


const Home = () => {
    const [users, setUsers] = useState([]);
    const history = useHistory();

    const getAllData = async ()=>{
        await axios.get("http://localhost:5000/getAllUser")
                .then((res)=>{
                    if(res.status === 200){
                        console.log(res);
                        setUsers(res.data);
                    }
                }).catch((err)=>{
                    console.log(err);
                })
    }

    useEffect(()=>{
        getAllData();
    },[])
    return (
        <>
            <Container className='mt-5'>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Date of Birth</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Country</th>
                            <th>State</th>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.dob}</td>
                                <td>{user.age}</td>
                                <td>{user.gender}</td>
                                <td>{user.country}</td>
                                <td>{user.state}</td>
                                <td>{user.city}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Container>
            <Button variant="primary" type="submit" onClick={() => history.push('/signUp')} >
                Add User
            </Button>


        </>
    )
}

export default Home;