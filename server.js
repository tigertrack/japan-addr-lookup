const express = require('express')
const app = express()
const {data, search, paginate} = require('./helper.js')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

let arrdata = Object.values(data)

app.get('/addresses', (req, res) => {
    
    let {keyword, page, page_size, isPaginated} = req.query

    keyword = (keyword) ? keyword.replace(/\s+/g,'') : ''

    isPaginated = isPaginated ?? true

    let data = search(arrdata, keyword)
    if (isPaginated === true) 
        return res.json(paginate(data, page_size, page))
    return res.json(data)

})

app.listen(3000, () => console.log('server listen at port:3000'))

