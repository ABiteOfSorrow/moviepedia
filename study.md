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

3. file input의 경우 value를 직접 설정할 수 없는 비제어 컴포넌트로 사용해야만 한다. 
    (해킹방지 아님 오류 발생)

4. 컴포넌트 상태에서 외부의 상태를 바꾸는걸 sideEffect라고 한다.

 useEffect(() => {
        
        if (!value) return;
                            // sideEffect
        const nextPreview = URL.createObjectURL(value);
        setPreview(nextPreview);

        // 정리함수 - sideEffect가 종료되면 초기화를 통히 정리를해준다. 
            (object가 더 이상 사용되지 않을때)
        return () => {
            setPreview();
            URL.revokeObjectURL(nextPreview);
        }

5. custom hook 
    - 자주 사용되는 함수를 custom hook으로 분리할 수 있다.
        hook 폴더로 따로 분리하여 관리하면 편하고 use로 시작하는 네이밍으로 사용 ex) useAsync

6. useCallback
    useEffect의 dependency로 재생성되는 함수를 넣어주면 랜더링이 반복되며 무한루프가 발생한다.
    이를 방지하지 위해 사용한다.

    재생성되는 함수 = arguments를 받아서 가공
    재사용되는 함수 = API 처럼 arguments를 받아서 일치하는 값만 반환 혹은 입력

    ex) 
    const handleLoad = useCallback(async (options) => {
        ----------
    }, [-dependency-])

    dependency가 변하지 않으면 함수를 재생성이 아니라 재사용을 한다.
    dependency에는 api를 호출하는 함수 등을 넣어주고 
    useState의 setter는 리액트의 기본 기능이므로 넣어 줄 필요 없다.

    