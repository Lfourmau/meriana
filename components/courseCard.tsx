import styles from "../styles/CourseCard.module.css"

export default function CourseCard(props){
	return (
		<div className={styles.card}>
			<div className={styles.mainInfos}>
				<h2 className={styles.title}>{props.course.title}</h2>
				<p className={styles.p}>{props.course.content}</p>
			</div>
			<div className={styles.secondaryInfos}>
				<p className={styles.p}>{props.course.level}</p>
				<p className={styles.p}>{props.course.subject}</p>
				<p className={styles.p}>{props.course.chapter}</p>
			</div>
		</div>
	)
}