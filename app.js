/* Software Engineering Visual Lab — dependency-free, accessible slide presentation.
   All data and demonstrations are fictional classroom examples. */
'use strict';

const slides = [...document.querySelectorAll('.slide')];
let current = 0;
const byId = id => document.getElementById(id);
const pad = n => String(n).padStart(2, '0');
let toastTimer;
function toast(message) {
  const el = byId('toast');
  el.textContent = message;
  el.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('visible'), 2200);
}

function showSlide(index, updateUrl = true) {
  const target = Math.max(0, Math.min(slides.length - 1, Number(index) || 0));
  if (target !== current) {
    slides[current].classList.remove('active');
    slides[current].setAttribute('aria-hidden', 'true');
  }
  current = target;
  const slide = slides[current];
  slide.classList.add('active');
  slide.setAttribute('aria-hidden', 'false');
  slide.scrollTop = 0;
  const label = `${pad(current + 1)} / ${pad(slides.length)}`;
  byId('slideCounter').textContent = label;
  byId('progressLabel').textContent = `${current + 1} / ${slides.length}`;
  byId('chapterText').textContent = slide.dataset.chapter || 'Introduction';
  byId('bottomChapter').textContent = slide.dataset.chapter || 'Introduction';
  byId('slideProgress').firstElementChild.style.width = `${(current + 1) / slides.length * 100}%`;
  byId('prevBtn').disabled = current === 0;
  byId('nextBtn').disabled = current === slides.length - 1;
  byId('notesSlideTitle').textContent = `${pad(current + 1)}. ${slide.dataset.title || 'Slide'}`;
  byId('notesContent').textContent = slide.dataset.note || 'Explain the current concept using the visual as a guide.';
  document.querySelectorAll('.outline-link').forEach((item) => {
    item.classList.toggle('active', Number(item.dataset.goto) === current);
    if (Number(item.dataset.goto) === current) item.setAttribute('aria-current', 'step');
    else item.removeAttribute('aria-current');
  });
  if (updateUrl) history.replaceState(null, '', `${location.pathname}${location.search}#slide-${current + 1}`);
}

function nextSlide() { showSlide(current + 1); }
function previousSlide() { showSlide(current - 1); }
byId('nextBtn').addEventListener('click', nextSlide);
byId('prevBtn').addEventListener('click', previousSlide);
document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => {
  if (button.dataset.go === 'next') nextSlide();
  if (button.dataset.go === 'first') showSlide(0);
}));

const panels = { outline: byId('outlinePanel'), notes: byId('notesPanel') };
let openPanel = null;
function closePanels() {
  Object.values(panels).forEach(panel => { panel.classList.remove('open'); panel.setAttribute('aria-hidden', 'true'); });
  byId('overlay').hidden = true;
  openPanel = null;
}
function togglePanel(type) {
  if (openPanel === type) return closePanels();
  closePanels();
  panels[type].classList.add('open');
  panels[type].setAttribute('aria-hidden', 'false');
  byId('overlay').hidden = false;
  openPanel = type;
  if (type === 'outline') panels[type].querySelector('.outline-link.active')?.scrollIntoView({block: 'nearest'});
}
byId('notesBtn').addEventListener('click', () => togglePanel('notes'));
byId('outlineBtn').addEventListener('click', () => togglePanel('outline'));
byId('overlay').addEventListener('click', closePanels);
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', closePanels));

function createOutline() {
  const root = byId('outlineList');
  let groupTitle = '';
  let group = null;
  slides.forEach((slide, idx) => {
    const chapter = slide.dataset.chapter || 'Introduction';
    if (chapter !== groupTitle) {
      groupTitle = chapter;
      group = document.createElement('div'); group.className = 'outline-group';
      const heading = document.createElement('h4'); heading.textContent = chapter;
      group.appendChild(heading); root.appendChild(group);
    }
    const btn = document.createElement('button');
    btn.className = 'outline-link';
    btn.dataset.goto = idx;
    const number = document.createElement('span'); number.textContent = pad(idx + 1);
    const title = document.createElement('b'); title.textContent = slide.dataset.title;
    btn.append(number, title);
    btn.addEventListener('click', () => { showSlide(idx); closePanels(); });
    group.appendChild(btn);
  });
}
createOutline();

byId('fullscreenBtn').addEventListener('click', toggleFullScreen);
async function toggleFullScreen() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch (error) { toast('Fullscreen may be blocked by the browser.'); }
}
function resetCurrentDemo() {
  const active = slides[current];
  if (active.querySelector('#dfdNext')) resetDfd();
  else if (active.querySelector('#scrumBoard')) resetBoard();
  else if (active.querySelector('#tddCode')) selectTdd(0);
  else if (active.querySelector('#pairSwitch')) resetPair();
  else if (active.querySelector('#dodChecklist')) resetDod();
  else if (active.querySelector('#decisionOptions')) resetDecision();
  else if (active.querySelector('.quiz')) resetQuiz(active);
  else if (active.querySelector('#contextDfd')) selectContext('register');
  else if (active.querySelector('#xpCycle')) selectXpStep(0);
  else if (active.querySelector('#ciStatus')) selectCi(0);
  else { toast('No interactive demo to reset on this slide.'); return; }
  toast('Demo reset');
}
document.addEventListener('keydown', event => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === 'Escape' && openPanel) { closePanels(); return; }
  if (openPanel) return;
  const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);
  if (isInput) return;
  const isButton = document.activeElement?.tagName === 'BUTTON';
  if (event.key === 'ArrowRight' || event.key === 'PageDown' || (event.code === 'Space' && !isButton)) { event.preventDefault(); nextSlide(); }
  else if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); previousSlide(); }
  else if (event.key === 'Home') { event.preventDefault(); showSlide(0); }
  else if (event.key === 'End') { event.preventDefault(); showSlide(slides.length - 1); }
  else if (event.key.toLowerCase() === 'g') togglePanel('outline');
  else if (event.key.toLowerCase() === 'p') togglePanel('notes');
  else if (event.key.toLowerCase() === 'f') toggleFullScreen();
  else if (event.key.toLowerCase() === 'r') resetCurrentDemo();
});
let touchStart = null;
byId('presentation').addEventListener('touchstart', ev => {
  if (ev.touches.length === 1) touchStart = { x: ev.touches[0].clientX, y: ev.touches[0].clientY };
}, {passive:true});
byId('presentation').addEventListener('touchend', ev => {
  if (!touchStart) return;
  const dx = ev.changedTouches[0].clientX - touchStart.x;
  const dy = ev.changedTouches[0].clientY - touchStart.y;
  if (Math.abs(dx) > 80 && Math.abs(dy) < 45 && !(ev.target.closest('button, input, a'))) dx < 0 ? nextSlide() : previousSlide();
  touchStart = null;
}, {passive:true});
window.addEventListener('hashchange', () => {
  const match = location.hash.match(/^#slide-(\d+)$/);
  if (match && Number(match[1]) - 1 !== current) showSlide(Number(match[1]) - 1, false);
});

// DFD symbols
const symbolDetails = {
  entity: ['EXTERNAL ENTITY', 'A person, organization, or outside system that sends information to the system or receives it.', 'Example: A receptionist provides patient details to MediLab.'],
  process: ['PROCESS', 'An activity that uses input data and transforms it into meaningful output data.', 'Example: Register Patient checks an input and creates a patient record.'],
  store: ['DATA STORE', 'Information kept for later reading or updating, such as a file or database.', 'Example: D1 — Patient Records stores registered patient information.'],
  flow: ['DATA FLOW', 'A named, directional movement of information between permitted DFD components.', 'Example: “Test result” moves from the lab technician into a recording process.']
};
document.querySelectorAll('[data-symbol]').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('[data-symbol]').forEach(x => x.classList.toggle('selected', x === btn));
  const [category, definition, example] = symbolDetails[btn.dataset.symbol];
  const panel = byId('symbolDetail'); panel.children[0].textContent = category;
  panel.children[1].textContent = definition; panel.children[2].textContent = example;
}));

// Context diagram selector
const contexts = {
  register: ['Receptionist → MediLab', 'The receptionist supplies a new patient’s identifying details. The system can validate and save them internally.'],
  request: ['Receptionist → MediLab', 'The receptionist requests a CBC blood test for the patient. This is order information, not the final result.'],
  worklist: ['MediLab → Lab technician', 'The system sends the list of requested tests so the technician knows what must be performed.'],
  result: ['Lab technician → MediLab', 'After the test, the technician submits results that the system must validate and record.'],
  report: ['MediLab → Patient', 'The system sends the completed lab report to the patient. The internal details are hidden at context level.']
};
function selectContext(path) {
  document.querySelectorAll('#contextDfd [data-path]').forEach(g => g.classList.toggle('selected', g.dataset.path === path));
  document.querySelectorAll('#contextChoices [data-path]').forEach(b => b.classList.toggle('active', b.dataset.path === path));
  const [title, detail] = contexts[path];
  byId('contextExplain').innerHTML = `<b>${title}</b><p>${detail}</p>`;
}
document.querySelectorAll('#contextChoices [data-path]').forEach(b => b.addEventListener('click', () => selectContext(b.dataset.path)));

// DFD patient data simulation
const dfdSteps = [
  { title:'Ready to begin', body:'Our sample patient, Sarah, arrives for a blood test. Start the simulation to watch her information move.', payload:'{ "patient": "Sarah", "test": "CBC" }', nodes:[] },
  { title:'1 · Enter patient data', body:'Reception enters Sarah’s details. The registration process receives the information and checks it.', payload:'{ "name": "Sarah", "age": 23 }', nodes:['reception','register'] },
  { title:'2 · Save patient record', body:'The register-patient process creates an ID and stores Sarah’s validated details in D1.', payload:'{ "patientId": "P-104", "saved": true }', nodes:['register','patientdb'] },
  { title:'3 · Create the test order', body:'The system creates a CBC test request for patient P-104. The order would be retained in the test-request store D2.', payload:'{ "patientId":"P-104", "test":"CBC" }', nodes:['order'] },
  { title:'4 · Perform the lab test', body:'A technician receives the work request and submits the test measurements back to the system.', payload:'{ "test":"CBC", "value":"sample" }', nodes:['lab'] },
  { title:'5 · Record the results', body:'The results process validates the submitted measurements and stores them in D3. No direct entity-to-store connection.', payload:'{ "patientId":"P-104", "status":"complete" }', nodes:['results'] },
  { title:'6 · Generate and send report', body:'The report process reads the relevant saved data, creates a report, and delivers it to Sarah.', payload:'{ "reportId":"R-018", "ready":true }', nodes:['report','patient'] }
];
let dfdStep = 0;
function renderDfd() {
  const step = dfdSteps[dfdStep];
  byId('dfdStepCount').textContent = `STEP ${dfdStep} / ${dfdSteps.length-1}`;
  byId('dfdSimTitle').textContent = step.title;
  byId('dfdSimText').textContent = step.body;
  byId('dfdPayload').textContent = step.payload;
  document.querySelectorAll('[data-sim-node]').forEach(node => node.classList.toggle('lit', step.nodes.includes(node.dataset.simNode)));
  byId('dfdNext').textContent = dfdStep === dfdSteps.length - 1 ? '↺ Run again' : 'Next data movement →';
}
function resetDfd() { dfdStep = 0; renderDfd(); }
byId('dfdNext').addEventListener('click', () => { dfdStep = (dfdStep + 1) % dfdSteps.length; renderDfd(); });
byId('dfdReset').addEventListener('click', resetDfd);
renderDfd();

// Quiz behavior: repeatable and screen-reader friendly
function resetQuiz(section) {
  section.querySelectorAll('.quiz-option').forEach(b => { b.classList.remove('correct','incorrect'); b.disabled=false; });
  section.querySelector('.quiz-feedback').textContent = 'Select an answer to test yourself.';
}
document.querySelectorAll('.quiz').forEach(quiz => {
  quiz.querySelectorAll('[data-option]').forEach(option => option.addEventListener('click', () => {
    const right = Number(option.dataset.option) === Number(quiz.dataset.correct);
    quiz.querySelectorAll('[data-option]').forEach(btn => btn.classList.remove('correct','incorrect'));
    option.classList.add(right ? 'correct' : 'incorrect');
    if (!right) quiz.querySelector(`[data-option="${quiz.dataset.correct}"]`).classList.add('correct');
    const feedback = quiz.parentElement.querySelector('.quiz-feedback');
    feedback.textContent = right ? '✓ Exactly. The data store holds information for later use.' : 'The correct answer is C · Data store. A process changes data; a store holds it.';
  }));
});

// XP development cycle
const xpCycle = [
  ['STEP 01 / CUSTOMER STORY', '“As a receptionist, I want to see if a report is ready.”', 'This is a small user need, written in everyday language. We begin with a real problem rather than a long technical specification.', '✍'],
  ['STEP 02 / PLAN A SMALL CHANGE', 'Choose a small, valuable story.', 'The customer prioritizes “report status.” Developers estimate the work and choose a small slice that can be completed soon.', '◫'],
  ['STEP 03 / CODE AND TEST', 'Build the feature with quality from the start.', 'Developers write tests, implement behavior, review together, refactor, and integrate frequently.', '&lt;/&gt;'],
  ['STEP 04 / SMALL RELEASE', 'Put a working improvement in users’ hands.', 'The new pending/completed status is available to lab staff, subject to the system’s release process.', '↗'],
  ['STEP 05 / FAST FEEDBACK', 'Listen to what users learn by using it.', 'Staff explain which labels are confusing. The team turns feedback into the next small story.', '↺']
];
function selectXpStep(i) {
  document.querySelectorAll('[data-xp-step]').forEach(b => b.classList.toggle('active', Number(b.dataset.xpStep) === i));
  const [kicker, title, description, icon] = xpCycle[i];
  byId('xpCycleInfo').innerHTML = `<div><span class="detail-kicker">${kicker}</span><h3>${title}</h3><p>${description}</p></div><span class="cycle-art">${icon}</span>`;
}
document.querySelectorAll('[data-xp-step]').forEach(btn => btn.addEventListener('click', () => selectXpStep(Number(btn.dataset.xpStep))));

// Traditional / classic XP practices, with modern terminology clarified in speaker notes.
const practices = [
  ['Planning game', 'Customers choose priorities; developers estimate the effort.', 'Lab staff prioritize “pending / completed status” and the team plans the next small delivery.', 'COLLABORATION'],
  ['Small releases', 'Deliver useful improvements in frequent, small batches.', 'Release status tracking first; add SMS notifications later.', 'DELIVERY'],
  ['System metaphor', 'Use a shared, simple story to explain the system’s design.', 'Everyone thinks of the software as a digital lab desk and report pipeline.', 'SHARED LANGUAGE'],
  ['Simple design', 'Do what solves the current need without unnecessary complexity.', 'Use a clear status field rather than building an elaborate workflow engine immediately.', 'ENGINEERING'],
  ['Testing', 'Write and automate checks for expected behavior.', 'A test checks that a completed report displays “Ready.”', 'QUALITY'],
  ['Refactoring', 'Improve code structure while preserving behavior.', 'Rename confusing methods and remove duplication after tests pass.', 'MAINTAINABILITY'],
  ['Pair programming', 'Two developers work together on the same code.', 'One codes the report feature while the other reviews edge cases.', 'TEAMWORK'],
  ['Collective ownership', 'All team members can improve shared code.', 'Any developer can fix the report module rather than waiting for one specialist.', 'TEAMWORK'],
  ['Continuous integration', 'Combine code frequently and run automated checks.', 'Every small change runs a build and tests before it joins the main code.', 'QUALITY'],
  ['Sustainable pace', 'Work at a rate the team can maintain.', 'Avoid repeatedly working all night and introducing more bugs through exhaustion.', 'PEOPLE'],
  ['On-site customer', 'Keep an accessible customer representative for fast answers.', 'Reception and lab staff answer workflow questions during development.', 'FEEDBACK'],
  ['Coding standards', 'Agree on consistent code style and conventions.', 'All developers use the same naming and review standards for patient data fields.', 'READABILITY']
];
function showPractice(i) {
  document.querySelectorAll('.practice-tile').forEach(b => b.classList.toggle('selected', Number(b.dataset.practice) === i));
  const [title, description, example, category] = practices[i];
  byId('practiceDetail').innerHTML = `<span class="detail-kicker">${pad(i+1)} / ${title.toUpperCase()}</span><h3>${description}</h3><p>${example}</p><div class="practice-tag">${category}</div>`;
}
practices.forEach((row,i) => {
  const button=document.createElement('button');
  button.className='practice-tile'; button.dataset.practice=i;
  button.innerHTML=`<span>${pad(i+1)}</span><b>${row[0]}</b>`;
  button.addEventListener('click',()=>showPractice(i));
  byId('practiceGrid').appendChild(button);
});
showPractice(0);

// TDD: symbolic teaching demo, not actual code execution.
const tddStages = [
  { code:'// Write expected behavior FIRST\n\ntest("completed = Ready", () => {\n  expect(reportStatus(true)).toBe("Ready");\n});\n\n// reportStatus does not exist yet', terminal:'✕ FAIL — reportStatus is not defined', title:'RED — test fails first', description:'A failing test makes the requirement explicit: a completed report must be displayed as “Ready”.' },
  { code:'function reportStatus(completed) {\n  if (completed === true) {\n    return "Ready";\n  } else {\n    return "Pending";\n  }\n}\n// Test now passes', terminal:'✓ PASS — 1 test, 0 failures', title:'GREEN — minimal code passes', description:'Implement the smallest useful function that satisfies the expected behavior. The test now passes.' },
  { code:'function reportStatus(completed) {\n  return completed ? "Ready" : "Pending";\n}\n\n// Same behavior, clearer code.\n// Test still passes after cleanup.', terminal:'✓ PASS — code improved; tests still green', title:'REFACTOR — improve safely', description:'Simplify the code without changing observable behavior. Retest after cleanup.' }
];
function selectTdd(i) {
  document.querySelectorAll('[data-tdd]').forEach(btn => btn.classList.toggle('active', Number(btn.dataset.tdd) === i));
  const data=tddStages[i];
  byId('tddCode').textContent=data.code;
  byId('tddTerminal').innerHTML=`<span class="terminal-indicator">●</span> ${data.terminal}`;
  byId('tddTerminal').classList.toggle('pass',i !== 0);
  byId('tddTitle').textContent=data.title;
  byId('tddDescription').textContent=data.description;
}
document.querySelectorAll('[data-tdd]').forEach(btn=>btn.addEventListener('click',()=>selectTdd(Number(btn.dataset.tdd))));
selectTdd(0);

// Pair programming role swap
let swapped=false;
function renderPair() {
  byId('roleA').textContent=swapped?'NAVIGATOR':'DRIVER';
  byId('roleB').textContent=swapped?'DRIVER':'NAVIGATOR';
  byId('taskA').textContent=swapped?'Reviews the design and checks for missing or invalid patient IDs.':'Writes patient lookup code and explains the implementation.';
  byId('taskB').textContent=swapped?'Writes the next part of the patient lookup after discussing the edge cases.':'Reviews the approach and asks: “What if the patient ID is blank?”';
  byId('personA').classList.toggle('active-person',!swapped);
  byId('personB').classList.toggle('active-person',swapped);
  byId('pairHint').textContent=swapped?'Developer B drives. Developer A navigates.':'Developer A drives. Developer B navigates.';
}
function resetPair(){swapped=false;renderPair();}
byId('pairSwitch').addEventListener('click',()=>{swapped=!swapped;renderPair();});
renderPair();

// CI pipeline status
function selectCi(i) {
  document.querySelectorAll('[data-ci]').forEach(b=>b.classList.toggle('active',Number(b.dataset.ci)===i));
  const build=byId('ciBuild'), test=byId('ciTest'), merge=byId('ciMerge'), status=byId('ciStatus');
  [build,test,merge].forEach(node=>node.classList.remove('bad','blocked'));
  if(i===1){test.classList.add('bad');merge.classList.add('blocked');status.className='ci-status failure';status.textContent='✕ Commit 02: automated tests fail. Fix it before integrating.';}
  else {status.className='ci-status success';status.textContent=i===0?'✓ Commit 01: checks pass. The change is ready to integrate.':'✓ Commit 03: the edge case is fixed. All checks pass.';}
}
document.querySelectorAll('[data-ci]').forEach(b=>b.addEventListener('click',()=>selectCi(Number(b.dataset.ci))));

// Scrum board
const defaultTasks=[
  {id:1,title:'Patient registration',meta:'User story · 3 points',status:'todo'},
  {id:2,title:'Report status field',meta:'User story · 2 points',status:'todo'},
  {id:3,title:'Automated status tests',meta:'Quality · 2 points',status:'todo'},
  {id:4,title:'Reception dashboard',meta:'User story · 3 points',status:'todo'}
];
let tasks=[];
function renderBoard(){
  document.querySelectorAll('.board-column').forEach(column=>{
    const status=column.dataset.status;
    const local=tasks.filter(t=>t.status===status);
    column.querySelector('.column-count').textContent=local.length;
    const container=column.querySelector('.board-items');
    container.replaceChildren();
    local.forEach(task=>{
      const card=document.createElement('article');card.className='task-card';card.dataset.id=task.id;
      const title=document.createElement('b');title.textContent=task.title;
      const meta=document.createElement('small');meta.textContent=task.meta;
      card.append(title,meta);
      if(status!=='done'){
        const move=document.createElement('button');
        move.textContent=status==='todo'?'Move → Doing':'Move → Done';
        move.setAttribute('aria-label',`Move ${task.title} to ${status==='todo'?'Doing':'Done'}`);
        move.addEventListener('click',()=>{task.status=status==='todo'?'doing':'done';renderBoard();});
        card.appendChild(move);
      }
      container.appendChild(card);
    });
  });
  const done=tasks.filter(t=>t.status==='done').length;
  byId('boardStatus').textContent=`${done} / ${tasks.length} tasks done`;
  byId('boardProgress').style.width=`${done/tasks.length*100}%`;
}
function resetBoard(){tasks=defaultTasks.map(t=>({...t}));renderBoard();}
byId('boardReset').addEventListener('click',resetBoard);
resetBoard();

// Definition of Done checklist
function updateDod(){
  const boxes=[...byId('dodChecklist').querySelectorAll('input')];
  const done=boxes.filter(b=>b.checked).length;
  const ready=done===boxes.length;
  byId('readinessBar').style.width=`${done/boxes.length*100}%`;
  byId('readinessCard').classList.toggle('ready',ready);
  byId('readinessIcon').textContent=ready?'✓':'○';
  byId('readinessTitle').textContent=ready?'Meets this DoD!':'Not done yet';
  byId('readinessDescription').textContent=ready?'All example quality checks are complete.':' '+done+' of '+boxes.length+' example quality checks completed.';
}
function resetDod(){byId('dodChecklist').querySelectorAll('input').forEach(box=>box.checked=false);updateDod();}
byId('dodChecklist').querySelectorAll('input').forEach(box=>box.addEventListener('change',updateDod));
updateDod();

// The fourteen principles listed in Beck & Andres, XP Explained, 2nd ed.
const xpPrinciples = [
  ['Humanity','Software is built by people. Protect energy, motivation, and the ability to do good work.','The team plans a manageable workload and helps a tired teammate instead of making late-night fixes routine.'],
  ['Economics','Choose work with an understanding of cost, risk, time, and customer value.','A small report-status feature delivers more immediate value than a costly dashboard redesign.'],
  ['Mutual Benefit','Aim for actions that help customers, developers, and future maintainers.','Automated tests help users trust results and help developers change code later.'],
  ['Self-Similarity','Reuse successful ways of solving problems at different scales.','Build a small tested feature the same way the team builds a larger module: clarify, code, check, learn.'],
  ['Improvement','Keep getting better; do not wait to become perfect before changing.','After each delivery, improve one weak part of registration or report flow.'],
  ['Diversity','People with different skills and views can discover better solutions.','A lab technician, designer, and programmer each notice a different problem in the report screen.'],
  ['Reflection','Pause to examine results, learn, and change the working approach.','When a registration bug escapes tests, the team asks why and adjusts its checks.'],
  ['Flow','Keep useful work moving without huge queues, handoffs, or batches.','Complete and integrate one feature instead of leaving ten modules half-finished.'],
  ['Opportunity','Treat difficult surprises as chances to learn or improve.','A duplicate-patient bug becomes a chance to strengthen input validation and records.'],
  ['Redundancy','Use more than one safeguard for important risks.','Input validation, automated tests, and review all help protect patient record accuracy.'],
  ['Failure','Make safe, small experiments; learn when a hypothesis does not work.','Prototype two report layouts and discard the confusing one after staff feedback.'],
  ['Quality','Do not treat essential quality as something to remove when time gets tight.','Keep tests for patient IDs even when the demonstration date is close.'],
  ['Baby Steps','Make small, reversible, verifiable changes instead of risky leaps.','Add one clear “Pending” label, test it, then add “Completed” next.'],
  ['Accepted Responsibility','The person who commits to work participates in choosing and owning it.','Developers estimate and accept the story they can truly finish; they also own checking its quality.']
];
function populatePrinciples(from,to,listId,explainId){
  const list=byId(listId);
  for(let i=from;i<to;i++){
    const button=document.createElement('button');
    button.className='principle-item';
    button.innerHTML=`<span>${pad(i+1)}</span><b>${xpPrinciples[i][0]}</b>`;
    button.addEventListener('click',()=>selectPrinciple(i,from,to,listId,explainId));
    list.appendChild(button);
  }
  selectPrinciple(from,from,to,listId,explainId);
}
function selectPrinciple(i,from,to,listId,explainId){
  const list=[...byId(listId).children];
  list.forEach((button,j)=>button.classList.toggle('selected',from+j===i));
  const [title,description,example]=xpPrinciples[i];
  byId(explainId).innerHTML=`<div class="principle-detail-number">${pad(i+1)} / PRINCIPLE</div><h3>${title}</h3><p>${description}</p><div class="principle-example"><b>MEDILAB EXAMPLE</b><p>${example}</p></div>`;
}
populatePrinciples(0,7,'principlesListA','principleExplainA');
populatePrinciples(7,14,'principlesListB','principleExplainB');

// Ethical design scenario
const decisions=[
  'Not ideal. A rushed, untested rewrite sacrifices quality and creates unnecessary risk. XP favors small changes, feedback, and tests.',
  'Not ideal. Customer feedback matters. The team should communicate honestly, check the current Sprint Goal, and see what small scope is practical.',
  '✓ Strong response. This combines baby steps, feedback, quality, economics, and courage. The team also remains transparent about the Sprint Goal.'
];
function resetDecision(){
  document.querySelectorAll('.decision-option').forEach(b=>b.classList.remove('selected'));
  byId('decisionFeedback').textContent="Choose a response. We'll connect it to XP principles.";
}
document.querySelectorAll('.decision-option').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.decision-option').forEach(b=>b.classList.toggle('selected',b===button));
  byId('decisionFeedback').textContent=decisions[Number(button.dataset.decision)];
}));

// Boot: deep links such as /#slide-8 are supported. Never run external tracking or network requests.
slides.forEach(s=>s.setAttribute('aria-hidden','true'));
const deepLink=location.hash.match(/^#slide-(\d+)$/);
showSlide(deepLink?Number(deepLink[1])-1:0,false);
