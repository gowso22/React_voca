import {Link} from "react-router-dom";

// 명시되지 않은 주소로 이동하면 보여줄 컴포넌트
export default function EmptyPage(){
    return(
        <>
            <h2>잘못된 접근입니다.</h2>
            <Link to = '/'>돌아가기</Link>
        </>
    );
}