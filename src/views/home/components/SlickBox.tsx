import { Typography } from 'antd';
import { useTheme } from 'antd-style';
import { t } from 'i18next';
import { useState } from 'react';
// import { useTranslation } from 'react-i18next';
import { BaseSlick, Translatex } from '@/ui-common';

import cover_1 from '@/assets/images/cover_1.jpg';
import cover_2 from '@/assets/images/cover_2.jpg';
import cover_3 from '@/assets/images/cover_3.jpg';
import cover_4 from '@/assets/images/cover_4.jpg';
import cover_5 from '@/assets/images/cover_5.jpg';

const { Title, Text } = Typography;

const SlickBox = () => {
  const [current, setCurrent] = useState(1);
  const token = useTheme();

  return (
    <BaseSlick
      sliderConfig={{
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        afterChange: (index) => {
          setCurrent(index + 1);
        },
      }}
    >
      <div className="image-box">
        <img src={cover_1} alt="" />
        <div className="img-info">
          <Translatex run={current === 1} delay={100}>
            <Text ellipsis style={{ fontWeight: 'bold', color: token.colorPrimary }} type="success">
              {t('作者：Gbeata')}
            </Text>
          </Translatex>
          <Translatex run={current === 1} delay={200}>
            <Title style={{ color: 'white', margin: '8px 0' }} ellipsis level={4} color="white">
              {t('还没有想清楚如何介绍自己和系统之前，就请允许我使用这些文字占位吧～')}
            </Title>
          </Translatex>
          <Translatex run={current === 1} delay={300}>
            <Text ellipsis style={{ color: 'white' }}>
              {t('详细介绍下自己吧：我是一个小前端呀小前端，小前端啊小前端')}
            </Text>
          </Translatex>
        </div>
      </div>
      {/* <div className="image-box">
        <img src={cover_2} alt="" />
        <div className="img-info">
          <Translatex run={current === 2} delay={100}>
            <Text ellipsis style={{ fontWeight: 'bold', color: token.colorPrimary }} type="success">
              {t('作者：Gbeata')}
            </Text>
          </Translatex>
          <Translatex run={current === 2} delay={200}>
            <Title style={{ color: 'white', margin: '8px 0' }} ellipsis level={4} color="white">
              {t('还没有想清楚如何介绍自己和系统之前，就请允许我使用这些文字占位吧～')}
            </Title>
          </Translatex>
          <Translatex run={current === 2} delay={300}>
            <Text ellipsis style={{ color: 'white' }}>
              {t('详细介绍下自己吧：我是一个小前端呀小前端，小前端啊小前端')}
            </Text>
          </Translatex>
        </div>
      </div>
      <div className="image-box">
        <img src={cover_3} alt="" />
        <div className="img-info">
          <Translatex run={current === 3} delay={100}>
            <Text ellipsis style={{ fontWeight: 'bold', color: token.colorPrimary }} type="success">
              {t('作者：Gbeata')}
            </Text>
          </Translatex>
          <Translatex run={current === 3} delay={200}>
            <Title style={{ color: 'white', margin: '8px 0' }} ellipsis level={4} color="white">
              {t('还没有想清楚如何介绍自己和系统之前，就请允许我使用这些文字占位吧～')}
            </Title>
          </Translatex>
          <Translatex run={current === 3} delay={300}>
            <Text ellipsis style={{ color: 'white' }}>
              {t('详细介绍下自己吧：我是一个小前端呀小前端，小前端啊小前端')}
            </Text>
          </Translatex>
        </div>
      </div>
      <div className="image-box">
        <img src={cover_4} alt="" />
        <div className="img-info">
          <Translatex run={current === 4} delay={100}>
            <Text ellipsis style={{ fontWeight: 'bold', color: token.colorPrimary }} type="success">
              {t('作者：Gbeata')}
            </Text>
          </Translatex>
          <Translatex run={current === 4} delay={200}>
            <Title style={{ color: 'white', margin: '8px 0' }} ellipsis level={4} color="white">
              {t('还没有想清楚如何介绍自己和系统之前，就请允许我使用这些文字占位吧～')}
            </Title>
          </Translatex>
          <Translatex run={current === 4} delay={300}>
            <Text ellipsis style={{ color: 'white' }}>
              {t('详细介绍下自己吧：我是一个小前端呀小前端，小前端啊小前端')}
            </Text>
          </Translatex>
        </div>
      </div>
      <div className="image-box">
        <img src={cover_5} alt="" />
        <div className="img-info">
          <Translatex run={current === 5} delay={100}>
            <Text ellipsis style={{ fontWeight: 'bold', color: token.colorPrimary }} type="success">
              {t('作者：Gbeata')}
            </Text>
          </Translatex>
          <Translatex run={current === 5} delay={200}>
            <Title style={{ color: 'white', margin: '8px 0' }} ellipsis level={4} color="white">
              {t('还没有想清楚如何介绍自己和系统之前，就请允许我使用这些文字占位吧～')}
            </Title>
          </Translatex>
          <Translatex run={current === 5} delay={300}>
            <Text ellipsis style={{ color: 'white' }}>
              {t('详细介绍下自己吧：我是一个小前端呀小前端，小前端啊小前端')}
            </Text>
          </Translatex>
        </div>
      </div> */}
    </BaseSlick>
  );
};

export default SlickBox;
