import Router from 'koa-router';

const router = Router({
  prefix: '/health',
});

router.get('/', async (ctx) => {
  ctx.status = 200;
  ctx.body = { health: 'OK' };
});

export default router;
