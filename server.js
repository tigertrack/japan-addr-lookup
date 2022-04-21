const express = require('express')
const app = express()
const {data, search, paginate} = require('./helper.js')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

let arrdata = Object.values(data)

app.get('/addresses', (req, res) => {
    
    let {keyword, page, page_size, ispaginated} = req.query

    keyword = (keyword) ? keyword.replace(/\s+/g,'') : ''

    ispaginated = ispaginated ?? true

    let data = search(arrdata, keyword)
    if (ispaginated === true || ispaginated === "true") 
        return res.json(paginate(data, page_size, page))
    return res.json(data)

})

app.listen(3000, () => console.log('server listen at port:3000'))

