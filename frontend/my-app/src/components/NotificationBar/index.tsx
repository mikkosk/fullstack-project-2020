import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { MessageError } from '../../types'
import { Header } from 'semantic-ui-react'

const NotificationBar: React.FC = () => {
    const state = useSelector((state: RootState) => state)
    const [museums, setMuseums] = useState<MessageError>({message: "", error: false})
    const [tours, setTours] = useState<MessageError>({message: "", error: false})
    const [user, setUser] = useState<MessageError>({message: "", error: false})
    const [notification, setNotification] = useState<MessageError>({message: "", error: false})

    useEffect(() => {
        setMuseums(state.museums.notification)
        setTimeout(() => setMuseums({message: "", error: false}), 2000)
    }, [state.museums.notification])

    useEffect(() => {
        setTours(state.tours.notification)
        setTimeout(() => setTours({message: "", error: false}), 2000)
    }, [state.tours.notification])

    useEffect(() => {
        setUser(state.users.notification)
        setTimeout(() => setUser({message: "", error: false}), 2000)
    }, [state.users.notification])

    useEffect(() => {
        setNotification(state.notification.notification)
        setTimeout(() => setNotification({message: "", error: false}), 2000)
    }, [state.notification.notification])

    const show = [{...museums, key: 0}, {...tours, key: 1}, {...user, key: 2}, {...notification, key: 3}]
    return (
        <div>
            {show.map((n: MessageError & {key: number}) => 
                <Header key={n.key}color={n.error ? "red" : "green"}>{n.message}</Header>
            )}
        </div>
    )
}

export default NotificationBar