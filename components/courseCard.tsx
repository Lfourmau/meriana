import styles from "../styles/CourseCard.module.css"

export default function CourseCard(props){
	return (
		<div className={styles.card} onClick={props.onClick}>
			<div className={styles.mainInfos}>
				<h2 className='font-bold mb-2'>{props.course.title}</h2>
				<p className={styles.p}>{props.course.content}</p>
			</div>
			<div className={styles.thirdInfos}>
				<p className={styles.p}>{props.course.level}</p>
				<p className={styles.p}>{props.course.subject}</p>
				<p className={styles.p}>{props.course.chapter}</p>
			</div>
		</div>
	)
}