import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { List, Button } from 'semantic-ui-react'
import { deleteTour } from '../../reducers/museumReducer'
import { useParams, Link, useHistory } from 'react-router-dom'

const TourList = () => {
    const dispatch = useDispatch()
    const { id } = useParams<{ id: string }>();
    const deleteATour = (tourId: string) => {
        dispatch(deleteTour(id, tourId))
    }
    const history = useHistory()
    const tours = useSelector((state: RootState) => state.museums.museums[id]?.offeredTours) || undefined;

    const toTour = (tourId: string) => {
        history.push(`/museum/${id}/tour/${tourId}`)
    }
    if(!tours) {
        return null
    }
    
    return (
        <div>
            <List divided>
                {tours && Object.values(tours).map(t =>
                    <List.Content key={t._id}>
                        <b onClick={() => toTour(t._id)}> {t.tourName}</b>
                        <List.List>
                            <List.Item>{t.lengthInMinutes}</List.Item>
                            <List.Item>{t.price}</List.Item>
                        </List.List>
                        <Button type="button" onClick={() => deleteATour(t._id)}>Poista</Button>
                    </List.Content>
                )}
            </List>    
            
        </div>
    )
}

export default TourList