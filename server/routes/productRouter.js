const Router = require('express')
const db = require('../db')
const router = new Router;

router.get('/', (req, res) => {
    console.log({req});
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

router.put('/update',(req,res) => {
    const {id, name, type, comment} = req.body;
    console.log({req})
    db.one('UPDATE products SET name = $1, type = $2, comment = $3 WHERE id = $4 returning *', [name, type, comment, id])
        .then ((data) => {
            console.log('DATA:', data);
            res.send(data);
        })
        .catch((error) => {
            console.log('ERROR:', error);
            res.send(error);
        })
});

router.post('/add/',  (req, res) => {
    console.log({req})
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
        console.log({req})
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
    console.log({req});
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