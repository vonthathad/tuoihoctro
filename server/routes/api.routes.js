/**
 * Created by andh on 1/28/17.
 */
import { Router } from 'express';
import passport from 'passport';
import * as users from '../controllers/user.controller';
import * as contents from '../controllers/content.controller';
import * as comments from '../controllers/comment.controller';
import * as categories from '../controllers/category.controller';

const router = new Router();

router.use(passport.authenticate('bearer', { session: false }), users.isBanned);
/* TOKEN */
router.get('/token', users.authToken);


// ////////// USER
router.route('/users')
  .get(users.requiresLogin, users.requiresAdmin, users.list);
router.route('/users/:userName')
  .get(users.requiresLogin, users.requiresAdmin, users.get)
  .put(users.requiresLogin, users.requiresAdmin, users.update)
  .delete(users.requiresLogin, users.requiresAdmin, users.remove);
router.param('userName', users.userByUsername);


// ////////// CATEGORY
router.post('/categories', categories.create)
  .get('/categories', categories.list);
router.route('/categories/:categoryID')
  .get(categories.get)
  .put(users.requiresManager, categories.update);
router.param('categoryID', categories.categoryByURL);

// ////////// CONTENT
router.post('/contents', users.requiresLogin, contents.create)
  .get('/contents', contents.list);
router.route('/contents/:contentID')
  .get(contents.get)
  .delete(users.requiresLogin, contents.remove);
router.route('/contents/:contentID/share')
  .put(users.requiresLogin, contents.share);
router.route('/contents/:contentID/view')
  .put(contents.view);
router.route('/contents/:contentID/report')
  .put(users.requiresLogin, contents.report);
router.route('/contents/:contentID/voteUp')
  .put(users.requiresLogin, contents.voteUp);
router.route('/contents/:contentID/voteDown')
  .put(users.requiresLogin, contents.voteDown);
router.route('/contents/:contentID/unVote')
  .put(users.requiresLogin, contents.unVote);
router.route('/contents/:contentID/publish')
  .put(users.requiresLogin, users.requiresManager, contents.publish);
router.param('contentID', contents.contentByID);

// ////////// COMMENT
router.post('/comments', users.requiresLogin, comments.create)
  .get('/comments', comments.list);
router.delete('/comments/:commentID', comments.remove);
router.route('/comments/:commentID/voteUp')
  .put(users.requiresLogin, comments.voteUp);
router.route('/comments/:commentID/voteDown')
  .put(users.requiresLogin, comments.voteDown);
router.route('/comments/:commentID/unVote')
  .put(users.requiresLogin, comments.unVote);
router.param('commentID', comments.commentByID);

export default router;
