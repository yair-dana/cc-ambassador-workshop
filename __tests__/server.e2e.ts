import { AmbassadorTestkit } from '@wix/ambassador-testkit';
import { NodeWorkshopScalaApp } from '@wix/ambassador-node-workshop-scala-app/rpc';
import { aComment } from '@wix/ambassador-node-workshop-scala-app/builders';

import { bootstrap, HttpClient } from '@wix/yoshi-flow-bm/test/serverless';

import { fetchComments } from '../src/comments.api';

const serverlessApp = bootstrap();

describe('Comment API', () => {
  const ambassadorTestkit = new AmbassadorTestkit();
  ambassadorTestkit.beforeAndAfter();
  serverlessApp.beforeAndAfter();

  it('should display comment author and text', async () => {
    const siteId = 'b6004ffd-d198-49c3-b25a-d74a0966e661';
    const client = new HttpClient({ baseURL: serverlessApp.getUrl() });
    const comments = [aComment().build()];

    ambassadorTestkit
      .createStub(NodeWorkshopScalaApp)
      .CommentsService()
      .fetch.when(siteId)
      .resolve(comments);

    const { data: response } = await client.request(fetchComments());
    expect(response).toEqual(comments);
  });
});
