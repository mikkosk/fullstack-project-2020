import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Museum } from '../../types'
import { Card, Button, Header, Grid, GridColumn, Container } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

const FindMuseums: React.FC = () => {
    const [page, setPage] = useState(0)
    const museums = useSelector((state: RootState) => state.museums.museums)
    const history = useHistory()

    const toMuseum = (id: Museum['_id']) => {
        history.push(`/museum/${id}`)
    }

    const numberOfPages = () => {
        const length = Object.values(museums).length
        if(length % 10 === 0) {
            return length / 10
        } else {
            return (length - length % 10) / 10 + 1
        }
    }

    return(
        <div>
            <Container textAlign='center'>
                <Header>Löydä museoita</Header>
                {Object.values(museums).slice(0 + page*10, 10 + page*10).map((m: Museum) => 
                    <div key={m._id}>
                        <Card centered>
                            <Card.Content header={m.museumName} />
                            <Card.Content description={m.museumInfo} />
                            <Card.Content extra>
                                <Button onClick={() => toMuseum(m._id)}>Tarkastele</Button>
                            </Card.Content>
                        </Card>
                    </div>
                )}
                <Grid id="pageNumbers" centered>
                    {Array.from(Array(numberOfPages()).keys()).map((n: number) => 
                        <GridColumn centered key={n}><p className="centerNumber" onClick={() => setPage(n)}>{n + 1}</p></GridColumn>
                    )}
                </Grid>
            </Container>
        </div>
    )
}

export default FindMuseums