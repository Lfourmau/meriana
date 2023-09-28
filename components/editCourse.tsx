import Link from 'next/link';
import LinkButton from './linkButton';
import { Input } from 'postcss';
import QuestionCard from './questionCard';
import QuestionCardEdit from './QuestionCardEdit';
import { useEffect, useState } from 'react';
import { Question } from '../types/question';
import styles from '../styles/Post-class.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal, faFeather, faBook } from '@fortawesome/free-solid-svg-icons';



export default function EditCourse(props){
	const [title, setTitle] = useState<string>(props.course.title)
	const [content, setContent] = useState<string>(props.course.content)
	const [level, setLevel] = useState<string>(props.course.level)
	const [subject, setSubject] = useState<string>(props.course.subject)
	const [chapter, setChapter] = useState<string>(props.course.chapter)
	const [questions, setQuestions] = useState<Question[]>(props.course.questions)

	
	const handleLevelChange = (event) => {
		const selectedOption = event.target.value;
		setLevel(selectedOption);
	  };
	  const handleChapterChange = (event) => {
		const selectedOption = event.target.value;
		setChapter(selectedOption);
	  };
	  const handleSubjectChange = (event) => {
		const selectedOption = event.target.value;
		setSubject(selectedOption);
	  };
	  const handleTitleChange = (event) => {
		setTitle(event.target.value);
	  };
	  const handleContentChange = (event) => {
		let content = event.target.value
		content = content.replace(/\n\r?/g, '<br />')
		setContent(content);
	  };
	return (
		<>
		  <div id='recap' className={styles.recap}>
			<h1>Récapitulatif du contenu</h1>
			<div className={styles.recapInfos}>
			<div className={styles.selects}>
            <div>
              <label htmlFor="countries" className={styles.label}>Class</label>
              <select id="countries" className={styles.select} value={level} onChange={handleLevelChange}>
                <option>Select</option>
                <option>6e</option>
                <option>5e</option>
                <option>4e</option>
                <option>3e</option>
              </select>
            </div>
            <div>
              <label htmlFor="countries" className={styles.label}>Subject</label>
              <select id="countries" className={styles.select} value={subject} onChange={handleSubjectChange}>
                <option>Select</option>
                <option>Maths</option>
                <option>Francais</option>
                <option>Histoire</option>
                <option>Géographie</option>
                <option>SVT</option>
                <option>Physique</option>
                <option>Anglais</option>
                <option>Espagnol</option>
                <option>EPS mdr</option>
              </select>
            </div>
            <div>
              <label htmlFor="countries" className={styles.label}>Chapter</label>
              <select id="countries" className={styles.select} value={chapter} onChange={handleChapterChange}>
                <option>Select</option>
                <option>Chapitre 1</option>
                <option>Chapitre 2</option>
                <option>Chapitre 3</option>
                <option>Chapitre 4</option>
                <option>Chapitre 5</option>
                <option>Chapitre 6</option>
              </select>
            </div> 
          </div>
			</div>
			<div className={styles.recapContent}>
				<input value={title} className={styles.input}/>
				<textarea rows={10} cols={50} value={content} className={styles.input}/>
			</div>
			<div className={styles.recapQuestions}>
			{questions.map((question, index) => (
				<QuestionCardEdit index={index} question={question}></QuestionCardEdit>
			))}
			</div>
		</div>
			<LinkButton onClick={props.onClick} text="go back"></LinkButton>
		</>
	)
}