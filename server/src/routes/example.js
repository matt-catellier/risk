import { Router } from 'express';
const router = Router();

const testData = [
  {id: '1', foo: 'a', bar: 'b'},
  {id: '2', foo: 'c', bar: 'd'}
]

const example = (db) => {
  router.get('/', async (req, res) => {
    try {
      const data = await db.query('SELECT * FROM test;')
      res.json(data);
    } catch(e) {
      console.log('error: ', e.message)
      res.status(500).json({status: e.status, message: e.message})
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const data = await db.query('SELECT * FROM test WHERE id = $1;', [req.params.id])
      res.json(data);
    } catch(e) {
      console.log('error: ', e.message)
      res.status(500).json({status: e.status, message: e.message})
    }
  });

  return router
}

export default example;
