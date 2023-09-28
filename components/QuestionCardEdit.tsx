import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "../styles/QuestionCardEdit.module.css"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"

export default function QuestionCardEdit(props){
	const [goodAnswers, setGoodAnswers] = useState<string>('')
	const [wrongAnswers, setWrongAnswers] = useState<string>('')
	
	useEffect(() => {
		let goodAnswers:string = ""
		let wrongAnswers:string = ""
		props.question.answers.forEach(data => {
			if (data.goodAnswer == true)
				goodAnswers = goodAnswers.concat(data.answer).concat(',')
			else
				wrongAnswers = wrongAnswers.concat(data.answer).concat(',')
		});
		setWrongAnswers(wrongAnswers)
		setGoodAnswers(goodAnswers)
	  }, []); 
	return(
		<div key={props.index} className={styles.questionCard}>
		<h3 onClick={() => props.deleteQuestion(props.index)} className={styles.cross}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></h3>
		<input value={props.question.rule}/>
		<input value={goodAnswers}/>
		<input value={wrongAnswers}/>
		
	  </div>
	)
}