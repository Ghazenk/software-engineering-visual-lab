# Software engineering · field guide

A 30-slide classroom presentation on four topics:

1. Data Flow Diagrams (DFDs)
2. Extreme Programming (XP)
3. Scrum
4. The 14 principles of XP

The same fictional laboratory management system, **MediLab**, is used in every chapter.

## Open the presentation

Open `index.html` in a browser. No dependencies, server, or build step are required.

- Left/right arrows: previous/next slide
- **G**: table of contents
- **P**: speaker notes with teaching explanations
- **F**: fullscreen
- **R**: reset the current interactive example
- **PowerPoint** button: download the static `.pptx` edition

Interactive examples include the context DFD, data movement across a DFD, TDD, XP workflow, pair programming, continuous integration, a Scrum task board, Definition of Done and decision exercises.

## PowerPoint edition

`software-engineering-presentation.pptx` contains one 16:9 slide for each of the 30 HTML slides, plus presenter notes. It preserves the slide appearance as screenshots. PowerPoint cannot run the JavaScript simulations; the screenshots show representative simulation states. This edition is suitable for offline teaching. For live demonstrations, use the HTML site.

## Deploy to Vercel

Import this GitHub repository and choose the **Other** framework preset. Set root to `./` and leave build command blank. The site is static.

## Content notes

- A DFD models information flows, not control-flow steps.
- XP values, principles and practices are different things.
- The Scrum board is a teaching visualization, not a required Scrum artifact.
- A two-week Sprint is illustrative; Scrum Sprints may be up to one month.
- All patient and project information is fictional.

## References

- [Scrum Guide (2020)](https://scrumguides.org/scrum-guide.html)
- [Agile Alliance: Extreme Programming](https://agilealliance.org/glossary/xp/)
- [IBM: Data Flow Diagram](https://www.ibm.com/think/topics/data-flow-diagram)
- Beck, Kent and Andres, Cynthia. *Extreme Programming Explained: Embrace Change*, 2nd ed.

## Files

- `index.html`: slide content and diagrams
- `styles.css`: styles and responsive design
- `app.js`: navigation, teacher notes and simulations
- `software-engineering-presentation.pptx`: static PowerPoint edition
- `vercel.json`: static hosting settings
