import React, { FC } from 'react';
import {
  useTranslation,
  useAppLoaded,
  Trans,
  useRequest,
} from '@wix/yoshi-flow-bm';
import Heading, { Page, Layout, Cell, Card, Text } from 'wix-style-react';
import { Comment } from '@wix/ambassador-node-workshop-scala-app/rpc';

import { fetchComments } from '../comments.api';
import { err } from '@wix/perfer-sled/dist/src/Result';

const introUrl = 'https://github.com/wix-private/business-manager';

const Index: FC = () => {
  useAppLoaded({ auto: true });
  const { loading, error, data } = useRequest(fetchComments());
  const { t } = useTranslation();
  console.log(data);
  return (
    <Page>
      <Page.Header dataHook="app-title" title="Comments Application" />
      <Page.Content>
        <Layout>
          <Cell>
            <Card>
              <Card.Content>
                {loading && <Text>Loading...</Text>}
                {error && <Text>Error...</Text>}
                {data?.comments?.map((comment: Comment) => (
                  <Text>
                    {comment.author} - {comment.text}
                  </Text>
                ))}
              </Card.Content>
            </Card>
          </Cell>
        </Layout>
      </Page.Content>
    </Page>
  );
};

export default Index;
