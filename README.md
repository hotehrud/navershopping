# 2016.01.18 네이버 쇼핑 파트너존 DB URL

### 네이버 쇼핑 파트너존 기술 문서

* mygumi = {}
 * 메인 객체

* variable = {}
 * 전역으로 사용하기 위한 역할. (공유 객체)

* mygumi.init
 * 필요한 요소 셋팅 및 프로세스가 시작되는 초기 단계 역할.
   * essential
     > 필수 컬럼 속성과 값을 가진 객체
   * esIndexArray
     > 필수 컬럼의 인덱스를 가진 배열
* mygumi.start
 * 실제 시작 부분
   * manualExecFnc
     > 이벤트 관련 함수를 초기 로드가 아닌 선택적으로 원하는 지점에서 로드할 함수명을 넣을 배열
   * mygumi.async.readTsvFile
     > 비동기를 통해 tsv 파일을 먼저 읽어들인 후 콜백을 통해 실행될 함수 처리

* mygumi.event
 * 이벤트 관련 집합체 - event = {}
   * autoEvent - 초기에 로드할 이벤트들
     * addRowEvent
       > 행 추가

     * deleteRow
       > 행 삭제

     * changeId
       > id 컬럼의 각 행의 값이 변경될 경우를 위함

     * additionTool
       > 부가기능 버튼 노출 여부

     * additionToolAutoInsert
       > 특정 컬럼의 각 행에 원하는 데이터 자동삽입 입력

     * scrollAutoDisplay
       > 가로 스크롤 시 title 컬럼 고정 노출

       > 세로 스크롤 시 header 영역 고정 노출

   * manualEvent - 원하는 지점에서 로드할 이벤트들
     * downloadTsvFile
       > 서버에 있는 tsv 파일 다운로드

     * saveTsvFile
       > 현재 데이터를 기준으로 tsv 업로드

     * cssEvent
       * displayConvert
         > display none or block

         > class명 - inactive, active 활용

       * fixedSetting
         > position fixed 적용

         > class명 - fixed 활용

   * autoEventFnc
     > autoEvent 안에 있는 이벤트들을 자동 로드

   * manualEventFnc
     > 이벤트 선택 로드 함수 - 전달인자로 들어온 배열을 활용해서 원하는 이벤트 로드

 * tsvArrayConvert
   > 테이블에 있는 형식을 배열 형태로 변환 후 tsvStringConvert로 전달

 * tsvStringConvert
   > 변환된 배열 형태를 tsv 형식으로 변환

 * tsvFileConvert
   > tsv 형식으로 만들어진 데이터를 tsv 파일로 변환

 * certainAutoInsert
   > 특정 컬럼의 각 행에 원하는 데이터 자동삽입 기능

* mygumi.async
  * 비동기 처리
    * readTsvFile
      > 초기 화면에 뿌려주기 위한 tsv 파일 읽어들이는 ajax

    * writeTsvFile
      > tsv 파일 업로드를 위한 ajax

* mygumi.valid
  * 유효 검증 - valid = {}
    * essentialCheck
       > 필수 컬럼에 대한 공백 상태 확인

  * moveFocus
    > 필수 컬럼이 공백일 시 포커스 이동

* mygumi.dom
  * dom 관련 처리 - dom = {}
    * createInitTable
      > tsv 파일에 있는 전체 데이터에 관한 테이블 dom 생성

    * addRow
      > 추가되는 행에 관한 dom 생성

    * firstRowSetting
      > 첫행 컬럼들에 대해 변경하지 못하도록 readonly 적용

    * firstRowCreate
      > 세로 스크롤 시 고정 첫행에 대한 테이블 dom 생성

    * titleColCreate
      > 가로 스크롤 시 고정 title 영역 dom 생성

  * getColIndex
    > 컬럼을 활용하기 위한 해당 컬럼 인덱스 반환

---
`junghyun`