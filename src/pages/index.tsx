import React, { FC, useState } from 'react';
import { useAppLoaded, useRequest } from '@wix/yoshi-flow-bm';
import {
  Page,
  Layout,
  Cell,
  Card,
  Text,
  Input,
  FormField,
  Box,
  Button,
} from 'wix-style-react';
import { Comment } from '@wix/ambassador-node-workshop-scala-app/rpc';

import { addComments, fetchComments } from '../api/comments.api';

const introUrl = 'https://github.com/wix-private/business-manager';

const Index: FC = () => {
  useAppLoaded({ auto: true });
  const { loading, error, data } = useRequest(fetchComments());
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const onAddComment = () => {};

  return (
    <Page>
      <Page.Header dataHook="app-title" title="Comments Application" />
      <Page.Content>
        <Layout>
          <Cell>
            <Card>
              <Card.Content>
                <FormField label="Fetch Comments">
                  {loading && <Text>Loading...</Text>}
                  {error && <Text>Error...</Text>}
                  {data?.comments?.map((comment: Comment, index: number) => (
                    <Text dataHook={`comment-${index}`}>
                      {comment.author} - {comment.text}
                    </Text>
                  ))}
                </FormField>

                <FormField label="Add Comments" labelSize="medium">
                  <Box direction="vertical">
                    <Text>Author</Text>
                    <Input
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </Box>
                  0
                  <Box direction="vertical">
                    <Text>Text</Text>
                    <Input
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </Box>
                  <Button onClick={() => onAddComment}>Submit</Button>
                </FormField>
              </Card.Content>
            </Card>
          </Cell>
        </Layout>
      </Page.Content>
    </Page>
  );
};

export default Index;
