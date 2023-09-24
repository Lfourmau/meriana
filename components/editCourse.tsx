import Link from 'next/link';
import LinkButton from './linkButton';


export default function EditCourse(props){
	return (
		<>
			<p>{props.course.title}</p>
			<LinkButton onClick={props.onClick} text="go back"></LinkButton>
		</>
	)
}