import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/Layout/MainLayout';
import Page404 from '@/views/ErrorPage/Page404';
import Home from '@/views/Home/Home';
import SignIn from '@/views/SignIn/SignIn';
import SignUp from '@/views/SignUp/SignUp';
import MyQuestionList from '@/views/Manage/MyQuestionList/MyQuestionList';
import StarList from '@/views/Manage/StarList/StarList';
import TrashList from '@/views/Manage/TrashList/TrashList';
import QuestionEdit from '@/views/Question/QuestionEdit';
import QuestionStatistics from '@/views/Question/QuestionStatistics';
import QuestionLayout from '@/Layout/QuestionLayout';
import ManageLayout from '@/Layout/ManageLayout';

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
        path: 'statistics/:id',
        element: <QuestionStatistics />,
      },
    ],
  },
  {
    path: '*',
    element: <Page404 />,
  },
]);

export default router;
