import React, { useState, useEffect } from 'react'
import { Museum, GuidedTour, UserAnyType, Professionals } from '../../types'
import { Grid, GridColumn, GridRow, Header, Icon, Card, CardHeader, Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import museumReducer, { sendRequest } from '../../reducers/museumReducer'
import { useDispatch } from 'react-redux'

const MuseumCustomerPage: React.FC<{museum: Museum, user: UserAnyType}> = ({museum, user}) => {
    const openHours = [
        {day: "Maanantai", open: museum.open.mon, closed: museum.closed.mon},
        {day: "Tiistai", open: museum.open.tue, closed: museum.closed.tue},
        {day: "Keskiviikko", open: museum.open.wed, closed: museum.closed.wed},
        {day: "Torstai", open: museum.open.thu, closed: museum.closed.thu},
        {day: "Perjantai", open: museum.open.fri, closed: museum.closed.fri},
        {day: "Lauantai", open: museum.open.sat, closed: museum.closed.sat},
        {day: "Sunnuntai", open: museum.open.sun, closed: museum.closed.sun}
    ]

    const placeholderTour: GuidedTour = {
        _id: "0",
        possibleLanguages: [],
        lengthInMinutes: 0,
        tourName: "Ei opastuksia",
        maxNumberOfPeople: 0,
        price: 0,
        tourInfo: "Museo ei tarjoa tällä hetkellä opastuksia"
    }
    const history = useHistory()
    const dispatch = useDispatch()

    const numberOfTours = Object.values(museum.offeredTours).length
    
    const toTour = (museumId: Museum['_id'], tourId: GuidedTour['_id']) => {
        history.push(`/museum/${museumId}/tour/${tourId}`)
    }

    const alreadySent  = Boolean(museum.userRequests.find((u: Professionals) => u._id === (user?user._id:false)));



    const nextPage = (next: boolean) => {
        if(numberOfTours < 2) {
            return
        }
        if(next) {
            if(tourNumb === numberOfTours - 1) {
                setTourNumb(0)
            } else {
                setTourNumb(tourNumb + 1)
            }
        } else {
            if(tourNumb === 0) {
                setTourNumb(numberOfTours - 1)
            } else {
                setTourNumb(tourNumb - 1)
            }
        }
    }

    const handleRequest = async () => {
        await sendAdminRequest();
        console.log("page")
    }
    const sendAdminRequest = async () => {
        console.log("send")
        console.log(user._id)
        console.log(museum._id)
        dispatch(sendRequest(user._id, museum._id))
    }

    const [tour, setTour]  = useState(placeholderTour)
    const [tourNumb, setTourNumb] = useState<number>(0)

    useEffect(() => {
        if(numberOfTours !== 0) {
            setTour(Object.values(museum.offeredTours)[0])
        }
    }, [museum.offeredTours, numberOfTours])
    
    useEffect(() => {
        setTour(Object.values(museum.offeredTours)[tourNumb])
    }, [tourNumb, museum.offeredTours])

    return (
        <div>
            <Grid columns="2">
                <GridColumn>
                    <Grid columns="equal">
                        <GridRow>
                            <GridColumn>
                                <Header>Aukiolo: </Header>
                            </GridColumn>
                        </GridRow>
                        {openHours.map(o => 
                            <GridRow key={o.day}>
                                <GridColumn>
                                    <h4>{o.day}: </h4>
                                </GridColumn>
                                <GridColumn>
                                    <p>{o.open} - {o.closed}</p>
                                </GridColumn>
                            </GridRow>  
                        )}
                        <GridRow>
                            <GridColumn>
                                <h4>Lisätietoja: </h4>
                            </GridColumn>
                            <GridColumn>
                                <p>{museum.openInfo}</p>
                            </GridColumn>
                        </GridRow>
                    </Grid>
                </GridColumn>
                <GridColumn>
                    <Grid>
                        <GridRow centered>
                            <Header>
                                Opastukset
                            </Header>
                        </GridRow>
                        <GridRow centered>
                            <GridColumn width="1">
                                <Icon name="angle double left" onClick={() => nextPage(false)}/>
                            </GridColumn>
                            <GridColumn width="10">
                                <Card centered>
                                    <Card.Content>
                                        <CardHeader>{tour.tourName}</CardHeader>
                                        <Card.Description>{tour.tourInfo}</Card.Description>
                                           
                                    </Card.Content>
                                    {tour._id !== "0" &&  
                                    <Card.Content extra onClick={() => toTour(museum._id, tour._id)}>
                                        <b>Lisätiedot ja varaukset</b>
                                    </Card.Content>}
                                </Card>
                            </GridColumn>
                            <GridColumn>
                                <Icon name="angle double right" onClick={() => nextPage(true)}/>
                            </GridColumn>
                        </GridRow>
                    </Grid>
                </GridColumn>
            </Grid>
            {user && user.type !== "Customer" && 
                <div>
                    <p>Oletko tämän museon henkilökuntaa? Lähetä pyyntö!</p>
                    <Button onClick={handleRequest} disabled={alreadySent}>Lähetä!</Button>
                    {alreadySent && <p>Olet jo lähettänyt pyynnön</p>}
                </div>
            }
        </div>
    )
}

export default MuseumCustomerPage