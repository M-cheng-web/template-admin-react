import SvgIcon from '../SvgIcon';
import useStyles from './style';

const LoadingPage = () => {
  const { styles } = useStyles();
  return (
    <div className={styles['loading-page']}>
      <div className="loading-side" />
      <SvgIcon
        className="
        loading-logo"
        name="logo"
        size={32}
      />
      <div className="loading-in" />
    </div>
  );
};
export default LoadingPage;
