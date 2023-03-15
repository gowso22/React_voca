import { useHistory } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function CreateDay(){

    const days = useFetch('http://localhost:3001/days');
    const history = useHistory();
    function addDay(){
        fetch(`http://localhost:3001/days/`, 
        {
            method : 'POST', // insert
            headers : {
                'Content-Type' : 'application/json' 
            },
            body : JSON.stringify({ //JSON.stringify : json방식으로 변환
               // current를 사용하여 해당요소에 접근
               // id >> 자동생성
               day : days.length+1,
            })
        }).then(res => {
            if(res.ok){ 
                alert('생성이 완료 되었습니다.')
                history.push('/')
            }
        })
    }

    return (
    <div>
        <h3> 현재 일수 : {days.length}일</h3>
        <button onClick={addDay}>Day 추가</button>
    </div>
    );
}