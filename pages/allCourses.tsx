import { Cours } from "../types/cours"
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import app from "../components/firebase"
import { useEffect, useState } from "react";
import CourseCard from "../components/courseCard";
import styles from "../styles/Post-class.module.css"


export default function AllCourses(){
	const db = getFirestore(app);

	const [allCourses, setAllCourses] = useState<Cours[]>([]);
	const [level, setLevel] = useState('All');
	const [subject, setSubject] = useState('All');
	const [chapter, setChapter] = useState('All');

	const handleLevelChange = async (event) => {
		const selectedOption = event.target.value;
		console.log(selectedOption)
		setLevel(selectedOption);
		const courses : Cours[] = await getSpecificCourses(selectedOption, subject, chapter);
  		setAllCourses(courses);
	  };
	  const handleChapterChange = async (event) => {
		const selectedOption = event.target.value;
		setChapter(selectedOption);
		const courses : Cours[] = await getSpecificCourses(level, subject, selectedOption);
		setAllCourses(courses);
	  };
	  const handleSubjectChange = async (event) => {
		const selectedOption = event.target.value;
		setSubject(selectedOption);
		const courses : Cours[] = await getSpecificCourses(level, selectedOption, chapter);
		setAllCourses(courses);
	  };

	useEffect(() => {
		getAllCourses()
		  .then((data) => {
			setAllCourses(data);
		  })
		  .catch((error) => {
			console.error('Erreur lors de la récupération des cours :', error);
		  });
	  }, []); 

	async function getAllCourses() : Promise<Cours[]>{
		try {
			const querySnapshot = await getDocs(collection(db, "Cours"));
			const courses = [];
			querySnapshot.forEach((doc) => {
			  // Ajoutez les données de chaque cours à un tableau
			  courses.push({ id: doc.id, ...doc.data() });
			});
			return courses; // Retourne le tableau de cours
		  } catch (error) {
			console.error("Erreur lors de la récupération des cours :", error);
			throw error; // Vous pouvez choisir de lever l'erreur ici ou de la gérer différemment
		  }
		}

	async function getSpecificCourses(level : string, subject:string, chapter:string) : Promise<Cours[]>{
		// IN PROGRESS. HOW TO PERFORM THE WHERE CLOSE BASED ON ACITVE SELECTS
		
		const myCollection = collection(db, "Cours")
		let myQuery = query(myCollection);

		if (level != "All")
			myQuery = query(myQuery, where("level", "==", level))
		if (subject != "All")
			myQuery = query(myQuery, where("subject", "==", subject))
		if (chapter != "All")
			myQuery = query(myQuery, where("chapter", "==", chapter))
		try {
			const querySnapshot = await getDocs(myQuery);
			const courses = [];
			querySnapshot.forEach((doc) => {
			  // Ajoutez les données de chaque cours à un tableau
			  courses.push({ id: doc.id, ...doc.data() });
			});
			return courses
		  } catch (error) {
			console.error("Erreur lors de la récupération des cours :", error);
			throw error; // Vous pouvez choisir de lever l'erreur ici ou de la gérer différemment
		  }
	}


	return (
		<>
			<div className={styles.selects}>
            <div>
              <label htmlFor="level" className={styles.label}>Class</label>
              <select id="level" className={styles.select} value={level} onChange={handleLevelChange}>
                <option value="All">All</option>
                <option value="6e">6e</option>
                <option value="5e">5e</option>
                <option value="4e">4e</option>
                <option value="3e">3e</option>
              </select>
            </div>
            <div>
              <label htmlFor="subject" className={styles.label}>Subject</label>
              <select id="subject" className={styles.select} value={subject} onChange={handleSubjectChange}>
                <option value="All">All</option>
                <option value="Maths">Maths</option>
                <option value="Francais">Francais</option>
                <option value="Histoire">Histoire</option>
                <option value="Géographie">Géographie</option>
                <option value="SVT">SVT</option>
                <option value="Physique">Physique</option>
                <option value="Anglais">Anglais</option>
                <option value="Espagnol">Espagnol</option>
                <option value="">EPS mdr</option>
              </select>
            </div>
            <div>
              <label htmlFor="chapter" className={styles.label}>Chapter</label>
              <select id="chapter" className={styles.select} value={chapter} onChange={handleChapterChange}>
                <option value="All">All</option>
                <option value="Chapitre 1">Chapitre 1</option>
                <option value="Chapitre 2">Chapitre 2</option>
                <option value="Chapitre 3">Chapitre 3</option>
                <option value="Chapitre 4">Chapitre 4</option>
                <option value="Chapitre 5">Chapitre 5</option>
                <option value="Chapitre 6">Chapitre 6</option>
              </select>
            </div> 
          </div>
			<div className={styles.allCards}>
			{allCourses.map((course, index) => (
				<CourseCard key={index} course={course}></CourseCard>
				))}
			</div>
		</>
	)
}