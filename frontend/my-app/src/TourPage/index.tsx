import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { useParams } from 'react-router-dom'
import { Table, Header, Button } from 'semantic-ui-react'
import { updateTour } from '../reducers/tourReducer'
import { NewTour } from '../types'
import UpdateTourModal from './updateTourModal'
const TourPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const tour = useSelector((state: RootState) => Object.values(state.tours.tours).find(t => t._id === id))
    const dispatch = useDispatch()

    const [ modalOpen, setModalOpen ] = useState<boolean>(false);

    const openModal = (): void => {
        setModalOpen(true)
    }

    const closeModal = (): void => {
        setModalOpen(false)
    }

    const updateCurrentTour = async (values: NewTour) => {
        dispatch(updateTour(values, id))
    }

    if(!tour) {
        return null
    }

    return (
        <div>
            <Header>{tour.tourName}</Header>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Tiedot</Table.HeaderCell>
                        <Table.HeaderCell textAlign="right"> <Button onClick={openModal}>Muokkaa</Button> </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Nimi</Table.Cell>
                        <Table.Cell>{tour.tourName}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Kielet</Table.Cell>
                        <Table.Cell>{tour.possibleLanguages.map(l => <p key={l}>{l}</p>)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Kesto</Table.Cell>
                        <Table.Cell>{tour.lengthInMinutes}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Hinta</Table.Cell>
                        <Table.Cell>{tour.price}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Maksimikoko</Table.Cell>
                        <Table.Cell>{tour.maxNumberOfPeople}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Lisätiedot</Table.Cell>
                        <Table.Cell>{tour.tourInfo}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <UpdateTourModal
                modalOpen={modalOpen}
                onSubmit={updateCurrentTour}
                onClose={closeModal}
                initialTour={tour}

            />
        </div>
    )
}

export default TourPage