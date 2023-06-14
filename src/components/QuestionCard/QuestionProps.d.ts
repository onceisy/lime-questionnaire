interface Question {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount?: number;
  createdAt: string;
  setStar?: function;
  onCopy?: function;
  onDelete?: function;
}
export default Question;
