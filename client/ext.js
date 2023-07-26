import { marked } from 'marked';
import unip from 'universal-emoji-parser';

/** @type {import("marked").marked.MarkedExtension} */
const ext = {
  extensions: [
    {
      name: "emoji",
      level: "block",
      start(src){
        return src.indexOf("\n")
      },
      tokenizer(src){
        // console.log(src)
        const pattern = /:\w*:/;
        const match = pattern.exec(src);
        // console.log(match)
        if (match) {    
          return {
            type: 'emoji',
            raw: match[0],
            html: ''
          };
        }
        return false
      },
      renderer(token){
        if (token.type === 'emoji') {
          return token.html
        } 
        return false;
      }
    }
  ],
  walkTokens(token){
    if (token.type === 'emoji') {
      token.html = unip.parseToUnicode(token.raw);
    }
  }
}

marked.setOptions({mangle:false,headerIds: false })
marked.use(ext);

// marked.parse("sdfsdfsdf :heart: ");
console.log(marked.parse('# sdfsdfdsdfsdfsdf\n' +
'\n' +
'sdfsddsfdssdf\n' +
'- [ ] dfg\n' +
'- [x] sdfsdfs3\n' +
'\n' +
'```js\n' +
'const e = "sdfsd";\n' +
'\n' +
'function sdfsd(){\n' +
'}\n' +
'```\n' +
'\n' +
"<script>alert('sdfdfg')</script>\n" +
'\n' +
'- sdf\n' +
'- fsdfd\n' +
':ph:'
));
