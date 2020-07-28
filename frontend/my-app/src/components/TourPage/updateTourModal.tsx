import React from 'react'
import { Modal } from 'semantic-ui-react'
import AddTourForm from '../AddTour/AddTourForm'
import { NewTour } from '../../types'

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: NewTour) => void;
    initialTour?: NewTour;
}

const UpdateTourModal: React.FC<Props> = ({ modalOpen, onClose, onSubmit, initialTour}: Props) => (
    <Modal id="updateTourModal" open={modalOpen} onClose={onClose} closeIcon>
        <Modal.Header>Päivitä opastusta</Modal.Header>
        <Modal.Content>
            <AddTourForm onSubmit={onSubmit} onCancel={onClose} initialTour={initialTour}></AddTourForm>
        </Modal.Content>
    </Modal>
)

export default UpdateTourModal