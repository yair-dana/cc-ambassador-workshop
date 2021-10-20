import React from 'react';
import { render } from '@testing-library/react';
import { TextTestkit, PageHeaderTestkit } from 'wix-style-react/dist/testkit';
import { testkit } from '@wix/yoshi-flow-bm/testkit';
import Index from './index';
import { whenRequest } from '@wix/yoshi-flow-bm/testkit/http-client';
import { fetchComments } from '../api/comments.api';

describe('index', () => {
  testkit.beforeAndAfter();

  beforeEach(() => testkit.reset());

  it('renders a title correctly', async () => {
    const { TestComponent } = testkit.getBMComponent(Index);
    const { baseElement, findByTestId } = render(<TestComponent />);

    await findByTestId('app-title');

    const pageHeaderTestkit = PageHeaderTestkit({
      wrapper: baseElement,
      dataHook: 'app-title',
    });

    expect(await pageHeaderTestkit.exists()).toBe(true);
    expect(await pageHeaderTestkit.titleText()).toBe('Comments Application');
  });

  it('should render comments list', async () => {
    const { TestComponent } = testkit.getBMComponent(Index, {
      mocks: [
        whenRequest(fetchComments)
          .withData()
          .reply(200, () => ({
            comments: [
              {
                author: 'Yair',
                text: 'First Comment',
              },
            ],
          })),
      ],
    });
    const { baseElement } = render(<TestComponent />);

    const firstComment = TextTestkit({
      wrapper: baseElement,
      dataHook: 'comment-0',
    });
    expect(await firstComment.getText()).toEqual('Yair - First Comment');
  });
});
