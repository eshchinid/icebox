const Router = require('express')
const db = require('../db')
const router = new Router;

router.get('/', (req, res) => {
    db.any('SELECT * from products')
        .then((data) => {
            console.log('DATA:', data.value);
            res.send(data);
        })
        .catch((error) => {
            console.log('ERROR:', error);
            res.send(error);
        })
});

router.post('/add/',  (req, res) => {
    console.log(req.body)
    db.one('insert into products(name, count, type, comment)' +
        ' values(${name}, ${count}, ${type}, ${comment}) returning id', req.body)
        .then((data) => {
            console.log('DATA:', data);
            res.send(data);
        })
        .catch((error) => {
            console.log('ERROR:', error);
            res.send(error);
        })
    });

router.post('/delete/:id',  (req, res) => {
        const productID = parseInt(req.params.id);
        db.one('delete from products where id = $1 returning *', productID)
            .then((data) => {
                console.log('DATA:', data);
                res.send(data);
            })
            .catch((error) => {
                console.log('ERROR:', error);
                res.status(500).send(error);
            })
})

router.get('/:id',  (req, res) =>{
    const productID = parseInt(req.params.id);
    db.one('select * from products where id = $1', productID)
        .then((data) => {
        console.log('DATA:', data.value);
        res.send(data);
    })
        .catch((error) => {
            console.log('ERROR:', error);
            res.send(error);
        })
});

module.exports = router;