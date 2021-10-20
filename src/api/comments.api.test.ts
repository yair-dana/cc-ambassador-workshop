import { NodeWorkshopScalaApp } from '@wix/ambassador-node-workshop-scala-app/rpc';
import { aComment } from '@wix/ambassador-node-workshop-scala-app/builders';

import { bootstrap, HttpClient } from '@wix/yoshi-flow-bm/test/serverless';

import { fetchComments } from './comments.api';

const serverlessApp = bootstrap();
let client: HttpClient;
describe('Comment API', () => {
  serverlessApp.beforeAndAfter();

  beforeAll(() => {
    client = new HttpClient({ baseURL: serverlessApp.getUrl() });
  });

  it('should display comment author and text', async () => {
    const siteId = 'b6004ffd-d198-49c3-b25a-d74a0966e661';
    const comments = [aComment().build()];

    const commentsStub =
      serverlessApp.ambassador.createStub(NodeWorkshopScalaApp);
    commentsStub.CommentsService().fetch.when(siteId).resolve(comments);

    const { data: response } = await client.request(fetchComments());
    expect(response.comments).toEqual(comments);
  });
});
