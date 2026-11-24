from pathlib import Path
from html import escape
P=Path('/mnt/data/se-visual-studio')
slides=[]
def add(chapter, title, content, *, theme='light', kicker=None, subtitle=None, note='', extra=''):
    idx=len(slides)+1
    slides.append(dict(chapter=chapter,title=title,content=content,theme=theme,kicker=kicker or chapter,subtitle=subtitle or '',note=note,extra=extra,index=idx))

def H(v):return escape(str(v),quote=True)

def badge(text):return f'<span class="pill">{text}</span>'
def lead(text):return f'<p class="lead">{text}</p>'
def tag(text):return f'<div class="section-tag"><span class="tag-line"></span>{text}</div>'
def card(title, body, num='', cls=''):
 return f'<article class="info-card {cls}"><div class="card-top">{f"<span class=\"num\">{num}</span>" if num else ""}<span class="tiny-line"></span></div><h3>{title}</h3><p>{body}</p></article>'
def banner(text, cls=''):
 return f'<div class="insight {cls}"><span class="insight-bar"></span><span>{text}</span></div>'
def twoline(a,b):return f'<div class="split-label"><strong>{a}</strong><span>{b}</span></div>'
def marker():return '''<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="14" markerHeight="14" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#40918f"/></marker><marker id="arrL" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="14" markerHeight="14" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#bce96f"/></marker></defs>'''
def entity(x,y,w,h,txt):return f'<g class="dfd-entity"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6"/><text x="{x+w/2}" y="{y+h/2+6}" text-anchor="middle">{txt}</text></g>'
def proc(x,y,w,h,txt):return f'<g class="dfd-process"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="30"/><text x="{x+w/2}" y="{y+h/2+6}" text-anchor="middle">{txt}</text></g>'
def store(x,y,w,h,txt):return f'<g class="dfd-store"><path d="M {x+3} {y} H {x+w} M {x+3} {y+h} H {x+w} M {x+3} {y} V {y+h}"/><text x="{x+w/2+2}" y="{y+h/2+6}" text-anchor="middle">{txt}</text></g>'
def arrow(points,label='',tx=None,ty=None):
 s=' '.join((('M' if i==0 else 'L')+f' {x} {y}') for i,(x,y) in enumerate(points))
 r=f'<path class="dfd-arrow" d="{s}" marker-end="url(#arr)"/>'
 if label and tx is not None:
  r+=f'<text class="dfd-edge-label" x="{tx}" y="{ty}" text-anchor="middle">{label}</text>'
 return r

diagram_counter=0
def diagram(bodies,extra='',view='0 0 1120 450'):
 global diagram_counter
 diagram_counter+=1
 ident=f'arr{diagram_counter}'
 contents=(marker()+bodies).replace('id="arr"',f'id="{ident}"').replace('id="arrL"',f'id="{ident}L"').replace('url(#arr)',f'url(#{ident})').replace('url(#arrL)',f'url(#{ident}L)')
 return f'<div class="diagram-surface {extra}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}" role="img" aria-label="DFD diagram with labeled processes, stores and arrows">{contents}</svg></div>'

# 01 COVER
add('Welcome','Four ideas. One clear story.', '''
<div class="hero-grid">
 <div class="hero-copy">
  <div class="overline light-label"><span class="live-dot"></span> SOFTWARE ENGINEERING / VISUAL GUIDE</div>
  <h1>Understand the flow.<br><em>Build with care.</em></h1>
  <p class="hero-desc">Data flow diagrams, Extreme Programming, Scrum and the principles behind XP—explained through one small lab system.</p>
  <div class="hero-chips"><span>01 Data flow</span><span>02 XP</span><span>03 Scrum</span><span>04 Principles</span></div>
 </div>
 <div class="hero-art" aria-hidden="true">
  <div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="hero-core"><span>SE</span><small>software engineering</small></div>
  <span class="orbit-tag ot-1">DFD</span><span class="orbit-tag ot-2">XP</span><span class="orbit-tag ot-3">SCRUM</span><span class="orbit-tag ot-4">14 PRINCIPLES</span>
 </div>
</div>
<div class="hero-bottom"><div class="accent-rule"></div> Fundamentals first · simple examples · clear diagrams</div>''',theme='dark',note='Opening: We will follow one small laboratory management system to understand four foundational software engineering topics.')

# 02 ONE STORY
add('The example','One small system connects everything.', f'''
<div class="chapter-heading">{tag('OUR SHARED EXAMPLE')}<h2>A lab report, from start to finish.</h2>{lead('A clinic wants a simple system to register patients, record test results and give patients their reports.')}</div>
<div class="workflow-row">
<div class="work-node"><span class="work-number">01</span><div class="work-icon">ID</div><h3>Register</h3><p>Receptionist saves the patient details</p></div>
<div class="work-arrow" aria-hidden="true">→</div>
<div class="work-node"><span class="work-number">02</span><div class="work-icon">LAB</div><h3>Request</h3><p>Receptionist creates a test order</p></div>
<div class="work-arrow" aria-hidden="true">→</div>
<div class="work-node"><span class="work-number">03</span><div class="work-icon">✓</div><h3>Test</h3><p>Technician enters the test results</p></div>
<div class="work-arrow" aria-hidden="true">→</div>
<div class="work-node"><span class="work-number">04</span><div class="work-icon">PDF</div><h3>Report</h3><p>The patient receives the completed report</p></div>
</div>
{banner('We will draw this information flow with DFD, build it using XP, and organize the work using Scrum.')}
''',note='Use this single fictional example throughout. Clarify that it is an illustrative workflow, not a description of a real medical facility.')

# 03 DFD
basic = arrow([(226,212),(452,212)],'patient details',337,189)+arrow([(732,212),(921,212)],'saved record',827,189)+entity(43,158,183,105,'Receptionist')+proc(452,151,280,124,'Register Patient')+store(922,170,167,84,'D1 Patients')
add('Data flow diagrams','What is a DFD?',f'''
<div class="split-43"><div class="explain-col">{tag('01 / DATA FLOW DIAGRAMS')}<h2>A picture of how <em>data moves.</em></h2><p class="definition">A <strong>Data Flow Diagram (DFD)</strong> shows where information comes from, how a system processes it, where it is stored, and where it goes.</p><div class="def-list"><div><b>It shows</b><span>Data movement and processing</span></div><div><b>It does not show</b><span>Screen design or code instructions</span></div></div></div>
<div class="diagram-card"><div class="diagram-title">One simple flow <span>DFD example</span></div>{diagram(basic,'mini-diagram',view='0 85 1120 290')}<div class="diagram-caption">Patient details move from the receptionist, through a process, into the patient data store.</div></div></div>''',note='Define DFD as a model of data movement, not a flowchart of steps or a UI sketch. Read the arrows from left to right.')

# 04 Symbols
symbol_svg='''<svg viewBox="0 0 180 88" aria-hidden="true"><rect x="35" y="19" width="110" height="50" fill="none" stroke="currentColor" stroke-width="3" rx="3"/></svg>'''
process_svg='''<svg viewBox="0 0 180 88" aria-hidden="true"><rect x="33" y="19" width="114" height="50" fill="none" stroke="currentColor" stroke-width="3" rx="25"/></svg>'''
store_svg='''<svg viewBox="0 0 180 88" aria-hidden="true"><path d="M32 17 H148 M32 71 H148 M32 17 V71" stroke="currentColor" stroke-width="3" fill="none"/></svg>'''
arrow_svg='''<svg viewBox="0 0 180 88" aria-hidden="true"><path d="M28 44 H150 M136 33 L150 44 L136 55" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'''
add('Data flow diagrams','The four symbols',f'''
{tag('LEARN THE SHAPES')}<h2>Each DFD shape has <em>one job.</em></h2>
<div class="symbol-grid">
<div class="symbol-card"><div class="symbol-image c-teal">{symbol_svg}</div><div><span class="symbol-index">01 / ENTITY</span><h3>External entity</h3><p>A person or outside system that sends or receives data.</p><small>Example: Receptionist</small></div></div>
<div class="symbol-card"><div class="symbol-image c-lime">{process_svg}</div><div><span class="symbol-index">02 / PROCESS</span><h3>Process</h3><p>An action that changes or handles data.</p><small>Example: Register Patient</small></div></div>
<div class="symbol-card"><div class="symbol-image c-blue">{store_svg}</div><div><span class="symbol-index">03 / DATA STORE</span><h3>Data store</h3><p>A place where data is kept for later use.</p><small>Example: D1 Patients</small></div></div>
<div class="symbol-card"><div class="symbol-image c-amber">{arrow_svg}</div><div><span class="symbol-index">04 / DATA FLOW</span><h3>Labeled arrow</h3><p>Information moving in the direction of the arrow.</p><small>Example: Patient details</small></div></div>
</div>''',note='Be precise: arrows represent data, not control flow. A process is rounded; an entity is a rectangle; a store uses parallel lines. Consistency matters more than drawing style.')

# 05 Context DFD
ctx=[]
ctx.extend([
 arrow([(248,169),(397,169)],'patient details',327,149),
 arrow([(720,147),(880,147)],'test worklist',807,126),
 arrow([(893,217),(734,217)],'test results',806,246),
 arrow([(720,300),(877,344)],'completed report',822,292),
 entity(48,127,200,90,'Receptionist'),
 proc(410,127,310,190,'0 · Lab Management System'),
 entity(893,105,194,90,'Lab Technician'),
 entity(893,316,194,90,'Patient')])
add('Data flow diagrams','Context diagram',f'''
<div class="top-with-aside">{tag('DFD / THE BIG PICTURE')}<h2>Show the whole system <em>as one process.</em></h2><p>The context diagram shows the system boundary and the people outside it.</p></div>
{diagram(''.join(ctx),'large-diagram')}
<div class="diagram-keyline"><span><b>1</b> central process</span><span><b>3</b> external entities</span><span><b>4</b> labeled data flows</span></div>
''',note='The entire software system appears as one process labelled 0. External entities are outside the boundary. Data arrows are labeled nouns such as patient details and test results.')

# 06 L0 DFD
l0=[]
l0.extend([
 arrow([(190,128),(241,128)],'details',218,63),
 arrow([(452,128),(488,128)],'patient ID',476,63),
 arrow([(704,128),(738,128)],'test order',728,63),
 arrow([(954,128),(998,128)],'report',986,63),
 arrow([(344,180),(344,267)],'patient',382,241),
 arrow([(604,180),(604,267)],'order',643,241),
 arrow([(854,180),(854,267)],'results',885,241),
 arrow([(1055,356),(1055,240),(966,240),(966,192)],'test results',1025,227),
 entity(28,91,162,78,'Receptionist'),
 proc(252,78,200,102,'1.0 Register'),
 proc(500,78,204,102,'2.0 Create Order'),
 proc(750,78,204,102,'3.0 Prepare Report'),
 entity(1010,91,92,78,'Patient'),
 store(249,280,192,68,'D1 Patients'),
 store(510,280,190,68,'D2 Orders'),
 store(760,280,190,68,'D3 Results'),
 entity(977,356,125,78,'Technician')
])
add('Data flow diagrams','Level 0 diagram',f'''
{tag('DFD / ONE LEVEL DEEPER')}<h2>Break the system into <em>major processes.</em></h2>
<p class="under-title">Instead of one big box, we now see three important processes and the records they use.</p>
{diagram(''.join(l0),'large-diagram')}
{banner('Important rule: an external entity talks to a process—never directly to a data store.')}
''',note='This uses the naming convention context diagram → Level 0 decomposition → Level 1 decomposition. Some courses label the context diagram as level 0; say that naming can vary. The data store D3 represents test results.')

# 07 Level 1
l1=[]
l1.extend([
 arrow([(193,136),(246,136)],'raw values',225,58),
 arrow([(457,136),(501,136)],'entered values',485,58),
 arrow([(710,136),(748,136)],'checked values',735,58),
 arrow([(957,136),(991,136)],'PDF report',980,58),
 arrow([(360,192),(360,285)],'saved values',415,251),
 entity(27,92,166,89,'Technician'),
 proc(258,82,199,110,'3.1 Enter Results'),
 proc(513,82,197,110,'3.2 Check Results'),
 proc(760,82,197,110,'3.3 Publish Report'),
 entity(1003,92,101,89,'Patient'),
 store(250,298,220,78,'D3 Results')
])
add('Data flow diagrams','Level 1 diagram',f'''
{tag('DFD / ZOOM INTO 3.0')}<h2>Look inside <em>one process.</em></h2>
<p class="under-title">We expand “3.0 Prepare Report” into three smaller processes. The same data journey stays visible.</p>
{diagram(''.join(l1),'large-diagram')}
<div class="three-rule"><span>3.1 <strong>Enter</strong></span><span>3.2 <strong>Check</strong></span><span>3.3 <strong>Publish</strong></span></div>
''',note='Level 1 shows more detail inside process 3.0 without adding programming instructions. Explain the diagram left-to-right and emphasize correct incoming/outgoing arrows.')

# 08 Interactive DFD
sim_steps=[('Reception collects patient details','This is information from an external entity.'),('The system registers the patient','The process handles the details.'),('Patient information is saved','The data store keeps a patient record.'),('Technician enters lab results','Another process handles new information.'),('The patient receives a report','The output leaves the system as a report.')]
add('Data flow diagrams','Watch one report move',f'''
{tag('LIVE WALKTHROUGH / 5 STEPS')}<h2>Follow the <em>information.</em></h2>
<div class="simulation" id="dfdSim" data-total="5">
 <div class="sim-visual">
  <div class="sim-track">
   <div class="sim-item" data-sim-stage="0"><div class="sim-shape entity-shape">Reception</div><small>Patient details</small></div><div class="sim-separator">→</div>
   <div class="sim-item" data-sim-stage="1"><div class="sim-shape process-shape">Register</div><small>Process</small></div><div class="sim-separator">→</div>
   <div class="sim-item" data-sim-stage="2"><div class="sim-shape store-shape">D1 Patients</div><small>Saved record</small></div><div class="sim-separator">→</div>
   <div class="sim-item" data-sim-stage="3"><div class="sim-shape process-shape">Record Results</div><small>Process</small></div><div class="sim-separator">→</div>
   <div class="sim-item" data-sim-stage="4"><div class="sim-shape entity-shape">Patient</div><small>Report</small></div>
  </div>
 </div>
 <div class="sim-bottom"><div><span class="step-label">STEP <b data-sim-counter>01</b> / 05</span><h3 data-sim-title>{sim_steps[0][0]}</h3><p data-sim-desc>{sim_steps[0][1]}</p></div><div class="sim-buttons"><button data-sim-prev class="subtle-btn">← Back</button><button data-sim-next class="solid-btn">Next step →</button></div></div>
</div>''',extra='data-sim="dfd"',note='Click Next step slowly. Distinguish a source/sink entity, a process, a store, and an output. This is a simplified journey, not an exact copy of the Level 0 diagram.')

# 09 XP opener
add('Extreme Programming','XP makes change manageable.', '''
<div class="dark-chapter split-55"><div><div class="overline light-label">02 / EXTREME PROGRAMMING</div><h1>Small steps.<br><em>Strong habits.</em></h1><p class="hero-desc">Extreme Programming (XP) is an Agile software development approach that uses frequent feedback, teamwork and disciplined coding practices.</p><div class="xp-example"><span>Lab example</span><b>Build patient search first. Test it. Get feedback. Improve it.</b></div></div>
<div class="loop-art" aria-label="XP loop plan code test feedback"><div class="loop-center">REPEAT<small>improve a little</small></div><div class="loop-token lt-top">PLAN</div><div class="loop-token lt-right">CODE</div><div class="loop-token lt-bottom">TEST</div><div class="loop-token lt-left">FEEDBACK</div><div class="loop-corner-a"></div><div class="loop-corner-b"></div></div></div>
''',theme='dark',note='XP emphasizes short cycles, frequent feedback, automated tests, close collaboration, and sustainable engineering practices. It is part of Agile.')

# 10 XP values
v=[('Communication','Talk often so the team understands the work.'),('Simplicity','Build what is needed now; avoid unnecessary features.'),('Feedback','Test and listen early, then adjust.'),('Courage','Improve code and discuss problems openly.'),('Respect','Treat teammates and users with care.')]
add('Extreme Programming','Five XP values',f'''{tag('XP / THE MINDSET')}<h2>Good software starts with <em>good habits.</em></h2>
<div class="five-values">{''.join(f'<div class="value-card"><span class="value-number">0{i}</span><div class="value-ring"></div><h3>{a}</h3><p>{b}</p></div>' for i,(a,b) in enumerate(v,1))}</div>
{banner('Example: If receptionists cannot find a patient quickly, listen to their feedback and improve search before building more features.')}
''',note='Values are beliefs guiding decisions. Do not confuse these five values with the 14 XP principles or technical practices.')

# 11 XP cycle
cycle=[('01','Choose a story','“Find a patient using a phone number.”'),('02','Build & test','Write a small test and implement the feature.'),('03','Show the result','Ask the receptionist to try searching.'),('04','Improve & repeat','Fix issues, then choose the next small story.')]
add('Extreme Programming','One short XP iteration',f'''{tag('XP / REPEATING CYCLE')}<h2>Finish a small feature. <em>Then repeat.</em></h2>
<div class="cycle-path"><div class="cycle-row">{''.join(f'<div class="cycle-card"><div class="cycle-num">{num}</div><h3>{name}</h3><p>{desc}</p></div>{"<div class=\"cycle-arrow\">→</div>" if i<3 else ""}' for i,(num,name,desc) in enumerate(cycle))}</div><div class="repeat-line">↶ <span>Next small improvement</span></div></div>
{banner('XP does not wait until the whole application is finished to learn whether a feature works.')}
''',note='A user story is a small user need. This is a simplified explanation of an XP iteration. It is not a prescribed four-stage formal lifecycle.')

# 12 Practices
p=[('Pair programming','Two developers work together on the same code.'),('Test-driven development','Write a failing test before the code that passes it.'),('Continuous integration','Combine changes and run automated checks often.'),('Refactoring','Improve code structure without changing behavior.'),('Small releases','Deliver useful changes in small pieces.'),('Customer collaboration','Ask users about their needs throughout development.')]
add('Extreme Programming','XP practices',f'''{tag('XP / HOW TEAMS WORK')}<h2>Simple ideas, practiced <em>consistently.</em></h2>
<div class="practice-grid">{''.join(f'<div class="practice-card"><span class="practice-num">0{i}</span><h3>{name}</h3><p>{desc}</p></div>' for i,(name,desc) in enumerate(p,1))}</div>
''',note='These are six representative XP practices, not the entire complete catalog. Explain them plainly, with one example each if time permits.')

# 13 TDD
add('Extreme Programming','Test-driven development',f'''{tag('XP / LIVE EXAMPLE')}<h2>Test first. <em>Then code.</em></h2>
<div class="tdd-wrapper" id="tddSim" data-total="3">
<div class="tdd-phases"><div class="tdd-phase" data-tdd-stage="0"><span>01</span><strong>RED</strong><small>Write a failing test</small></div><div class="tdd-phase" data-tdd-stage="1"><span>02</span><strong>GREEN</strong><small>Make it pass</small></div><div class="tdd-phase" data-tdd-stage="2"><span>03</span><strong>REFACTOR</strong><small>Clean the code</small></div></div>
<div class="tdd-detail"><div class="code-panel"><div class="code-top"><span class="fake-dot red"></span><span class="fake-dot amber"></span><span class="fake-dot green"></span><span>patient-search.test</span></div><pre data-tdd-code>Test: searching ID 102 returns Amina\n\nResult: FAIL\nSearch feature does not exist yet.</pre></div><div class="tdd-explainer"><span class="step-label">EXAMPLE / PATIENT SEARCH</span><h3 data-tdd-title>Write a test that fails</h3><p data-tdd-desc>Before building search, define the expected result: patient ID 102 should return Amina.</p><div class="sim-buttons"><button class="subtle-btn" data-tdd-prev>← Back</button><button class="solid-btn" data-tdd-next>Next step →</button></div></div></div>
</div>''',note='TDD order: Red — first write an automated test and see it fail. Green — implement the simplest working code. Refactor — improve code without changing the verified behavior. The code panel is illustrative pseudocode.')

# 14 Scrum intro
add('Scrum','Scrum helps teams deliver together.', '''
<div class="dark-chapter split-55"><div><div class="overline light-label">03 / SCRUM FRAMEWORK</div><h1>A shared goal.<br><em>One Sprint at a time.</em></h1><p class="hero-desc">Scrum is a lightweight framework where a small team delivers value in short periods called <strong>Sprints</strong>, usually lasting one month or less.</p><div class="xp-example"><span>Lab example</span><b>Sprint goal: “Reception can register and find patients reliably.”</b></div></div>
<div class="scrum-art" aria-label="Product Backlog to Sprint to Increment"><div class="scrum-art-node"><small>01</small><strong>Product Backlog</strong><em>everything needed</em></div><div class="scrum-art-arrow">→</div><div class="scrum-art-node featured"><small>02</small><strong>Sprint</strong><em>work toward a goal</em></div><div class="scrum-art-arrow">→</div><div class="scrum-art-node"><small>03</small><strong>Increment</strong><em>something usable</em></div></div></div>
''',theme='dark',note='Distinguish Scrum from XP: Scrum organizes team collaboration, delivery and learning; XP emphasizes engineering practices. Scrum is a framework, not a rigid software development process model.')

# 15 Scrum team
roles=[('Product Owner','Chooses what is most valuable and orders the Product Backlog.','Example: Prioritizes patient search.'),('Scrum Master','Helps everyone understand and use Scrum effectively.','Example: Removes obstacles to team progress.'),('Developers','Plan, build, test and deliver a usable Increment.','Example: Implement and test registration.')]
add('Scrum','Who is on the Scrum Team?',f'''{tag('SCRUM / THREE ACCOUNTABILITIES')}<h2>Three accountabilities. <em>One team.</em></h2>
<div class="role-grid">{''.join(f'<article class="role-card"><div class="role-illustration role-{i}"><span>0{i}</span><div class="role-figure"><i></i><i></i><i></i></div></div><h3>{a}</h3><p>{b}</p><div class="role-example">{c}</div></article>' for i,(a,b,c) in enumerate(roles,1))}</div>
''',note='Official 2020 Scrum Guide uses the term accountabilities (rather than separate hierarchical roles). Developers include everyone who creates the usable Increment.')

# 16 Scrum events
events=[('Sprint Planning','Decide why the Sprint matters and what to build.'),('Daily Scrum','Developers inspect progress and adapt their plan.'),('Sprint Review','Show the result and get stakeholder feedback.'),('Sprint Retrospective','Improve the way the team works.')]
add('Scrum','Five Scrum events',f'''{tag('SCRUM / TIME TO INSPECT AND ADAPT')}<h2>Four events happen <em>inside a Sprint.</em></h2>
<div class="sprint-frame"><div class="sprint-head"><span class="sprint-pill">SPRINT / EVENT 1</span><strong>A fixed period of one month or less</strong></div><div class="sprint-events">{''.join(f'<div class="sprint-event"><span class="event-num">0{i+2}</span><h3>{a}</h3><p>{b}</p></div>' for i,(a,b) in enumerate(events))}</div><div class="sprint-underline">SPRINT GOAL → USABLE INCREMENT</div></div>
{banner('Daily Scrum happens each working day of the Sprint. The other events have their own purpose and timebox.')}
''',note='The Sprint is the containing fifth event. Inside it: Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective. The Daily Scrum is a 15-minute event for Developers.')

# 17 Artifacts
arts=[('Product Backlog','Ordered list of everything needed for the product.','Commitment: Product Goal'),('Sprint Backlog','Sprint Goal + selected work + plan for doing it.','Commitment: Sprint Goal'),('Increment','Usable work that meets the Definition of Done.','Commitment: Definition of Done')]
add('Scrum','Three Scrum artifacts',f'''{tag('SCRUM / THREE WORK ITEMS')}<h2>What the team <em>plans and delivers.</em></h2>
<div class="artifact-chain">{''.join(f'<article class="artifact-card"><div class="artifact-image"><span class="artifact-no">0{i}</span><div class="paper-stack"><i></i><i></i><i></i></div></div><h3>{a}</h3><p>{b}</p><div class="commitment">{c}</div></article>{"<div class=\"artifact-arrow\">→</div>" if i<3 else ""}' for i,(a,b,c) in enumerate(arts,1))}</div>
''',note='Artifact commitments are important: Product Goal with Product Backlog, Sprint Goal with Sprint Backlog, Definition of Done with Increment. Use a simple lab example: search patients becomes working, tested, usable functionality.')

# 18 Scrum simulation
add('Scrum','A Sprint, in motion',f'''{tag('SCRUM / STEP-BY-STEP EXAMPLE')}<h2>Watch a task move from <em>planned to done.</em></h2>
<div class="board-frame" id="scrumSim" data-total="4"><div class="board-top"><div><span class="step-label">SPRINT GOAL</span><h3>Reception can search patient records</h3></div><span class="board-progress" data-scrum-counter>01 / 04</span></div><div class="kanban-board"><div class="kanban-column"><h4><span class="kanban-dot"></span>To do</h4><div class="kanban-body" data-kanban-col="todo"><div class="kanban-task" data-board-task>Patient search by ID <small>Feature / Lab system</small></div></div></div><div class="kanban-column"><h4><span class="kanban-dot teal"></span>In progress</h4><div class="kanban-body" data-kanban-col="progress"></div></div><div class="kanban-column"><h4><span class="kanban-dot lime"></span>Done</h4><div class="kanban-body" data-kanban-col="done"></div></div></div><div class="board-bottom"><p data-scrum-desc>Step 1: The team selects a small, valuable task during Sprint Planning.</p><div class="sim-buttons"><button class="subtle-btn" data-scrum-prev>← Back</button><button class="solid-btn" data-scrum-next>Next step →</button></div></div></div>
''',note='Step 1 choose search task, Step 2 start implementation, Step 3 test against Definition of Done, Step 4 finish usable feature and show stakeholders. This is an illustrative board, not a mandatory Scrum artifact format.')

# 19 principles
principles=[
('Humanity','Remember the people doing the work.'),('Economics','Choose work that gives real value.'),('Mutual benefit','Try to help customers and teammates together.'),('Self-similarity','Use a good solution pattern at different scales.'),('Improvement','Keep making the work a little better.'),('Diversity','Different skills and viewpoints improve decisions.'),('Reflection','Pause to learn from what happened.'),('Flow','Keep useful work moving smoothly.'),('Opportunity','Treat problems as chances to improve.'),('Redundancy','Use backup ways to catch important mistakes.'),('Failure','Use small failures to learn early.'),('Quality','Do not sacrifice quality to move faster.'),('Baby steps','Make changes in safe, tiny steps.'),('Accepted responsibility','Let people own the work they agree to do.')]

def prin_card(i,a,b):return f'<div class="principle-card"><span class="principle-num">{i:02d}</span><div><h3>{a}</h3><p>{b}</p></div></div>'
add('XP principles','Principles of XP · 1–7',f'''{tag('04 / XP PRINCIPLES')}<h2>The ideas behind <em>the habits.</em></h2>
<div class="principle-grid">{''.join(prin_card(i,a,b) for i,(a,b) in enumerate(principles[:7],1))}</div>
<div class="principle-foot">Values guide decisions · Principles explain why · Practices show how</div>
''',note='These are the first seven of the fourteen XP principles described by Kent Beck. Explain them conversationally, rather than memorizing the wording.')
add('XP principles','Principles of XP · 8–14',f'''{tag('04 / XP PRINCIPLES')}<h2>Keep learning. <em>Keep improving.</em></h2>
<div class="principle-grid">{''.join(prin_card(i,a,b) for i,(a,b) in enumerate(principles[7:],8))}</div>
<div class="principle-foot">DFD: understand information · XP: build carefully · Scrum: deliver together</div>
''',note='The remaining seven XP principles. End on this takeaway: DFD helps us understand data movement, XP helps engineers build safely, and Scrum helps teams deliver together.')

assert len(slides)==20,len(slides)

base_start='''<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#0b1425"><meta name="description" content="20 clear visual slides on Data Flow Diagrams, Extreme Programming, Scrum and XP principles"><title>Software Engineering · Visual Guide</title><link rel="stylesheet" href="styles.css"><script src="app.js" defer></script></head><body><header class="topbar"><a class="brand" href="#s1" aria-label="Go to first slide"><span class="brand-symbol"><i></i><i></i><i></i><i></i></span><span>SE<span class="brand-slash">/</span> VISUAL GUIDE</span></a><div class="top-middle"><span id="chapterLabel">WELCOME</span><span class="top-divider">/</span><span id="slideLabel">01 OF 20</span></div><div class="top-right"><a class="download" href="software-engineering-visual-guide.pptx" download>Download PPTX <span aria-hidden="true">↓</span></a><button id="fullBtn" class="mini-btn" type="button" title="Toggle fullscreen (F)" aria-label="Toggle fullscreen">⛶</button></div></header><main class="presentation" id="presentation" aria-label="Software engineering presentation">'''
for s in slides:
 base_start+=f'<section id="s{s["index"]}" class="slide {s["theme"]}" data-chapter="{H(s["chapter"])}" data-title="{H(s["title"])}" data-notes="{H(s["note"])}" {s["extra"]}><div class="slide-inner">{s["content"]}</div></section>'
base_start+='''</main><footer class="footer"><div class="footer-left"><span class="progress-track"><span id="progressLine"></span></span><span id="footerHint">← → to navigate</span></div><div class="footer-nav"><button class="foot-btn" id="prevSlide" type="button" aria-label="Previous slide">←</button><span id="slideCount">01 <b>/</b> 20</span><button class="foot-btn next-foot" id="nextSlide" type="button" aria-label="Next slide">→</button></div></footer><aside class="speaker-notes" id="notesPanel" hidden><div class="notes-head"><strong>Presenter notes</strong><button id="closeNotes" type="button" aria-label="Close notes">×</button></div><p id="notesText"></p></aside><div class="sr-only" aria-live="polite" id="liveRegion"></div></body></html>'''
(P/'index.html').write_text(base_start,encoding='utf-8')
# export slide data for PPTx
import json
(P/'slides-data.json').write_text(json.dumps([{k:v for k,v in x.items() if k in ['chapter','title','note','theme','index']} for x in slides],indent=2),encoding='utf-8')
print('Built',len(slides),'slides',len(base_start),'HTML bytes')
