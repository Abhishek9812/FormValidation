import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { toast } from "react-toastify";
import { Country, State, City } from 'country-state-city';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SignupForm = () => {
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [countryOptions, setCountryOptions] = useState([]);
    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [isStateDisabled, setIsStateDisabled] = useState(true);
    const [isCityDisabled, setIsCityDisabled] = useState(true);
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [age, setAge] = useState('');


    useEffect(() => {
        const newArr = Country.getAllCountries().map(item => ({ value: item.isoCode, label: item.name }));
        setCountryOptions(newArr);
    }, [])

    const handleInputChange = (event, setState) => {
        const regex = /^[a-zA-Z]+$/; // Only accept alphabets
        if (regex.test(event.target.value) || event.target.value === '') {
            setState(event.target.value);
        }
    };


    const handleCountryChange = (option) => {
        setCountry(option.label);
        setCountryCode(option.value);
        const allStates = State.getStatesOfCountry(option.value)
        setStateOptions(allStates.map(item => ({ value: item.isoCode, label: item.name })));
        setState('');
        setCity('');
        setIsStateDisabled(false);
        setIsCityDisabled(true);
    };

    const handleStateChange = (option) => {
        setState(option.label);
        const allCities = City.getCitiesOfState(countryCode, option.value);
        setCityOptions(allCities.map(item => ({ value: item.isoCode, label: item.name })));
        setCity('');
        setIsCityDisabled(false);
    };

    const handleCityChange = (option) => {
        setCity(option.label);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = { firstName, lastName, email, country, state, city, gender, dob, age };
        await axios.post('http://localhost:5000/createUser', data)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('User Register Successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    history.push('/');
                    e.target.reset();
                    console.log("if block");
                } else {
                    toast.error(res.data.msg, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    console.log("Else block");
                }
            }).catch((err) => {
                console.log(err);
            })
    };

    return (
        <Container className='mt-5'>
            <Form onSubmit={e => handleSubmit(e)}>
                <Row className="mb-3">
                    <Form.Label column sm="3">
                        First Name:
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="text"
                            placeholder="Enter First Name"
                            value={firstName}
                            onChange={(event) => handleInputChange(event, setFirstName)}
                            required
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Form.Label column sm="3">
                        Last Name:
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="text"
                            placeholder="Enter Last Name"
                            value={lastName}
                            onChange={(event) => handleInputChange(event, setLastName)}
                            required
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Form.Label column sm="3">
                        Email:
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Form.Label column sm="3">
                        Country:
                    </Form.Label>
                    <Col sm="9">
                        <Select options={countryOptions} value={{ value: country, label: country }} onChange={handleCountryChange} required />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Form.Label column sm="3">
                        State:
                    </Form.Label>
                    <Col sm="9">
                        <Select options={stateOptions} value={{ value: state, label: state }} onChange={handleStateChange} isDisabled={isStateDisabled} />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Form.Label column sm="3">
                        City:
                    </Form.Label>
                    <Col sm="9">
                        <Select options={cityOptions} value={{ value: city, label: city }} onChange={handleCityChange} isDisabled={isCityDisabled} />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Form.Label column sm="3">
                        Gender:
                    </Form.Label>
                    <Col sm="2">
                        <Form.Check inline label="Male" type="radio" value="male" checked={gender === "male"}
                            onChange={(e) => setGender(e.target.value)} name="gender" />
                        <Form.Check inline label="Female" type="radio" checked={gender === "female"}
                            onChange={(e) => setGender(e.target.value)} value="female" name="gender" />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Form.Label column sm="3">
                        Date of Birth:
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="date"
                            placeholder="Enter Date of Birth"
                            value={dob}
                            onChange={(e) => {
                                setDob(e.target.value);
                                const ageDiffMs = Date.now() - new Date(e.target.value).getTime();
                                const ageDate = new Date(ageDiffMs);
                                setAge(Math.abs(ageDate.getUTCFullYear() - 1970));
                            }}
                            required
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Form.Label column sm="3">
                        Age:
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="number"
                            placeholder="Enter Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                            disabled
                        />
                    </Col>
                </Row>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default SignupForm;