import { Card } from 'antd';

import type { CardProps } from 'antd/lib/card';
import Translatex from '../AnimatePanel/Translatex';

import type { TranslateProps } from '../AnimatePanel/Translatex';

export interface SkeletonCardProps extends CardProps, TranslateProps {
  loading?: boolean;
}

const SkeletonCard = (props: SkeletonCardProps) => {
  const { loading = true, delay = 200, ...rest } = props;
  return (
    <Translatex direction="top" delay={delay} run>
      <Card hoverable loading={loading} {...rest}>
        {props.children}
      </Card>
    </Translatex>
  );
};

export default SkeletonCard;
