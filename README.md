# Software Engineering · Visual Guide

A **20-slide, beginner-friendly presentation** about:

1. Data Flow Diagrams (DFD): definition, four symbols, context, Level 0, Level 1 and a guided walk-through
2. Extreme Programming (XP): definition, five values, iteration cycle, representative practices and Red–Green–Refactor
3. Scrum: definition, three accountabilities, five events, three artifacts and a short Sprint workflow
4. XP principles: all 14 principles with one-sentence explanations

The slides use one **fictional laboratory management system** (patient registration → test order → results → report) so the examples remain consistent. There are **no quiz, discussion or filler slides**.

## Present the HTML version

Open `index.html` in any modern browser or deploy the repository to Vercel as a static site.

- **← / →** or the navigation arrows: previous/next slide
- **F**: fullscreen
- **P**: presenter notes
- **Next step / Back** inside slides 8, 13 and 18: show one simulated step at a time
- **Download PPTX**: download the matching editable slide deck

These interactive simulations run entirely in the browser. They do not require a server or external APIs.

## PowerPoint file

`software-engineering-visual-guide.pptx` contains exactly **20 slides**. Text, cards, DFD shapes, arrows and diagram labels use **native editable PowerPoint elements**, not full-slide screenshots. It also contains speaker notes. PowerPoint cannot execute the website's JavaScript, so the demonstration slides show readable static diagrams instead.

Run `node generate-pptx.js` after installing `pptxgenjs` (`npm install pptxgenjs`) to regenerate the PPTX. The HTML content is authored in `build_html.py` and can be rebuilt by running `python build_html.py`.

## Deploy on Vercel

Import this GitHub repository in Vercel, choose **Other** as the framework, use root directory `./`, and leave the build command empty. `vercel.json` is included.

## Teaching/reference notes

- [Scrum Guide (2020)](https://scrumguides.org/scrum-guide.html): Scrum accountabilities, events, artifacts and commitments.
- Kent Beck, *Extreme Programming Explained: Embrace Change*, 2nd ed.: five values and 14 principles.
- DFD notation follows commonly taught process, entity, data-store and labeled-arrow conventions. Some courses use a different naming convention for the Context/Level 0 diagrams; this presentation uses **Context → Level 0 (major processes) → Level 1 (subprocesses)**.

## Design

The visual direction takes cues from the original presentation: deep navy, calm white surfaces, lime accents and meaningful shapes. It follows anti-clutter design guidance from [Unslop](https://github.com/heydamir/unslop) by Damir Sokolovsky (CC BY 4.0), with independent slide designs and diagrams.
