import { ComponentInfoType } from '@/store/components';

interface Question {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  isDeleted: boolean;
  answerCount: number;
  createdAt?: number;
  updatedAt?: number;
  createUser?: string;
  componentList?: ComponentInfoType[];
  isAutoSave?: boolean;
}
export default Question;
