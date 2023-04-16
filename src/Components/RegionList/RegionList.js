import { useEffect } from 'react'
export let regionsList = [{}]
const RegionList = () => {
    useEffect(() => {
        const getRegions = async () => {
            const requestOptions = {
                method: 'GET'
            }
            return await fetch("https://localhost:7082/api/Region",

                requestOptions)

                .then(response => response.json())
                .then(
                    (data) => {
                        console.log('Data:', data)
                        regionsList = data
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getRegions()
    })
}
export default RegionList