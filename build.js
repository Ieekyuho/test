const fs = require('fs');

// 1. app.js 번들링 -> index.html (오리지널 민트 시안)
const appJs = fs.readFileSync('app.js', 'utf8');
let html = fs.readFileSync('index.html', 'utf8');

const babelScriptStart = html.indexOf('<script type="text/babel">');
const babelScriptEnd = html.indexOf('</script>', babelScriptStart);

if (babelScriptStart === -1 || babelScriptEnd === -1) {
  console.error('Could not find babel script tag in index.html');
  process.exit(1);
}

const newHtml = html.slice(0, babelScriptStart) + 
  '<script type="text/babel">\n' + 
  appJs + 
  '\n</script>' + 
  html.slice(babelScriptEnd + '</script>'.length);

fs.writeFileSync('index.html', newHtml, 'utf8');
console.log('Successfully bundled app.js into index.html! New length:', newHtml.length);

// 2. 로즈 모브 핑크(#B4939E, #F4EBEE) 테마 자동 변환 -> pink.html (로즈 핑크 시안)
let pinkHtml = newHtml;

// 타이틀 변경
pinkHtml = pinkHtml.replace(
  '<title>위드케어 (WithCare) - 대전 의료전공 대학생 병원 동행서비스</title>',
  '<title>위드케어 (WithCare) - 대전 의료전공 대학생 병원 동행서비스 (로즈 핑크 시안)</title>'
);

// Tailwind config brand 색상
pinkHtml = pinkHtml.replace(
  /DEFAULT: '#6edfec',\s*hover: '#5cd4e2',\s*dark: '#0bbecb',\s*light: '#e8fbfd'/,
  "DEFAULT: '#B4939E',\n              hover: '#9c7c87',\n              dark: '#906b77',\n              light: '#F4EBEE'"
);

// 로딩 스피너 및 셀렉션 색상
pinkHtml = pinkHtml.replace('border-top-color: #0284c7;', 'border-top-color: #B4939E;');
pinkHtml = pinkHtml.replace('selection:bg-sky-500', 'selection:bg-[#B4939E]');
pinkHtml = pinkHtml.replace(/selection:bg-\[#6edfec\]\/40/g, 'selection:bg-[#B4939E]/40');

// 메인 포인트 컬러 교체 (#6edfec -> #B4939E, #0bbecb -> #906b77 등)
pinkHtml = pinkHtml.replace(/#6edfec/g, '#B4939E');
pinkHtml = pinkHtml.replace(/#0bbecb/g, '#906b77');
pinkHtml = pinkHtml.replace(/#5cd4e2/g, '#9c7c87');
pinkHtml = pinkHtml.replace(/#5ce1e6/g, '#B4939E');
pinkHtml = pinkHtml.replace(/#e8fbfd/g, '#F4EBEE');

// 지도 강줄기 SVG (블루 -> 로즈 핑크 파스텔 톤)
pinkHtml = pinkHtml.replace(/stroke="#bae6fd"/g, 'stroke="#ebdbe0"');
pinkHtml = pinkHtml.replace(/stroke="#7dd3fc"/g, 'stroke="#d6b6c0"');

// 배너 그라데이션 및 텍스트 톤 보정
pinkHtml = pinkHtml.replace(/from-sky-50 via-cyan-50 to-blue-50/g, 'from-[#F4EBEE] via-pink-50 to-rose-50');
pinkHtml = pinkHtml.replace(/from-sky-50 via-cyan-50 to-emerald-50/g, 'from-[#F4EBEE] via-pink-50 to-rose-50');
pinkHtml = pinkHtml.replace(/text-sky-800/g, 'text-[#6d4855]');

// 헤더 전환 링크: pink.html에서는 민트 시안(index.html)으로 이동할 수 있도록 치환
pinkHtml = pinkHtml.replace(
  'href="pink.html"\n                id="theme-switch-link"\n                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-[#F4EBEE] hover:bg-[#ebdbe0] text-[#8e6673] border border-[#B4939E]/40 transition shadow-2xs cursor-pointer"\n                title="로즈 핑크 테마 시안 보기"\n              >\n                <span className="w-2 h-2 rounded-full bg-[#B4939E]"></span>\n                <span>핑크 시안</span>',
  'href="index.html"\n                id="theme-switch-link"\n                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-[#e8fbfd] hover:bg-[#d5f7fa] text-[#0bbecb] border border-[#6edfec]/40 transition shadow-2xs cursor-pointer"\n                title="민트 테마 시안 보기"\n              >\n                <span className="w-2 h-2 rounded-full bg-[#6edfec]"></span>\n                <span>민트 시안</span>'
);

pinkHtml = pinkHtml.replace(
  'href="pink.html"\n              id="mobile-theme-link"\n              className="px-2 py-1 rounded-lg text-[11px] font-black bg-[#F4EBEE] text-[#8e6673] border border-[#B4939E]/40 cursor-pointer"\n            >\n              핑크시안',
  'href="index.html"\n              id="mobile-theme-link"\n              className="px-2 py-1 rounded-lg text-[11px] font-black bg-[#e8fbfd] text-[#0bbecb] border border-[#6edfec]/40 cursor-pointer"\n            >\n              민트시안'
);

fs.writeFileSync('pink.html', pinkHtml, 'utf8');
console.log('Successfully generated pink.html! Length:', pinkHtml.length);
