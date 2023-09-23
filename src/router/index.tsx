import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/Layout/MainLayout';
import Page404 from '@/views/ErrorPage/Page404';
import Home from '@/views/Home/Home';
import SignIn from '@/views/SignIn/SignIn';
import SignUp from '@/views/SignUp/SignUp';
import MyQuestionList from '@/views/Manage/MyQuestionList/MyQuestionList';
import StarList from '@/views/Manage/StarList/StarList';
import TrashList from '@/views/Manage/TrashList/TrashList';
import QuestionLayout from '@/Layout/QuestionLayout';
import ManageLayout from '@/Layout/ManageLayout';
import ConfigIndex from '@/views/Config';
import OptionsConfig from '@/views/Config/OptionsConfig';
import UserConfig from '@/views/Config/UserConfig/UserConfig';

const QuestionStatistic = lazy(
  () => import(/* webpackChunkName: "statisticPage" */ '@/views/Question/QuestionStatistic')
);
const QuestionEdit = lazy(
  () => import(/* webpackChunkName: "editPage" */ '@/views/Question/QuestionEdit')
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'signIn',
        element: <SignIn />,
      },
      {
        path: 'signUp',
        element: <SignUp />,
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <MyQuestionList />,
          },
          {
            path: 'star',
            element: <StarList />,
          },
          {
            path: 'trash',
            element: <TrashList />,
          },
        ],
      },
      {
        path: 'config',
        element: <ManageLayout />,
        children: [
          {
            path: '',
            element: <ConfigIndex />,
            children: [
              {
                path: 'options',
                element: <OptionsConfig />,
              },
              {
                path: 'user',
                element: <UserConfig />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <QuestionEdit />,
      },
      {
        path: 'statistic/:id',
        element: <QuestionStatistic />,
      },
    ],
  },
  {
    path: '*',
    element: <Page404 />,
  },
]);

export default router;
