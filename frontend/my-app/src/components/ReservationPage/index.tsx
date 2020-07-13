import React, { useState, useEffect } from 'react'
import { ReservedTour, Museum } from '../../types'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Header, GridColumn, Grid } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { dateToString } from '../../utils/DateTimeFunctions';

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
                <GridColumn>Kierros: </GridColumn>
                <GridColumn>{tour.tourName}</GridColumn>
                <GridColumn>Päivä: </GridColumn>
                <GridColumn>{dateToString(tour.date)}</GridColumn>
                <GridColumn>Aika: </GridColumn>
                <GridColumn>{tour.time}</GridColumn>
                <GridColumn>Ryhmä: </GridColumn>
                <GridColumn>{tour.groupName}</GridColumn>
                <GridColumn>Kieli: </GridColumn>
                <GridColumn>{tour.chosenLanguage}</GridColumn>
                <GridColumn>Varaajan sähköposti: </GridColumn>
                <GridColumn>{tour.email}</GridColumn>
                <GridColumn>Hinta: </GridColumn>
                <GridColumn>{tour.price}</GridColumn>
                <GridColumn>Maksutapa: </GridColumn>
                <GridColumn>{tour.paymentMethod}</GridColumn>
                <GridColumn>Kesto: </GridColumn>
                <GridColumn>{tour.lengthInMinutes}min</GridColumn>
                <GridColumn>Osallistujia: </GridColumn>
                <GridColumn>{tour.numberOfPeople}</GridColumn>
                <GridColumn>Ikäryhmä: </GridColumn>
                <GridColumn>{tour.groupAge}</GridColumn>
                <GridColumn>Lisätietoja ryhmästä: </GridColumn>
                <GridColumn>{tour.groupInfo}</GridColumn>
                <GridColumn>Lisätietoja opastuksesta: </GridColumn>
                <GridColumn>{tour.tourInfo}</GridColumn>
                <GridColumn>Opas: </GridColumn>
                <GridColumn>{tour.guide}</GridColumn>
                <GridColumn>Vahvistettu: </GridColumn>
                <GridColumn>{tour.confirmed}</GridColumn>
            </Grid>
        </div>
    )
}

export default ReservationPage