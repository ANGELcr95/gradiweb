const express = require('express');
const morgan = require('morgan');
const app = express();


const fetch = require('node-fetch');

const eject = async ()=>{
    const username = "d156c699edcc98186dae8e6f9562d838";
    const password = "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";
    const shop = "devtestrecruitte";
    const resource = "products";

    const response = await fetch(`https://${username}:${password}@${shop}.myshopify.com/admin/api/2022-01/${resource}.json`);
    const data = await response.json();
    const products = data.products

    const array = []

    for (let i = 0; i < products.length; i++) {
        const date = products[i].variants[0].created_at.split("-")
        const year = date[0]
        const month = date[1]
        const day = date[2].substr(0,2)
        const newDate = `${year}-${month}-${day}`

        // "title": products[i].title,
       let objeto = {
        "price": products[i].variants[0].price,
        "status":products[i].status,
        "created_at":newDate
       }

       let stringObject = JSON.stringify(objeto)

       let stringObjectConcat = `"${products[i].title}" => ${stringObject}`

       array.push(stringObjectConcat)
    }
    console.log(array)
    
}
eject()

// settings
app.set('port', process.env.PORT || 5000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
