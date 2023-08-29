import Question from './Question';

interface QuestionProps extends Question {
  refresh?: function;
}
export default QuestionProps;
