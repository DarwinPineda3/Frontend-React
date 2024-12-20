// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import { Helmet } from 'react-helmet';

type Props = {
  description?: string;
  children: JSX.Element | JSX.Element[];
  title?: string;
  noPadding?: boolean;
};

const PageContainer = ({ title, description, children, noPadding }: Props) => (
  <div
    style={{ paddingBottom: noPadding ? 0 : 60 }}
  >
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    {children}
  </div>
);

export default PageContainer;
