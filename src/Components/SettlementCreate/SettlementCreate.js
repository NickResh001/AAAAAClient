import React from 'react'
import { regionsList } from '../RegionList/RegionList'

const SettlementCreate = ({ addSettlement, user }) =>
{
    const handleSubmit = (e) =>
    {
        e.preventDefault()
        const title = e.target.elements.title.value
        const regionTitle = e.target.elements.regionTitle.value
        const settlementDTO =
        {
            title: title,
            regionFK : regionTitle
        }
        const createSettlement = async () =>
        {
            const requestOptions =
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settlementDTO)
            }
            const response = await fetch("https://localhost:7082/api/Settlement/",
                requestOptions)
            return await response.json()
                .then((data) =>
                {
                    console.log(data)
                    // response.status === 201 && addBlog(data)
                    if (response.ok)
                    {
                        addSettlement(data)
                        //e.target.elements.title.value = ""
                    }
                },
                    (error) => console.log(error)
                )
        }
        createSettlement()
    }
    return (
        <React.Fragment>
                {user.isAuthenticated ? ( 
                <>
                    <h3>Добавление нового города</h3>
                        <form onSubmit={handleSubmit}>
                            <label>Title: </label>
                            <input type="text" name="title" placeholder="Введите название города" /><br />
                            <label>Введите название области</label>
                            <select name="regionTitle">
                                {regionsList.map(({ regionId, title }) => (
                                    <option key={regionId} value={regionId}>{title}</option>
                                ))}
                            </select><br />
                            <button type="submit">Создать</button>
                        </form>
                </>
                ):(
                    ""
                )}
        </React.Fragment>
    )
}
export default SettlementCreate