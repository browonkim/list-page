# Law & Good FE Assignments

### 프로젝트 개요

1. 프로젝트는 Vue3, Vue-Cli, Typescript, Sass(+css) 를 기반으로 하였습니다.

### 프로젝트 초기 설정

1. node.js가 설치되어 있는 지 확인합니다. node.js가 없을 경우 설치합니다.
2. node.js를 설치하면 npm(node package manager)도 같이 설치가 됩니다.
3. 터미널에 `npm install` 명령어를 입력하여 현재 프로젝트가 의존하고 있는 모듈들을 설치합니다. 해당 모듈들은 package.json에서 확인할 수 있습니다.
4. 터미널에 `npm run serve` 명령어를 입력하면 vue-dev 서버가 local 환경에서 실행됩니다.

### 구현 항목

* 요구사항에 따라 CSS 및 UI 관련 라이브러리를 사용하지 않았습니다.
* Modal 의 경우 Vue3 의 Teleport 기능을 활용해보았습니다. ([참고했던 문서](https://vuejs.org/guide/built-ins/teleport.html))
* Edit나 Add를 담당하는 ItemModal은 Emit과 Prop을 이용한 컴포넌트간 통신을 활용했습니다.
* Delete 확인창인 DeleteCaution은 Promise의 reject, resolve를 이용해 처리해보았습니다.
* 전역으로 사용하는 스타일은 `assets/styles.sass`파일에 저장하고, 컴포넌트 안에서만 사용될 스타일은 vue SFC(Single File Component)
  의 `<style scoped lang="sass">`안에 지정했습니다. 이렇게 해서 각 컴포넌트의 스타일이 다른 컴포넌트에(특히 부모 자식간) 예상하지 못한 영향을 끼치는 것을 막고자했습니다.
* 구현한 항목에 따라 git commit을 쪼개려고 노력했습니다.
* typescript와 Vue Composition API를 써서 기능을 구현했습니다.

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Run your end-to-end tests

```
npm run test:e2e
```

### Lints and fixes files

```
npm run lint
