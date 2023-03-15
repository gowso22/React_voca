import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
// api가 구성되어 있으므로 dummy를 지움
//mport dummy from '../db/data.json';



export default function DayList(){
   // const [days, setDays] = useState([]); // 초기값은 빈 배열, api에서 list를 가져와서 바꾸는 방식
    
    // useEffect(): 어떤 상태값이 바뀌었을 때 동작하는 함수를 작성가능하도록 함
    //              상태값이 변경된 다음에 다시 렌더링 되어서 호출됨
    //              첫번째 매개변수로 함수를 넣음
    //              두번째 매개변수로 배열을 넣음(의존성 배열)
    //              의존성 배열의 값이 변경 되는 경우에만 해당함수 실행되도록 함.
    //              렌더링 되고 한번만 실행되는 작업이라면 빈 배열을 넣도록 함.
    // useEffect(() => {
    //     // api 비동기 통신을 위해 fetch() 사용
    //     // api 경로 작성, promise 반환
    //     // then 이용하여 작성
    //     // res >> http 응답이므로 json()메서드 사용
    //     fetch('http://localhost:3001/days')
    //     .then(res=>{
    //         return res.json();
    //     })
    //     .then(data => {
    //         setDays(data);
    //     });
    // }, []);

    // Custom Hooks 적용
    
    const days = useFetch('http://localhost:3001/days');
     // 느린 인터넷 환경 사용시 로딩화면 출력 초기에 days는 빈배열이므로 데이터 불러오기 도중 상태 표시
    if(days.length === 0 ){
        return <h2>Loading...</h2>
    }

    return (
        // 반복문을 map을 이용하여 작성
        <ul className = "list_day">
            {days.map(day => (
                // 반복되는 요소에 고유한 key값이
                // 필요하다는 console 창에 경고메세지가 뜸
                <li key = {day.id}>
                    {/* a태그의 href 대신
                        Link태그의 to를 사용 
                        개발자 도구에서는 a태그로 확인됨*/}
                    <Link to={`/day/${day.day}`}>
                        Day {day.day}
                    </Link>
                </li>
            ))}
        </ul>
    );
}