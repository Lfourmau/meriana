import styles from '../styles/Post-class.module.css';
import { useState } from 'react';
import { Answer, Question } from '../types/question';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faFeather, faMedal } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/linkButton';
import LinkButton from '../components/linkButton';
import Alert from '../components/Alert';
import QuestionCard from '../components/questionCard';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../components/firebase"
import Cours from "../types/cours"

export default function PostclassName() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [rule, setRule] = useState<string>('');
  const [goodanswers, setGoodanswers] = useState('');
  const [wronganswers, setWronganswers] = useState('');
  const [level, setLevel] = useState('');
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showAlert, setShowAlert] = useState(false);


  function deleteQuestion(index) {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  }

  function addQuestion(): void {
    let all_answers : Answer[] = []
    let tmpAnswers = goodanswers.split(",");
    tmpAnswers.forEach(element => {
      all_answers.push({
        answer: element,
        goodAnswer : true,
      })
    });
    tmpAnswers = wronganswers.split(",");
    tmpAnswers.forEach(element => {
      all_answers.push({
        answer: element,
        goodAnswer : false,
      })
    });
    const newQuestion = {
      rule : rule,
      answers : all_answers,
    }
    const newArray = [...questions, newQuestion]; 
    setQuestions(newArray);
    setRule("")
    setWronganswers("")
    setGoodanswers("")

     setShowAlert(true);
     setTimeout(() => {
       setShowAlert(false);
     }, 3000); // 
  }

  const handleRule = (event) => {
    setRule(event.target.value);
  }
  const handleGoodanswers = (event) => {
    setGoodanswers(event.target.value);
  }
  const handleWronganswers = (event) => {
    setWronganswers(event.target.value);
  }
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

  async function postDatas(){
    try {
      const db = getFirestore(app);
      const myCollection = collection(db, "Cours");
  
      const datas = {
        level: level,
        subject: subject,
        chapter: chapter,
        title: title,
        content: content,
        questions: questions,
      };
  
      console.log("Données à ajouter :", datas); // Ajoutez ceci pour vérifier les données à ajouter
  
      const docRef = await addDoc(myCollection, datas);
      console.log("Document ajouté avec ID :", docRef.id);
    } catch (erreur) {
      console.error("Erreur lors de l'ajout du document :", erreur);
    }
  }

  return (
    <>
    {showAlert && (
        <Alert text="Opération réalisée avec succès" status="success"></Alert>
    )}
      <div id='step1' className={styles.classInfos}>
        <form className={styles.form}>
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
            <div className={styles.inputgroup}>
              <label htmlFor="Title" className={styles.label} >Title</label>
              <input type="text" id="Title" className={styles.input} value={title} onChange={handleTitleChange} placeholder="Titre du cours" required/>
            </div>
            <div className={styles.inputgroup}>
              <label htmlFor="conntent" className={styles.label}>Content (markdown format)</label>
              <textarea wrap='hard' value={content} onChange={handleContentChange} id="content" className={styles.input} rows={10} cols={50} placeholder="cours format markdown. Le markdown pur sera stocké puis mis en forme au moment de l'affichage sur l'app" required/>
            </div>
            <LinkButton href="#quizzs" color="cyan" text="Prochaine étape"></LinkButton>
         </form>
      </div>

      <div id='quizzs' className={styles.quizzs}>
        <form className={styles.form}>

            <div className={styles.inputgroup}>
              <label htmlFor="rule" className={styles.label}>Consigne</label>
              <input onChange={handleRule} value={rule} type="text" id="rule" className={styles.input} placeholder="Énoncé de la question" required/>
            </div>
            <div className={styles.inputgroup}>
              <label htmlFor="Rightanswers" className={styles.label}>Bonnes réponses</label>
              <input onChange={handleGoodanswers} value={goodanswers} type="text" id="Rightanswers" className={styles.input} placeholder="Bonne(s) réponse(s). Séparées par des virgules." required/>
            </div>
            <div className={styles.inputgroup}>
              <label htmlFor="Wronganswers" className={styles.label}>Mauvaises réponses</label>
              <input onChange={handleWronganswers} value={wronganswers} type="text" id="Wronganswers" className={styles.input} placeholder="Mauvaise(s) réponse(s). Séparées par des virgules." required/>
            </div>
            <div className={styles.buttons}>
              <LinkButton href="#step1" color="cyan" text="Etape précédente"></LinkButton>
              <LinkButton href="#recap" color="cyan" text="Etape suivante"></LinkButton>
              <LinkButton onClick={addQuestion} color="green" text="Ajouter la question"></LinkButton>         
            </div>
        </form>
      </div>

      <div id='recap' className={styles.recap}>
        <h1>Récapitulatif du contenu</h1>
        <div className={styles.recapInfos}>
          <h3 className={styles.iconAndText}><FontAwesomeIcon className={styles.icon} icon={faMedal} />{level}</h3>
          <h3 className={styles.iconAndText}><FontAwesomeIcon className={styles.icon} icon={faFeather} />{subject}</h3>
          <h3 className={styles.iconAndText}><FontAwesomeIcon className={styles.icon} icon={faBook} />{chapter}</h3>
        </div>
        <div className={styles.recapContent}>
          <h2 className={styles.iconAndText}>{title}</h2>
          <p className={styles.content}>{content}</p>
        </div>
        <div className={styles.recapQuestions}>
          {questions.map((question, index) => (
           <QuestionCard index={index} question={question} deleteQuestion={deleteQuestion}></QuestionCard>
          ))}
        </div>
        <LinkButton onClick={postDatas} color="orange" text="Poster ce contenu"></LinkButton>
      </div>
    </>
  );
}
