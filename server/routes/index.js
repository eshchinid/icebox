const Router = require('express')
const router = new Router;
const productRouter = require('./productRouter')

router.post('/add', productRouter);
router.get('/', productRouter);
router.get('/:id', productRouter);

module.exports = router;