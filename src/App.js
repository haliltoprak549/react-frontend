import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import NavigationBar from "./pages/NavigationBar";
import GuestsPage from "./pages/GuestsPage";
import NoMatch from "./pages/NoMatch";
import AddGuestPage from "./pages/AddGuestPage";
import AddRoomPage from './pages/AddRoomPage'
import RoomsPage from './pages/RoomsPage'

export const API_URL = "http://localhost:5000"

const App = () => {
  const [guests, setGuests] = useState([])
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    fetchGuests()
    fetchRooms()
  }, [])

  const fetchGuests = async () => {
    const response = await fetch(`${API_URL}/guests/`)
    const data = await response.json()

    setGuests(data)
  }

  const fetchRooms = async () => {
    const response = await fetch(`${API_URL}/rooms/`)
    const data = await response.json()

    setRooms(data)
  }

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/guests/add' element={<AddGuestPage rooms={rooms}/>} />
        <Route path='/guests' element={<GuestsPage guests={guests} rooms={rooms} />} />
        <Route path='/rooms/add' element={<AddRoomPage />} />
        <Route path='/rooms' element={<RoomsPage rooms={rooms} />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </>
  )
}

export default App
