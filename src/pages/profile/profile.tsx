import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUserThunk } from '../../slices/userSlice';
import { getOrders } from '../../slices/userOrdersSlice';

export const Profile: FC = () => {
  const { user } = useSelector((state) => ({
    ...state.user,
    name: '',
    email: ''
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  // Инициализация formValue с начальными значениями
  const [formValue, setFormValue] = useState({
    name: '', // Или используйте default значение (например, 'Unknown')
    email: '',
    password: ''
  });

  // Обновление formValue при изменении user
  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  }, [user]);

  // Правильное сравнение для isFormChanged
  const isFormChanged =
    user &&
    (formValue.name !== user.name ||
      formValue.email !== user.email ||
      !!formValue.password);

  // Остальной код без изменений
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(getUserThunk(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
