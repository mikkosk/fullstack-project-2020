import React from 'react'
import { Modal } from 'semantic-ui-react'
import AddTourForm from '../AddTour/AddTourForm'
import { NewTour, NewReserved, GuidedTour, Museum } from '../../types'
import AddReservedForm from '../AddReserved/AddReservedForm'

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: NewReserved) => void;
    tour: GuidedTour;
    museum: Museum;
}

const ReserveTourModal: React.FC<Props> = ({ modalOpen, onClose, onSubmit, tour, museum}: Props) => (
    <Modal open={modalOpen} onClose={onClose} closeIcon>
        <Modal.Header>Varaa opastus</Modal.Header>
        <Modal.Content>
            <AddReservedForm onSubmit={onSubmit} onCancel={onClose} tour={tour} museum={museum}></AddReservedForm>
        </Modal.Content>
    </Modal>
)

export default ReserveTourModal