# Important notes for this app.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.5.

## Quill installation,

1. Run  `  npm install --save quill`
2. Run  `  npm install --save ngx-quill`
3. Do the `import { QuillModule } from 'ngx-quill';`
4. Do the `imports: [QuillModule.forRoot()],`

`________________________________________________________________`

## In styles.scss

`@import '~quill/dist/quill.core.css';`

`@import '~quill/dist/quill.bubble.css';`

`@import '~quill/dist/quill.snow.css';`


## In the compont do this.

`<quill-editor [(ngModel)]="contentBody"></quill-editor>`







