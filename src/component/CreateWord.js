import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import useFetch from "../hooks/useFetch";



export default function CreateWord(){

    const days = useFetch('http://localhost:3001/days');
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false); // isLoading 초기에는 false

    function onSubmit(e){
        // '저장'버튼 눌러도 페이지 새로고침 되지 않음.
        e.preventDefault();
        
        // 저장 시 로딩이 걸릴 수 있기에 작업이 진행 되는동안 
        // 다시 저장 버튼을 누르는 것을 방지하도록 기능 isLoading을 추가
        if(!isLoading){ 
        setIsLoading(true);
        
        fetch(`http://localhost:3001/words/`, 
        {
            method : 'POST', // insert
            headers : {
                'Content-Type' : 'application/json' 
            },
            body : JSON.stringify({ //JSON.stringify : json방식으로 변환

               // current를 사용하여 해당요소에 접근
               day : dayRef.current.value,
               eng : engRef.current.value,
               kor : korRef.current.value,
               isDone : false
            })
        }).then(res => {
            if(res.ok){ 
                alert('생성이 완료 되었습니다.')
                history.push(`/day/${dayRef.current.value}`)
                setIsLoading(false); // 모든 작업 완료 시 isLoading의 값을 false
            }
        })
    }
}

    // input의 값을 얻기 위해 
    // useRef라는 Hook 사용
    const engRef = useRef(null); // 초기값은 null
    const korRef = useRef(null);
    const dayRef = useRef(null);

    return( 
    <form onSubmit={onSubmit}>
        <div className="input_area">
            <label>Eng</label>
            <input type='text' placeholder="computer" ref={engRef}/>
        </div>
        <div className="input_area">
            <label>Kor</label>
            <input type='text' placeholder="컴퓨터" ref={korRef}/>
        </div>
        <div className="input_area">
            <label>Day</label>
            <select ref={dayRef}>
                {days.map(day =>(
                    <option key = {day.id} value = {day.day}>
                        {day.day}
                    </option>
                ))}
            </select>
        </div>
        <div className="input_area">
            {/*form 태그 감싸져 있어서 클릭 시 페이지가 새로고침됨*/}
            <button>저장</button>
        </div>
    </form>
    );
}