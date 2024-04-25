const express = require('express')
require('dotenv').config()
const axios = require('axios')
const cors = require('cors')

const app = express()

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())
app.use(cors())

app.post('/convert-mp3', async(req, res) => {
    const { videoUrl } = req.body
    if(!videoUrl) return res.status(400).send('Enter video url')

    try{
        const response = await axios.get('https://youtube-video-to-mp31.p.rapidapi.com/download', {
            responseType: 'stream',
            "params": {
                url: videoUrl
            },
            "headers": {
                'x-rapidapi-key': '5a2da9b426msh6de0de0ac8e5e40p136242jsn95ec649413c1',
                'x-rapidapi-host': 'youtube-video-to-mp31.p.rapidapi.com'
            }
        })
        res.set({
            'Content-Type': 'audio/mpeg',
            'Content-Disposition': 'attachment; filename="download.mp3"'
        })

        response.data.pipe(res)
    }
    catch(error){
        res.status(500).json('Something went wrong')
    }
})

app.listen(process.env.PORT, () => {
    console.log('Server started')
})