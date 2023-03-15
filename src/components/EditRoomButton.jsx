import React, { useState } from 'react'
import { Button, Col, Row, Form, Modal, Container } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'
import { cities_a_to_z } from '../data/cities.js'
import { API_URL } from '../App.js'



const EditGuestButton = ({ room, rooms }) => {

    const [show, setShow] = useState(false)

    const schema = yup.object().shape({
        room_no: yup.string()
            .matches('[0-9A-Za-z]', 'This field must consist of only alphanumeric characters.')
            .required('This field is required.'),
        bed_capacity: yup.number()
            .min(0, 'This field must be at least 10 characters.')
            .max(30, 'This field must be at most 10 characters'),
        available_beds: yup.number()
            .min(0, 'This field must be at least 10 characters.')
            .max(30, 'This field must be at most 10 characters'),
        description: yup.string()
            .max(100, 'This field must be at most 100 characters.')
    })

    return (
        <>
            <Button variant="primary" size="sm" onClick={() => setShow(true)}>
                Edit
            </Button>

            <Formik
                validationSchema={schema}
                onSubmit={
                    async (values) => {
                        await fetch(
                            `${API_URL}/rooms/`,
                            {
                                method: 'PUT',
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
                    bed_capacity: `${room.bed_capacity}`,
                    available_beds: `${room.available_beds}`,
                    description: `${room.description}`
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Modal
                            show={show}
                            onHide={() => setShow(false)}
                            size='md'
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Room</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group md="5" controlId="validationFormik01">
                                    <Form.Label><font color="red">*</font> Enter room's number.</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="room_no"
                                        placeholder="e.g. Z05"
                                        value={values.room_no}
                                        onChange={handleChange}
                                        isValid={touched.room_no && !errors.room_no}
                                        isInvalid={!!errors.room_no}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.room_no}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group md="5" controlId="validationFormik02">
                                    <Form.Label><font color="red">*</font> Enter room's bed capacity.</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="bed_capacity"
                                        placeholder="e.g. 4"
                                        value={values.bed_capacity}
                                        onChange={handleChange}
                                        isValid={touched.bed_capacity && !errors.bed_capacity}
                                        isInvalid={!!errors.bed_capacity}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.bed_capacity}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group md="5" controlId="validationFormik03">
                                    <Form.Label><font color="red">*</font> Enter the number of available beds.</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="available_beds"
                                        placeholder="e.g. 4"
                                        value={values.available_beds}
                                        onChange={handleChange}
                                        isValid={touched.available_beds && !errors.available_beds}
                                        isInvalid={!!errors.available_beds}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.available_beds}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group md="12" controlId="validationFormik04">
                                    <Form.Label>Please enter the room's description.</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="description"
                                        placeholder="e.g. Heating problem."
                                        value={values.description}
                                        onChange={handleChange}
                                        isValid={touched.description && !errors.description}
                                        isInvalid={!!errors.description}
                                        rows={3} />
                                    <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                                </Form.Group>
                            </Modal.Body>
                            <div className="mx-3 mb-3 d-grid gap-2">
                                <Button variant="primary" size="lg" onClick={() => handleSubmit()}>
                                    Edit Guest
                                </Button>
                                <Button variant="outline-secondary" size="lg" onClick={() => setShow(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </Modal>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default EditGuestButton