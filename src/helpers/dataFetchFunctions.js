import axios from 'axios'

async function fetchData(url, jsonData, token, method){
    try{
        const res = await axios.post(url, jsonData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return res
    } catch (err) {
        console.log(err)
        return null
    }
}

export {fetchData}