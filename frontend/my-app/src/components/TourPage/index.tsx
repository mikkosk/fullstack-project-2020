import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { useParams } from 'react-router-dom'
import { Table, Header, Button } from 'semantic-ui-react'
import { updateTour } from '../../reducers/tourReducer'
import { NewTour } from '../../types'
import UpdateTourModal from './updateTourModal'
import { allMuseums } from '../../reducers/museumReducer'

const TourPage: React.FC = () => {
    const { tourid, museumid }= useParams<{ tourid: string, museumid: string }>();
    
    const dispatch = useDispatch()
    const museum = useSelector((state: RootState) => state.museums.museums[museumid])
    const finished = useSelector((state: RootState) => state.tours.finished)

    useEffect(() => {
        dispatch(allMuseums())
    },[finished, dispatch])
    
    const [ modalOpen, setModalOpen ] = useState<boolean>(false);

    const openModal = (): void => {
        setModalOpen(true)
    }

    const closeModal = (): void => {
        setModalOpen(false)
    }

    const updateCurrentTour = async (values: NewTour) => {
        dispatch(updateTour(values, museumid, tourid))
    }


    const handleSubmit = async (values: NewTour) => {
        await updateCurrentTour(values)
        closeModal();
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
                        <Table.HeaderCell textAlign="right"> <Button name="openModal" onClick={openModal}>Muokkaa</Button> </Table.HeaderCell>
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
                modalOpen={modalOpen}
                onSubmit={handleSubmit}
                onClose={closeModal}
                initialTour={tour}
            />
        </div>
    )
}

export default TourPage