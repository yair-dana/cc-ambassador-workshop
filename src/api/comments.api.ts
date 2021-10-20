import { method } from '@wix/yoshi-flow-bm/serverless';
import {
  NodeWorkshopScalaApp,
  Comment,
} from '@wix/ambassador-node-workshop-scala-app/rpc';

export const fetchComments = method(async function () {
  const commentsService = NodeWorkshopScalaApp().CommentsService();
  const data = await commentsService(this.context.aspects).fetch(
    'b6004ffd-d198-49c3-b25a-d74a0966e661',
  );
  return { comments: data };
});

export const addComments = method(async function (comment: Comment) {
  const commentsService = NodeWorkshopScalaApp().CommentsService();
  return commentsService(this.context.aspects).add(
    'b6004ffd-d198-49c3-b25a-d74a0966e661',
    comment,
  );
});
