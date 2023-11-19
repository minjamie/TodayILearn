const fs = require('fs');
const { execSync } = require('child_process');
const cron = require('node-cron');

const templatePath = './TIL양식.MD';
cron.schedule('*/1 * * * *', () => {
console.log('node app 실행')
  // 현재 날짜 구하기
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const folderPath = `./${year}-${month}`;

  // 폴더가 존재하지 않으면 생성
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  // 파일명 생성
  const fileName = `${year}${month}${day}.md`;

  // 템플릿 파일 읽어오기
const template = fs.readFileSync(templatePath, 'utf-8');

const filledTemplate = template.replace(/{{year}}/g, year).replace(/{{month}}/g, month).replace(/{{day}}/g, day);
  const updatedTemplate = filledTemplate.replace(/\[0\]/g, match => {
    const count = Number(match.slice(1, -1));
    return `[${count + 1}]`;
  });


  // 템플릿에 날짜 삽입

  // 파일 생성
  fs.writeFileSync(`${folderPath}/${fileName}`, updatedTemplate);

  // Git 커밋 및 푸시
  execSync(`git add .`);
  execSync(`git commit -m "Add TIL (${year}-${month}-${day})"`);
  execSync('git push -u origin main');

  console.log('TIL 자동화 스크립트가 실행됩니다.');
});
