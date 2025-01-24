import KidIntroduction from '../../../assets/KidIntroduction.png'
import cellPhone from '../../../assets/cellPhone.png'
import ButtonComponent from '../../button/ButtonComponent'
import './Intro.css'
function Intro(){
    return(
        <div className="Introduction">
            <div className="Container1">
                <img src={KidIntroduction} className='KidIntroduction'></img>
                <p className="paragraph1">O EducaMundo é um aplicativo intuitivo e fácil de usar, projetado para apoiar pais, mães e profissionais da educação no trabalho com crianças autistas.</p>
            </div>
            <div className='Container2'>
                <img src={cellPhone} className='CellPhone'></img> 
                <p>O EducaMundo oferece exemplos e dicas de atividades e vídeos para serem trabalhados no ambiente escolar ou em casa.</p>
            </div>
            <ButtonComponent toComponent="/Services" text="Clique Aqui" className='Button'/>
        </div>
    )
}

export default Intro;