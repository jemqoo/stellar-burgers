import { FC, useMemo } from 'react';

import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';

import { addOrder, clearOrderModalData } from '../../slices/newOrderSlice';
import { clearConstructor } from '../../slices/constructorSlice';
import { addNewOrder } from '../../slices/feedsSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const { orderModalData, orderRequest } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const burgerConstructor = useSelector((state) => state.burgerConstructor);

  const constructorItems = {
    bun: burgerConstructor.bun,
    ingredients: burgerConstructor.ingredients
  };

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) navigate('/login');

    if (constructorItems.bun && user) {
      const ids = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id
      ];
      dispatch(addOrder(ids)).then(() => {
        if (orderModalData) dispatch(addNewOrder(orderModalData));
      });
    }
  };
  const closeOrderModal = () => {
    dispatch(clearConstructor());
    dispatch(clearOrderModalData());
    navigate('/', { replace: true });
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      (constructorItems?.ingredients
        ? constructorItems.ingredients
            .map((item) => item.price)
            .reduce((s, v) => s + v, 0)
        : 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
