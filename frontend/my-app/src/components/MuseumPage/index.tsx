import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import MuseumAdminPage from './MuseumAdminPage'
import { Museum } from '../../types'
import MuseumCustomerPage from './MuseumCustomerPage'
import { Loader } from 'semantic-ui-react'

const MuseumPage = () => {
    const { id } = useParams<{ id: string }>()
    const user = useSelector((state: RootState) => state.users.users[state.login._id]);
    const museum: Museum = useSelector((state: RootState) => state.museums.museums[id])

    if(!museum) {
        return <Loader active/>
    }
    if(user && user.type === "Admin" && user.museums.find((m: Museum) => m._id === museum._id)) {
        return <MuseumAdminPage museum={museum} />
    } else {
        return <MuseumCustomerPage museum={museum} />
    }
}

export default MuseumPage