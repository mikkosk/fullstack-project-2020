import React from 'react'
import { Modal } from 'semantic-ui-react'
import { NewMuseum } from '../../../types'
import { AddMuseumForm } from './AddMuseumForm'

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: NewMuseum) => void;
}

const AddMuseumModal: React.FC<Props> = ({ modalOpen, onClose, onSubmit}: Props) => (
    <Modal open={modalOpen} onClose={onClose} closeIcon>
        <Modal.Header>Päivitä opastusta</Modal.Header>
        <Modal.Content>
            <AddMuseumForm onSubmit={onSubmit} onCancel={onClose}></AddMuseumForm>
        </Modal.Content>
    </Modal>
)

export default AddMuseumModal