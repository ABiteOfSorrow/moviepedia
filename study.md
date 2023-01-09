1. readme.md 파일을 레포지토리에 미리 생성하면 오류가 발생함
    ex) 
    error: failed to push some refs to 'https://github.com/ABiteOfSorrow/moviepedia'
    hint: Updates were rejected because the tip of your current branch is behind
    hint: its remote counterpart. Integrate the remote changes (e.g.
    hint: 'git pull ...') before pushing again.
    hint: See the 'Note about fast-forwards' in 'git push --help' for details.

    해결방법 : git push -u origin +master  명령어 이용해서 강제 push
​
2. createdAt으로 만들어진 날짜는 숫자형식으로 되어 있기 때문에

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

new Date() 메소드릴 이용하여 날짜 형식으로 변환한 뒤 사용한다.
 - getMonth는 인덱스 0부터 시작하기 때문에 + 1을 해준다

var fullYear = now.getFullYear; 20xx년
 var year = now.getYear(); // 년
 var mon = (now.getMonth()+1); //월
 var date = now.getDate(); //일
 var day = now.getDay(); //요일
 var hour = now.getHours(); //시간
 var min = now.getMinutes(); //분
 var sec = now.getSeconds(); //초
 var milsec = now.getMilliseconds(); //밀리초