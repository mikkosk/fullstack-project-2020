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
            <GridColumn className="addTopMarginSmall"><h4>Kierros: </h4></GridColumn>
            <GridColumn>{tour.tourName}</GridColumn>
            <GridColumn className="addTopMarginSmall"><h4>Päivä: </h4></GridColumn>
            <GridColumn>{dateToString(tour.date)}</GridColumn>
            <GridColumn className="addTopMarginSmall"><h4>Aika: </h4></GridColumn>
            <GridColumn>{tour.time}</GridColumn>
        </div>
    )
}

export const RestInformation: React.FC<{tour: ReservedTour}> = ({tour}) => {
    return(
        <div>
            <GridColumn className="addTopMarginSmall"><h4>Ryhmä: </h4></GridColumn>
            <GridColumn>{tour.groupName}</GridColumn>
            <GridColumn className="addTopMarginSmall"><h4>Kieli: </h4></GridColumn>
            <GridColumn>{tour.chosenLanguage}</GridColumn>
            <GridColumn className="addTopMarginSmall"><h4>Varaajan sähköposti: </h4></GridColumn>
            <GridColumn>{tour.email}</GridColumn>
            <GridColumn className="addTopMarginSmall"><h4>Hinta: </h4></GridColumn>
            <GridColumn>{tour.price}</GridColumn>
            <GridColumn className="addTopMarginSmall"><h4>Maksutapa: </h4></GridColumn>
            <GridColumn>{tour.paymentMethod}</GridColumn>
            <GridColumn className="addTopMarginSmall"><h4>Kesto: </h4></GridColumn>
            <GridColumn>{tour.lengthInMinutes}min</GridColumn>
            <GridColumn className="addTopMarginSmall"><h4>Osallistujia: </h4></GridColumn>
            <GridColumn>{tour.numberOfPeople}</GridColumn>
            <GridColumn className="addTopMarginSmall"><h4>Ikäryhmä: </h4></GridColumn>
            <GridColumn>{tour.groupAge}</GridColumn>
            <GridColumn className="addTopMarginSmall"><h4>Lisätietoja ryhmästä: </h4></GridColumn>
            <GridColumn>{tour.groupInfo}</GridColumn>
            <GridColumn className="addTopMarginSmall"><h4>Lisätietoja opastuksesta: </h4></GridColumn>
            <GridColumn>{tour.tourInfo}</GridColumn>
            <GridColumn className="addTopMarginSmall"><h4>Opas: </h4></GridColumn>
            <GridColumn>{tour.guide.name}</GridColumn>
            <GridColumn className="addTopMarginSmall"><h4>Vahvistettu: </h4></GridColumn>
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
            <Grid id="basicGrid" columns="1">
                <GridColumn>
                    <EssentialInformation tour={tour}/>
                    <RestInformation tour={tour}/>
                </GridColumn>
            </Grid>
        </div>
    )
}

export default ReservationPage