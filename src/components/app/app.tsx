import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../slices/ingredientsSlice';
import { fetchFeeds } from '../../slices/feedsSlice';
import { ProtectedRoute } from '../protected-routes/protected-route';
import { checkUserAuth } from '../../slices/userSlice';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(fetchIngredients());
    // dispatch(fetchFeeds());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />

        <Route path='/feed' element={<Feed />} />

        <Route
          path='/login'
          element={
            <ProtectedRoute type='unauth'>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path='/register'
          element={
            <ProtectedRoute type='unauth'>
              <Register />
            </ProtectedRoute>
          }
        />

        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute type='unauth'>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/reset-password'
          element={
            <ProtectedRoute type='unauth'>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute type='auth'>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute type='auth'>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        <Route path='/feed/:number' element={<OrderInfo />} />

        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute type='auth'>
              <OrderInfo />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={'Информация о заказе'} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute type='auth'>
                <Modal
                  title={'Информация о заказе'}
                  onClose={() => navigate(-1)}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
