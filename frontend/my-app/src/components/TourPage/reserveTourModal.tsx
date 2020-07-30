import React from 'react'
import { Modal } from 'semantic-ui-react'
import { GuidedTour, Museum, ReservedTour } from '../../types'
import AddReservedForm from '../AddReserved/AddReservedForm'

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: Omit<ReservedTour, '_id' | 'salary' | 'confirmed' | 'guide' | 'museum'>) => void;
    tour: GuidedTour;
    museum: Museum;
}

const ReserveTourModal: React.FC<Props> = ({ modalOpen, onClose, onSubmit, tour, museum}: Props) => (
    <Modal id="reserveTourModal" open={modalOpen} onClose={onClose} closeIcon>
        <Modal.Header id="modalHeader">Varaa opastus</Modal.Header>
        <Modal.Content>
            <AddReservedForm onSubmit={onSubmit} onCancel={onClose} tour={tour} museum={museum}></AddReservedForm>
        </Modal.Content>
    </Modal>
)

export default ReserveTourModal