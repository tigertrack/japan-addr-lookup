const fs = require('fs')
const iconv = require('iconv-lite');
let csvFile = fs.readFileSync('./KEN_ALL.CSV');
module.exports = {
    data : iconv.decode(Buffer.from(csvFile), "Shift_JIS").split(/\r?\n/)
        .reduce((addresses, address) => {
            let cols = address.replace(/['"]+/g, '').split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)

            if(cols != '')
                if(cols[2] in addresses)
                    addresses[cols[2]] = [addresses[cols[2]], cols[8]].join('')
                else    
                    addresses[cols[2]] = [cols[2], cols[6], cols[7], cols[8]].join(',')

            return addresses
        }, {}),
    search: (data, keyword) => {
        if(keyword == '') return data
        return data.filter(item => ((new RegExp(String.raw`${keyword}`, 'g')).test(item)))
    },
    paginate: (data, page_size = 10, page_number = 1) => {
        return {
            data: data.slice((page_number - 1) * page_size, page_number * page_size),
            pageCount: (data.length % page_size > 0) ? Math.round(data.length / page_size) + 1 : Math.round(data.length / page_size)
        };
    }

}
