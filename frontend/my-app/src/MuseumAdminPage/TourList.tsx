import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { List, Button } from 'semantic-ui-react'
import { deleteTour } from '../reducers/tourReducer'

const TourList = () => {
    const dispatch = useDispatch()

    const deleteATour = (id: string) => {
        dispatch(deleteTour(id))
    }
    const tours = useSelector((state: RootState) => state.tours.tours)
    return (
        <div>
            <List divided>
                {tours && Object.values(tours).map(t =>
                    <List.Content key={t._id}>
                        <List.Header as='b'>{t.tourName}</List.Header>
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