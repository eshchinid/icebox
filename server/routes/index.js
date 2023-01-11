const Router = require('express')
const router = new Router;
const productRouter = require('./productRouter')

router.use('/product', productRouter);

router.get('/test', (req, res) => res.json({message: 'working'}))

module.exports = router;