import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearOrderModalData,
  getOrderByNumber
} from '../../slices/newOrderSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();

  /** TODO: взять переменные orderData и ingredients из стора */
  // const number = useParams().number?.toString();
  // const orders = useSelector((state) => state.feed.feeds);
  // const orderData = orders.find((item) => item.number.toString() === number);

  const orderData = useSelector((state) => state.order.orderModalData);
  const number = Number(useParams().number);

  const { ingredients } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(getOrderByNumber(number));

    return () => {
      dispatch(clearOrderModalData());
    };
  }, [dispatch]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
