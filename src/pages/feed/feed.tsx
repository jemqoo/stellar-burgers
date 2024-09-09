import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds, getFeeds } from '../../slices/feedsSlice';

export const Feed: FC = () => {
  // const { feedData, loading } = useSelector((state) => state.feed);

  const dispatch = useDispatch();

  // const orders = feedData.orders;

  useEffect(() => {
    dispatch(fetchFeeds());
  }, []);

  // if (loading) {
  //   return <Preloader />;
  // }

  const orders: TOrder[] = useSelector(getFeeds);

  const handleGetAllFeeds = () => {
    dispatch(fetchFeeds());
  };

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        handleGetAllFeeds;
      }}
    />
  );
};
