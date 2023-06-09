interface Question {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount?: number;
  createdAt: string;
}
export default Question;
