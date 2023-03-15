import React from "react"
import { Container, Table, Button, Stack } from "react-bootstrap"
import AddGuestButton from "../components/AddGuestButton"
import EditGuestButton from '../components/EditGuestButton'

const GuestsPage = ({ guests, rooms }) => {
    return (
        <Container fluid>
            <div className="bg-light mt-3">
                <AddGuestButton rooms={rooms} />
            </div>
            <div className="bg-light mt-3">
                <Table striped size="sm" hover border responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Room ID</th>
                            <th>Name</th>
                            <th>T.C. ID</th>
                            <th>Origin City</th>
                            <th>Duty</th>
                            <th>Phone</th>
                            <th>Checkin date</th>
                            <th>Checkout date</th>
                            <th>Current</th>
                            <th>Child</th>
                            <th>Description</th>
                            <th></th>
                        </tr>
                        {guests.map((guest) => {
                            return (
                                <>
                                    <tr>
                                        <td>{guest.guest_id}</td>
                                        <td>{guest.room_id}</td>
                                        <td>{guest.full_name}</td>
                                        <td>{guest.tc_no}</td>
                                        <td>{guest.origin_city}</td>
                                        <td>{guest.duty}</td>
                                        <td>{guest.phone}</td>
                                        <td>{(guest.check_in_date === null) ? '' : guest.check_in_date.substring(0, 10)}</td>
                                        <td>{(guest.check_out_date === null) ? '' : guest.check_out_date.substring(0, 10)}</td>
                                        <td>{guest.current}</td>
                                        <td>{guest.child}</td>
                                        <td>{guest.description}</td>
                                        <td>
                                            <Stack direction="horizontal">
                                                <EditGuestButton guest={guest} rooms={rooms} />
                                                <Button variant="danger" size="sm">Delete</Button>
                                            </Stack>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </thead>
                </Table>
            </div>
        </Container>
    )
}

export default GuestsPage