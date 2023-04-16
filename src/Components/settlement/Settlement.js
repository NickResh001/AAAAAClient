import React, { useEffect } from 'react'
import './Style.css'

const Settlement = ({ settlements, setSettlements, removeSettlement, user }) =>
{
    useEffect(() => {
        const getSettlements = async () => {
            const requestOptions =
            {
                method: 'GET'
            }
            return await fetch("https://localhost:7082/api/Settlement", requestOptions)
                .then(Response => Response.json())
                .then(
                    (data) => {
                        console.log('Data:', data)
                        setSettlements(data)
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getSettlements()
    }, [setSettlements])

    const deleteItem = async ({ settlementDTOId }) => {
        const requestOptions =
        {
            method: 'DELETE'
        }
        return await fetch("https://localhost:7082/api/Settlement/${settlementDTOId}", requestOptions)
            .then((response) => {
                if (response.ok) {
                    removeSettlement(settlementDTOId);
                }
            }, (error) => console.log(error))
    }

    return (
        <React.Fragment>
            <h3>Список городов</h3>

            {settlements.map(
                (
                    {
                        settlementDTOId,
                        title,
                        regionTitle
                    }
                ) => (
                    <div className="settlement" key={settlementDTOId} id={settlementDTOId}>
                        <strong>
                            {settlementDTOId} : {title}, {regionTitle}

                            {user.isAuthenticated ? ( 
                            <>
                                <button onClick={(e) => deleteItem({ settlementDTOId })}>Удалить город</button><br/>
                            </>
                            ):(
                                ""
                            )}

                            
                        </strong>
                    
                    </div>
            ))}
        </React.Fragment>
    )
}
export default Settlement