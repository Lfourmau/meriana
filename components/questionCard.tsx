import styles from "../styles/QuestionCard.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function QuestionCard(props){
	return (
		<div key={props.index} className={styles.questionCard}>
			<h3 onClick={() => props.deleteQuestion(props.index)} className={styles.cross}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></h3>
			<h4 key={props.question.rule}>{props.question.rule}</h4>
			<ul className={styles.ul}>
			{props.question.answers.map((answer, index) => (
				<li className={answer.goodAnswer ? styles.goodanswer : styles.wronganswer} key={index}>{answer.answer}</li>
				))}
			</ul>
	  </div>
	)
}