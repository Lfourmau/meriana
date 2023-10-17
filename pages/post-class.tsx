import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';
import { Answer, Question } from '../types/question';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faFeather, faMedal } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/linkButton';
import LinkButton from '../components/linkButton';
import Alert from '../components/Alert';
import QuestionCard from '../components/questionCard';
import { getFirestore, collection, addDoc, doc, updateDoc } from "firebase/firestore";
import app from "../components/firebase"
import { Cours } from "../types/cours"
import dynamic from "next/dynamic";
import TurndownService from 'turndown';


const turndownService = new TurndownService({
  //configuration de Turndown ici
  headingStyle: 'atx',
});

const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'; // Importez le CSS de Quill


export default function Postclass(props) {
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
  const [markdownPreview, setMarkdownPreview] = useState('');

  useEffect(() => {
		if (props.editMode == true){
      setLevel(props.course.level)
      setSubject(props.course.subject)
      setChapter(props.course.chapter)
      setQuestions(props.course.questions)
      setContent(props.course.content)
      setTitle(props.course.title)
      console.log(props.course)
    }
	  }, []); 

  function convertHtmlToMarkdown(html) {
    return turndownService.turndown(html);
  }

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
    // const markdownContent = convertHtmlToMarkdown(content);
    // Mettre à jour la prévisualisation Markdown
    setContent(content);
  };

  async function postDatas(){
    try {
      const db = getFirestore(app);
      const myCollection = collection(db, "Cours");
  
      const datas:Cours = {
        level: level,
        subject: subject,
        chapter: chapter,
        title: title,
        content: content,
        questions: questions,
      };
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000); // 
      console.log("Données à ajouter :", datas); // Ajoutez ceci pour vérifier les données à ajouter
  
      const docRef = await addDoc(myCollection, datas);
      console.log("Document ajouté avec ID :", docRef.id);
    } catch (erreur) {
      console.error("Erreur lors de l'ajout du document :", erreur);
    }
  }

  async function editDatas(){
    const db = getFirestore(app);
    const documentRef = doc(db, 'Cours', props.course.id); // Remplacez avec votre collection et ID de document

    const datas:Cours = {
      level: level,
      subject: subject,
      chapter: chapter,
      title: title,
      content: content,
      questions: questions,
    };

    console.log("Données à ajouter :", datas); // Ajoutez ceci pour vérifier les données à ajouter
  
    try {
      await updateDoc(documentRef, datas);
      console.log('Document mis à jour avec succès !');
      setShowAlert(true);
     setTimeout(() => {
       setShowAlert(false);
     }, 3000); // 
    } catch (erreur) {
      console.error('Erreur lors de la mise à jour du document :', erreur);
    }
  }

  return (
    <>
    {showAlert && (
        <Alert text="Opération réalisée avec succès" status="success"></Alert>
    )}
      <div id='step1' className="min-h-screen flex flex-col justify-center items-center">
        <form className="w-[50vw] flex flex-col items-center justify-center min-h-screen">
          <div className="flex flex-row justify-around mb-6 min-w-[100%]">
            <div>
              <label htmlFor="level" className='global_label'>Class</label>
              <select id="level" className="global_select" value={level} onChange={handleLevelChange}>
                <option>Select</option>
                <option>6e</option>
                <option>5e</option>
                <option>4e</option>
                <option>3e</option>
              </select>
            </div>
            <div>
              <label htmlFor="subject" className='global_label'>Subject</label>
              <select id="subject" className="global_select" value={subject} onChange={handleSubjectChange}>
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
              <label htmlFor="chapter" className='global_label'>Chapter</label>
              <select id="chapter" className="global_select" value={chapter} onChange={handleChapterChange}>
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
            <div className="mb-6 min-w-[100%]">
              <label htmlFor="Title" className='global_label' >Title</label>
              <input type="text" id="Title" className='global_input' value={title} onChange={handleTitleChange} placeholder="Titre du cours" required/>
            </div>
            <div className="mb-6 min-w-[100%]">
              <label htmlFor="conntent" className='global_label'>Content (markdown format)</label>
              <textarea wrap='hard' value={content} onChange={handleContentChange} id="content" className='global_input' rows={10} cols={50} placeholder="cours format markdown. Le markdown pur sera stocké puis mis en forme au moment de l'affichage sur l'app" required/>
              {/* <ReactQuill value={content} onChange={handleContentChange} /> */}
            </div>
            <LinkButton href="#quizzs" color="third" text="Prochaine étape"></LinkButton>
         </form>
      </div>
      <div>
      </div>
      <div id='quizzs' className="flex flex-col justify-center items-center min-h-screen">
        <form className="w-[50vw] flex flex-col items-center justify-center min-h-screen">
            <div className="mb-6 min-w-[100%]">
              <label htmlFor="rule" className='global_label'>Consigne</label>
              <input onChange={handleRule} value={rule} type="text" id="rule" className='global_input' placeholder="Énoncé de la question" required/>
            </div>
            <div className="mb-6 min-w-[100%]">
              <label htmlFor="Rightanswers" className='global_label'>Bonnes réponses</label>
              <input onChange={handleGoodanswers} value={goodanswers} type="text" id="Rightanswers" className='global_input' placeholder="Bonne(s) réponse(s). Séparées par des virgules." required/>
            </div>
            <div className="mb-6 min-w-[100%]">
              <label htmlFor="Wronganswers" className='global_label'>Mauvaises réponses</label>
              <input onChange={handleWronganswers} value={wronganswers} type="text" id="Wronganswers" className='global_input' placeholder="Mauvaise(s) réponse(s). Séparées par des virgules." required/>
            </div>
            <div className="flex self-end">
              <LinkButton href="#step1" color="third" text="Etape précédente"></LinkButton>
              <LinkButton href="#recap" color="third" text="Etape suivante"></LinkButton>
              <LinkButton onClick={addQuestion} color="green" text="Ajouter la question"></LinkButton>         
            </div>
        </form>
      </div>

      <div id='recap' className="min-h-screen p-4 flex flex-col items-center justify-center ">
        <h1 className='mb-5'>Récapitulatif du contenu</h1>
        <div className="flex justify-around w-1/2">
          <h3 className="flex"><FontAwesomeIcon className="w-3.5 h-3.5 mx-2" icon={faMedal} />{level}</h3>
          <h3 className="flex"><FontAwesomeIcon className="w-3.5 h-3.5 mx-2" icon={faFeather} />{subject}</h3>
          <h3 className="flex"><FontAwesomeIcon className="w-3.5 h-3.5 mx-2" icon={faBook} />{chapter}</h3>
        </div>
        <div className="w-[97%]">
          <h2 className="flex mb-3">{title}</h2>
          <ReactMarkdown className='markdown'>{content}</ReactMarkdown>
          {/* <p className="bg-lighterdark p-4 rounded-lg border break-words">{markdownPreview}</p> */}
        </div>
        <div className="flex justify-around flex-wrap w-[100%]">
          {questions.map((question, index) => (
            <QuestionCard index={index} question={question} deleteQuestion={deleteQuestion}></QuestionCard>
            ))}
        </div>
        <LinkButton onClick={postDatas} color="third" text="Poster ce contenu"></LinkButton>
        { props.editMode == true &&
          <LinkButton onClick={editDatas} color="third" text="Editer ce contenu"></LinkButton>
        }
      </div>
    </>
  );
}
