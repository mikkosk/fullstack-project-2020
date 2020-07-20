import React, { useState, useEffect } from 'react'
import { ReservedTour, Museum } from '../../types'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Header, GridColumn, Grid } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { dateToString } from '../../utils/DateTimeFunctions';

export const EssentialInformation: React.FC<{tour: ReservedTour}> = ({tour}) => {
    return (
        <div>
            <GridColumn><b>Kierros: </b></GridColumn>
            <GridColumn>{tour.tourName}</GridColumn>
            <GridColumn><b>Päivä: </b></GridColumn>
            <GridColumn>{dateToString(tour.date)}</GridColumn>
            <GridColumn><b>Aika: </b></GridColumn>
            <GridColumn>{tour.time}</GridColumn>
        </div>
    )
}

export const RestInformation: React.FC<{tour: ReservedTour}> = ({tour}) => {
    return(
        <div>
            <GridColumn><b>Ryhmä: </b></GridColumn>
            <GridColumn>{tour.groupName}</GridColumn>
            <GridColumn><b>Kieli: </b></GridColumn>
            <GridColumn>{tour.chosenLanguage}</GridColumn>
            <GridColumn><b>Varaajan sähköposti: </b></GridColumn>
            <GridColumn>{tour.email}</GridColumn>
            <GridColumn><b>Hinta: </b></GridColumn>
            <GridColumn>{tour.price}</GridColumn>
            <GridColumn><b>Maksutapa: </b></GridColumn>
            <GridColumn>{tour.paymentMethod}</GridColumn>
            <GridColumn><b>Kesto: </b></GridColumn>
            <GridColumn>{tour.lengthInMinutes}min</GridColumn>
            <GridColumn><b>Osallistujia: </b></GridColumn>
            <GridColumn>{tour.numberOfPeople}</GridColumn>
            <GridColumn><b>Ikäryhmä: </b></GridColumn>
            <GridColumn>{tour.groupAge}</GridColumn>
            <GridColumn><b>Lisätietoja ryhmästä: </b></GridColumn>
            <GridColumn>{tour.groupInfo}</GridColumn>
            <GridColumn><b>Lisätietoja opastuksesta: </b></GridColumn>
            <GridColumn>{tour.tourInfo}</GridColumn>
            <GridColumn><b>Opas: </b></GridColumn>
            <GridColumn>{tour.guide.name}</GridColumn>
            <GridColumn><b>Vahvistettu: </b></GridColumn>
            <GridColumn>{tour.confirmed?"Kyllä":"Ei"}</GridColumn>
        </div>
    )
}

const ReservationPage: React.FC = () => {
    const user = useSelector((state: RootState) => state.users.users[state.login._id]);
    const { id } = useParams<{ id: string }>()
    const [tour, setTour] = useState<ReservedTour | undefined>(undefined)

    useEffect(() => {
        if(user) {
            if(user.type === "Customer") {
                const existingTour = user.reservedTours.find((r: ReservedTour) => r._id === id)
                setTour(existingTour)
            }
            if(user.type === "Admin") {
                const museum = user.museums.find((m: Museum) => m.reservedTours.find((r: ReservedTour) => r._id === id))
                if(museum) {
                    setTour(museum.reservedTours.find((r: ReservedTour) => r._id  === id))
                }
            } 
        }
    }, [id, user])

    if(!user) {
        return null
    }

    if(!tour) {
        return null
    }

    return ( 
        <div>
            <Header>Varattu kierros</Header>
            <Grid columns="2">
                <EssentialInformation tour={tour}/>
                <RestInformation tour={tour}/>
            </Grid>
        </div>
    )
}

export default ReservationPage