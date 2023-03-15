import React, { useState } from 'react'
import { Button, Col, Row, Form, Modal } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'
import { cities_a_to_z } from '../data/cities.js'
import { API_URL, setGuests } from '../App.js'



const AddGuestButton = ({ rooms }) => {

    const [show, setShow] = useState(false)

    const schema = yup.object().shape({
        room_no: yup.string()
            .matches('[0-9A-Za-z]', 'This field must consist of only alphanumeric characters.')
            .required('This field is required.'),
        tc_no: yup.string()
            .matches('[0-9]', 'This field must consists of only digits.')
            .min(11, 'This field must be exactly 11 characters.')
            .max(11, 'This field must be exactly 11 characters.'),
        phone: yup.string()
            .matches('[0-9]', 'This field must consists of only digits.')
            .min(10, 'This field must be at least 10 characters.')
            .max(10, 'This field must be at most 10 characters'),
        full_name: yup.string()
            .min(3, 'This field must be at least 3 characters.')
            .max(50, 'This field must be at most 50 characters.')
            .matches('[A-Za-z]', 'This field must consist of letters only.')
            .required('This field is required.'),
        origin_city: yup.string()
            .max(50, 'This field must be at most 50 characters.')
            .matches('[A-Za-z]', 'This field must consist of letters only.'),
        check_in_date: yup.date()
            .min('2020-01-01', 'This field must be at least 2020-01-01')
            .max('2030-01-01', 'This field must be at most 2030-01-01'),
        check_out_date: yup.date()
            .min('2020-01-01', 'This field must be at least 2020-01-01')
            .max('2030-01-01', 'This field must be at most 2030-01-01'),
        duty: yup.string()
            .max(50, 'This field must be at most 50 characters.'),
        description: yup.string()
            .max(100, 'This field must be at most 100 characters.')
    })

    return (
        <>
            <Button variant="success" onClick={() => setShow(true)}>
                Add New Guest
            </Button>

            <Formik
                validationSchema={schema}
                onSubmit={
                    async (values) => {
                        console.log(values)
                        await fetch(
                            `${API_URL}/guests/`,
                            {
                                method: 'POST',
                                mode: 'cors',
                                body: JSON.stringify(values),
                                headers: {
                                    'Content-type': 'application/json; charset=UTF-8',
                                },
                            }
                        )

                        setShow(false)
                    }
                }
                initialValues={{
                    room_no: "",
                    full_name: "",
                    tc_no: "",
                    origin_city: "",
                    duty: "",
                    phone: "",
                    check_in_date: new Date().toISOString().substring(0, 10),
                    check_out_date: "",
                    current: true,
                    child: false,
                    description: ""
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form id="addGuestForm" noValidate onSubmit={handleSubmit}>
                        <Modal
                            show={show}
                            onHide={() => setShow(false)}
                            size='lg'
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Add a New Guest</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="2" controlId="validationFormik01">
                                        <Form.Label><font color="red">*</font> Room No.</Form.Label>
                                        <Form.Select
                                            autoFocus
                                            name="room_no"
                                            value={values.room_no}
                                            onChange={handleChange}
                                            isValid={touched.room_no && !errors.room_no}
                                            isInvalid={!!errors.room_no}
                                        >
                                            <option value="">---</option>
                                            {rooms.map((room) => {
                                                return (
                                                    <>
                                                        <option>{room.room_no}</option>
                                                    </>
                                                )
                                            })}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">{errors.room_no}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="5" controlId="validationFormik02">
                                        <Form.Label>Enter guest's T.C. Identity No</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="tc_no"
                                            placeholder="e.g. 12312312312"
                                            value={values.tc_no}
                                            onChange={handleChange}
                                            isValid={touched.tc_no && !errors.tc_no}
                                            isInvalid={!!errors.tc_no}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.tc_no}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="5" controlId="validationFormik03">
                                        <Form.Label>Please enter the guest's phone number.</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="phone"
                                            placeholder="e.g. 5051231212"
                                            value={values.phone}
                                            onChange={handleChange}
                                            isValid={touched.phone && !errors.phone}
                                            isInvalid={!!errors.phone}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className='mb-3'>
                                    <Form.Group as={Col} md="6" controlId="validationFormik04">
                                        <Form.Label><font color="red">*</font> Enter your full name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="full_name"
                                            placeholder="e.g. Ayşe Öztürk"
                                            value={values.full_name}
                                            onChange={handleChange}
                                            isValid={touched.full_name && !errors.full_name}
                                            isInvalid={!!errors.full_name}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.full_name}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="validationFormik05">
                                        <Form.Label>Select the guest's origin city.</Form.Label>
                                        <Form.Select
                                            name="origin_city"
                                            value={values.origin_city}
                                            onChange={handleChange}
                                            isValid={touched.origin_city && !errors.origin_city}
                                            isInvalid={!!errors.origin_city}
                                        >
                                            <option>Select a city</option>
                                            {cities_a_to_z.map((city) => {
                                                return (
                                                    <>
                                                        <option>{city}</option>
                                                    </>
                                                )
                                            })}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">{errors.origin_city}</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" controlId="validationFormik06">
                                        <Form.Label>Please enter the guest's check-in date.</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="check_in_date"
                                            value={values.check_in_date}
                                            onChange={handleChange}
                                            isValid={touched.check_in_date && !errors.check_in_date}
                                            isInvalid={!!errors.check_in_date}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.check_in_date}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="validationFormik07">
                                        <Form.Label>Please enter the guest's check-out date.</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="check_out_date"
                                            value={values.check_out_date}
                                            onChange={handleChange}
                                            isValid={touched.check_out_date && !errors.check_out_date}
                                            isInvalid={!!errors.check_out_date}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.check_out_date}</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="8" controlId="validationFormik08">
                                        <Form.Label>Please enter the guest's duty.</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="duty"
                                            placeholder="e.g. Earthquake victim"
                                            value={values.duty}
                                            onChange={handleChange}
                                            isValid={touched.duty && !errors.duty}
                                            isInvalid={!!errors.duty}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.duty}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Col className="mt-4">
                                        <Form.Group controlId="validationFormik09">
                                            <Form.Check
                                                name='current'
                                                type='checkbox'
                                                checked={values.current}
                                                onChange={handleChange}
                                                isValid={touched.current && !errors.current}
                                                isInvalid={!!errors.current}
                                                label='Current'
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="validationFormik10">
                                            <Form.Check
                                                name='child'
                                                type='checkbox'
                                                value={values.child}
                                                onChange={handleChange}
                                                isValid={touched.child && !errors.child}
                                                isInvalid={!!errors.child}
                                                label='Child'
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} md="12" controlId="validationFormik11">
                                        <Form.Label>Please enter the guest's description.</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            name="description"
                                            placeholder="e.g. A mother with 3 children."
                                            value={values.description}
                                            onChange={handleChange}
                                            isValid={touched.description && !errors.description}
                                            isInvalid={!!errors.description}
                                            rows={3} />
                                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShow(false)}>
                                    Cancel
                                </Button>
                                <Button variant="primary" onClick={() => handleSubmit()}>
                                    Add Guest
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default AddGuestButton