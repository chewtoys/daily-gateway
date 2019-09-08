import Router from 'koa-router';

const router = Router();

router.get(
  '/download',
  async (ctx) => {
    ctx.status = 307;

    if (ctx.userAgent.isBot) {
      ctx.redirect('https://www.dailynow.co');
    } else if (ctx.userAgent.browser.toLowerCase() === 'firefox') {
      ctx.redirect('https://addons.mozilla.org/en-US/firefox/addon/daily/');
    } else {
      ctx.redirect('https://chrome.google.com/webstore/detail/daily-discover-web-techno/jlmpjdjjbgclbocgajdjefcidcncaied');
    }
  },
);

router.get('/privacy', ctx => ctx.redirect('https://www.iubenda.com/privacy-policy/14695236'));
router.get('/tos', ctx => ctx.redirect('https://medium.com/daily-now/daily-terms-of-service-47bb9c9a4b99'));

export default router;
