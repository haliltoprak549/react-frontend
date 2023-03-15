import React from 'react'
import { Button, Form, Stack, Container } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'
import { API_URL } from '../App.js'



const AddGuestPage = ({ rooms }) => {
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
            <Formik
                validationSchema={schema}
                onSubmit={
                    async (values) => {
                        console.log(values)
                        await fetch(
                            `${API_URL}/room/`,
                            {
                                method: 'POST',
                                mode: 'cors',
                                body: JSON.stringify(values),
                                headers: {
                                    'Content-type': 'application/json; charset=UTF-8',
                                },
                            }
                        )
                    }
                }
                initialValues={{
                    room_no: "",
                    bed_capacity: "",
                    available_beds: "",
                    description: ""
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Container md={2}>
                        <div className="mx-5 mt-3">
                            <h2>Add New Room</h2>
                        </div>
                        <div className="mx-5 mt-3">
                            <Form id="addGuestForm" noValidate onSubmit={handleSubmit}>
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
                                <Stack gap={3} className="mt-3">
                                    <Button variant="primary" size="lg" onClick={() => handleSubmit()}>
                                        Add Guest
                                    </Button>
                                    <Button variant="outline-danger" size="lg" outline>Clear</Button>
                                </Stack>
                            </Form>
                        </div>
                    </Container>
                )}
            </Formik>
        </>
    )
}

export default AddGuestPage