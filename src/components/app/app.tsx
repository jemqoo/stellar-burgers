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
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ConstructorPage />} />

        <Route path='/feed' element={<Feed />} />

        <Route path='/login' element={<Login />} />

        <Route path='/register' element={<Register />} />

        <Route path='/forgot-password' element={<ForgotPassword />} />

        <Route path='/reset-password' element={<ResetPassword />} />

        <Route path='/profile' element={<Profile />} />

        <Route path='/profile/orders' element={<ProfileOrders />} />

        <Route
          path='/feed/:number'
          element={
            <Modal title='' onClose={() => {}}>
              <OrderInfo />
            </Modal>
          }
        />

        <Route
          path='/ingredients/:id'
          element={
            <Modal title='' onClose={() => {}}>
              <IngredientDetails />
            </Modal>
          }
        />

        <Route
          path='/profile/orders/:number'
          element={
            <Modal title='' onClose={() => {}}>
              <OrderInfo />
            </Modal>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
