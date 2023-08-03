import React, { FC, useState } from 'react';
import { App, Button, Modal, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { createQuestion } from '@/service/question';
import { ROUTE_QUESTION_EDIT } from '@/router/path';
import { useRequest } from 'ahooks';
import { nanoid } from 'nanoid';
import QuestionTitlePropsType from '@/views/Question/QuestionEdit/Components/QuestionTitle/interface';
import { ComponentInfoType } from '@/store/components';

const CreateQuestion: FC = () => {
  const { t } = useTranslation();
  const nav = useNavigate();
  const { message } = App.useApp();
  const { loading, run: handleCreate } = useRequest(createQuestion, {
    manual: true,
    onSuccess: res => {
      message.success(t('manage.createSuccess'));
      form.resetFields();
      nav(`${ROUTE_QUESTION_EDIT}/${res.data._id}`);
    },
  });

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  function handleOk() {
    form
      .validateFields()
      .then(values => {
        const initialQuestionTitle: QuestionTitlePropsType = {
          text: values.title,
          level: 3,
          isCenter: false,
          description: t('question.defaultDescription'),
        };
        const componentList: ComponentInfoType[] = [
          {
            _id: nanoid(),
            type: 'QuestionTitle',
            props: initialQuestionTitle,
          },
        ];
        const params = {
          ...values,
          componentList,
          createUser: '649324ef690b8b3224ea5029',
        };
        handleCreate(params);
      })
      .catch(() => false);
  }
  function handleCancel() {
    setIsModalOpen(false);
  }
  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        className="mb-10"
        disabled={loading}
        onClick={() => setIsModalOpen(true)}
      >
        {t('manage.createQuestionnaire')}
      </Button>
      <Modal
        title={t('manage.createQuestionnaire')}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="mt-5">
          <Form
            form={form}
            layout="vertical"
            name="create-question"
            initialValues={{ modifier: 'public' }}
          >
            <Form.Item
              required={false}
              label={t('manage.questionTitle')}
              name="title"
              rules={[{ required: true, message: t('manage.inputQuestionTitle') }]}
            >
              <Input allowClear />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default CreateQuestion;
