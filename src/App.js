import Day from './component/Day';
import DayList from './component/DayList';
import Header from './component/Header';
// react-router-dom@5.2.0 설치한 후 import
import {BrowserRouter, Route, Switch} from 'react-router-dom' 
import EmptyPage from './component/EmptyPage';

// json server : 빠르고 쉽게 REST API 구축
// REST API : url 주소와 메서드로 CRUD 요청을 함
// Create : POST, Read : GET, Update : PUT, Delete : DELETE, data.json에도 적용이 되도록 가능함

function App() {
  return (
    // App 전체를 BrowserRouter로 감싼다
    <BrowserRouter>
    <div className="App">
      {/* Header는 모든 페이지에 표시되야 하므로 
      Header다음 부분을 Switch로 감싼다 */}
      <Header/> 
      {/* Switch로 감싼 부분은 url에 따라 각각 다른 페이지를 보여줌 */}
      <Switch>
        {/* exact를 사용해서 정확하게 '/' 입력되었을 때 DayList 컴포넌트만 렌더링 */}
        <Route exact path='/'> 
          <DayList/>
        </Route>
        <Route path='/day/:day'>
          <Day/>
        </Route>

        {/*앞에 있는 조건이 만족하지 않으면 해당 페이지를 보여줌
          만약 제일 위에 위치한다면 EmptyPage 컴포넌트만 보여주게 되므로
          주의*/}
        <Route>
          <EmptyPage/>
        </Route>
        
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
