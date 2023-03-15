import { React } from "react"
import { Button, Col, Container, Row, Stack } from "react-bootstrap"

const HomePage = () => {
    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1>Welcome to the Hostel Management System</h1>
                    <p className="lead">Please select the option that you want to perform from the menu.</p>
                </Col>
                <Col>
                    <Stack direction="vertical" gap={2}>
                        <Button variant="outline-primary" href="/guests">List Guests</Button>
                        <Button variant="outline-secondary" href="/guests/add">Add New Guest</Button>
                        <Button variant="outline-primary" href="/rooms">List Rooms</Button>
                        <Button variant="outline-secondary" href="/guests/add">Add New Room</Button>
                    </Stack>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage