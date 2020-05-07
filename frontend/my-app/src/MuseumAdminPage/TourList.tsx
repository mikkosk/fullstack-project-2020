import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { List } from 'semantic-ui-react'

const TourList = () => {
    const tours = useSelector((state: RootState) => state.tours.tours)
    console.log(tours)
    return (
        <div>
            <List divided>
                {Object.values(tours).map(t =>
                    <List.Content key={t._id}>
                        <List.Header as='b'>{t.tourName}</List.Header>
                        <List.List>
                            <List.Item>{t.lengthInMinutes}</List.Item>
                            <List.Item>{t.price}</List.Item>
                        </List.List>
                    </List.Content>
                )}
            </List>    
            
        </div>
    )
}

export default TourList