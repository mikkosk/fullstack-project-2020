import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { useParams } from 'react-router-dom'
import { Table, Header, Button } from 'semantic-ui-react'
import { updateTour } from '../../reducers/tourReducer'
import { NewTour, ReservedTour } from '../../types'
import UpdateTourModal from './updateTourModal'
import { allMuseums } from '../../reducers/museumReducer'
import ReserveTourModal from './reserveTourModal'
import { addReservation } from '../../reducers/userReducer'

const TourPage: React.FC = () => {
    const { tourid, museumid }= useParams<{ tourid: string, museumid: string }>();
    
    const dispatch = useDispatch()
    const museum = useSelector((state: RootState) => state.museums.museums[museumid])
    const finished = useSelector((state: RootState) => state.tours.finished)
    const user = useSelector((state: RootState) => state.users.users[state.login._id]);

    useEffect(() => {
        dispatch(allMuseums())
    },[finished, dispatch])
    
    const [ updateModalOpen, setUpdateModalOpen ] = useState<boolean>(false);
    const [ reserveModalOpen, setReserveModalOpen ] = useState<boolean>(false);

    const openModal = (admin: boolean): void => {
        admin ? setUpdateModalOpen(true) : setReserveModalOpen(true)
    }

    const closeModal = (admin: boolean): void => {
        admin ? setUpdateModalOpen(false) : setReserveModalOpen(false)
    }

    const updateCurrentTour = async (values: NewTour) => {
        dispatch(updateTour(values, museumid, tourid))
    }

    const reserveTour = async (values: Omit<ReservedTour, '_id' | 'salary' | 'confirmed'| 'guide'>) => {
        dispatch(addReservation(user._id, museum._id, values))
    }


    const handleUpdateSubmit = async (values: NewTour) => {
        await updateCurrentTour(values)
        closeModal(true);
    }

    const handleReserveSubmit = async (values:  Omit<ReservedTour, '_id' | 'salary' | 'confirmed' | 'guide'>) => {
        await reserveTour(values)
        closeModal(false);
    }

    if(!museum || !museum.offeredTours) {
        return null
    }
    const tour = museum.offeredTours.find(t => t._id === tourid)

    if(!tour) {
        return null
    }

    return (
        <div>
            <Header>{tour.tourName}</Header>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell name="information">Tiedot</Table.HeaderCell>
                        {(user && user.type === "Admin" && Object.values(user.museums).map(m => m._id).includes(museum._id)) &&
                        <Table.HeaderCell textAlign="right"> <Button name="openModal" onClick={() => openModal(true)}>Muokkaa</Button> </Table.HeaderCell>}
                        {(user && user.type === "Customer") &&
                        <Table.HeaderCell textAlign="right"> <Button name="openModal" onClick={() => openModal(false)}>Varaa</Button> </Table.HeaderCell>}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell name="tourName">Nimi</Table.Cell>
                        <Table.Cell name="nameValue">{tour.tourName}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell name="tourLanguages">Kielet</Table.Cell>
                        <Table.Cell name="languageValue">{tour.possibleLanguages.map(l => <p key={l}>{l}</p>)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell name="tourLength">Kesto</Table.Cell>
                        <Table.Cell name="lengthValue">{tour.lengthInMinutes}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell name="tourPrice">Hinta</Table.Cell>
                        <Table.Cell name="priceValue">{tour.price}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell name="tourMax">Maksimikoko</Table.Cell>
                        <Table.Cell name="maxValue">{tour.maxNumberOfPeople}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell name="tourInfo">Lisätiedot</Table.Cell>
                        <Table.Cell name="infoValue">{tour.tourInfo}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <UpdateTourModal
                modalOpen={updateModalOpen}
                onSubmit={handleUpdateSubmit}
                onClose={() => closeModal(true)}
                initialTour={tour}
            />
            <ReserveTourModal
                modalOpen={reserveModalOpen}
                onSubmit={handleReserveSubmit}
                onClose={() => closeModal(false)}
                tour={tour}
                museum={museum}
            />
        </div>
    )
}

export default TourPage