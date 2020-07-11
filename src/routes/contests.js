import Router from 'koa-router';
import contest from '../models/contest';

const router = Router({
  prefix: '/contests',
});

router.get(
  '/',
  async (ctx) => {
    const now = new Date();
    const prizes = ['$512', '$256', '$128'];
    const [ongoing, upcoming] = await Promise.all([
      contest.getOngoingContest(now),
      contest.getUpcomingContest(now),
    ]);
    if (ongoing) {
      const { userId } = ctx.state.user || { userId: null };
      const [board, me] = await Promise.all([
        contest.getContestLeaderboard(ongoing.startAt, ongoing.endAt),
        ctx.state.user ?
          contest.getUserRank(ongoing.startAt, ongoing.endAt, userId) :
          Promise.resolve(null),
      ]);
      ctx.status = 200;
      ctx.body = {
        ongoing,
        upcoming,
        board: board.map((b, i) => Object.assign({}, b, { prize: prizes[i] })),
        me,
        referralLink: userId && `https://app.dailynow.co/get?r=${userId}`,
      };
    } else {
      ctx.status = 200;
      ctx.body = {
        ongoing,
        upcoming,
        board: [],
      };
    }
  },
);

export default router;
