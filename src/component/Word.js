import { useState } from "react";

export default function Word(props){ // props로 word를 가져옴

    // 삭제 요청 후 ok 응답을 받으면 컴포넌트를 다시 렌더링하도록 함.
    const [word, setWord] = useState(props.word);

    //state 생성
    const [isShow, setIsShow] = useState(false);// 초기값은 false : 단어의 뜻을 처음에는 보여주지 않도록
    const [isDone, setIsDone] = useState(word.isDone); // 초기값은 data.json에 있는 words의 isDone 값

    function toggleShow(){
        setIsShow(!isShow); // 버튼을 클릭하면 현재 isShow값을 반대로 함
    }

    function toggleDone(){
        // setIsDone(!isDone); // 버튼을 클릭하면 현재 isDone값을 반대로 함
        // fetch 사용, 1번째 인자 : 주소, 2번째 인자 : 객체(요청의 옵션)
        fetch(`http://localhost:3001/words/${word.id}`, 
        {
            method : 'PUT',
            headers : {
                // 'Content-Type' : 보내는 리소스의 타입, json 형태로 보냄
                'Content-Type' : 'application/json' 
            },
            body : JSON.stringify({ //JSON.stringify : json방식으로 변환
                ...word, // 기존 데이터
                isDone : !isDone // isDone의 값만 바꿈
            })
        }).then(res => {
            if(res.ok){ // 응답이 ok 이면 State 변경
                setIsDone(!isDone)
            }
        })
    }

    function del(){
        if(window.confirm('삭제하시겠습니까?')){
            fetch(`http://localhost:3001/words/${word.id}`, 
            {
                method : 'DELETE' // 삭제는 특별히 값을 넘겨주는게 없으므로 method만 작성
            }).then(res =>{
                if(res.ok){
                    setWord({id : 0}); // 삭제되면 해당하는 word의 아이디를 0으로 세팅
                }
            })
        }
    }

    if(word.id === 0){
        return null; // id가 0인 것은 null로 반환
    }

    return(
    <tr className={isDone ? 'off' : ''}>
        <td>
            <input type='checkbox' checked={isDone}
            onChange={toggleDone}/>
        </td>
        <td>{word.eng}</td>
        <td>{isShow && word.kor}</td>
        <td>
            <button onClick={toggleShow}>뜻 {isShow ? '숨기기' : '보기'}</button>
            <button onClick={del} className="btn_del">삭제</button>
        </td>
    </tr>
    );
}