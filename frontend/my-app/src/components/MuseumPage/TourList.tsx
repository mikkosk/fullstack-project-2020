import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { List, Button } from 'semantic-ui-react'
import { deleteTour } from '../../reducers/museumReducer'
import { useParams, Link } from 'react-router-dom'

const TourList = () => {
    const dispatch = useDispatch()
    const { id } = useParams<{ id: string }>();
    const deleteATour = (tourId: string) => {
        dispatch(deleteTour(id, tourId))
    }
    const tours = useSelector((state: RootState) => state.museums.museums[id]?.offeredTours) || undefined;
    if(!tours) {
        return null
    }
    
    return (
        <div>
            <List divided>
                {tours && Object.values(tours).map(t =>
                    <List.Content key={t._id}>
                        <b><Link to={`/museum/${id}/tour/${t._id}`}>{t.tourName}</Link></b>
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