//api가 구성되어 있으므로 dummy를 지움
// import dummy from "../db/data.json";
//:day값을 받기 위해 useParams Hook을 사용!!!
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import Word from "./Word";

export default function Day(){

    const day = useParams().day; // 숫자가 아닌 문자값을 받음
   
    // filter(특정 조건을 만족하는 원소들만 쉽게 분류) 적용
    // const wordList = dummy.words.filter(word => (
    //     // 문자와 숫자를 비교하여서 filter에 아무 값도 찍히지 않음
    //     // word.day 숫자
    //     // day 문자
    //     word.day === Number(day)
    // ))
    // const [words, setWords] = useState([]);

    // // fetch로 리스트를 가져와서 
    // // json 응답으로 set을 해준다.
    // useEffect(() => {
    //     fetch(`http://localhost:3001/words?day=${day}`)
    //     .then(res=>{
    //         return res.json();
    //     })
    //     .then(data => {
    //         setWords(data);
    //     })
    // }, [day]);

    // Custom Hooks 적용 >>  반복되는 코드가 있다면 코드를 간결하게 만들 수 있음
    const words =  useFetch(`http://localhost:3001/words?day=${day}`); 

   

    return(
    <>
    <h2>Day {day}</h2>
    {/* 느린 인터넷 환경 사용시 로딩화면 출력 */}
    {words.length === 0 && <span>Loading... 중이거나 해당 일에 단어가 등록되어 있지 않습니다.</span>}
    <table>
        <tbody>
            {words.map(word =>(

            <Word word={word} key = {word.id}/>
            
            ))}
           
        </tbody>
    </table>
    
    
    </>);
}