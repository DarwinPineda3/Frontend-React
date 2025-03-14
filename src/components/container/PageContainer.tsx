// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import { Helmet } from 'react-helmet';

type Props = {
  description?: string;
  children: JSX.Element | JSX.Element[];
  title?: string;
  addBottomPadding?: boolean;
};

const PageContainer = ({ title, description, children, addBottomPadding = true}: Props) => (
  <div
    style={{ paddingBottom: addBottomPadding ? 60 : 0 }}
  >
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    {children}
  </div>
);

export default PageContainer;
