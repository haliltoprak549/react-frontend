import React from "react"
import { Container, Table, Button, Stack } from "react-bootstrap"
import EditRoomButton from '../components/EditRoomButton.jsx'
import AddRoomButton from '../components/AddRoomButton.jsx'

const RoomsPage = ({ rooms }) => {
    return (
        <Container fluid>
            <div className="bg-light mt-3">
                <AddRoomButton rooms={rooms} />
            </div>
            <div className="bg-light mt-3">
                <Table striped size="sm" hover border responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Room No</th>
                            <th>Bed Capacity</th>
                            <th>Available Beds</th>
                            <th>Description</th>
                            <th></th>
                        </tr>
                        {rooms.map((room) => {
                            return (
                                <>
                                    <tr>
                                        <td>{room.room_id}</td>
                                        <td>{room.room_no}</td>
                                        <td>{room.bed_capacity}</td>
                                        <td>{room.available_beds}</td>
                                        <td>{room.description}</td>
                                        <td>
                                            <Stack direction="horizontal">
                                                <EditRoomButton room={room} rooms={rooms} />
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

export default RoomsPage