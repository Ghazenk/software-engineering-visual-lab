# Software Engineering, Made Visual

An interactive, beginner-friendly **HTML presentation** about:

1. **Data Flow Diagrams (DFDs)** — meaning, symbols, levels, context diagrams, Level 1 decomposition, rules, and a guided patient-data simulation.
2. **Extreme Programming (XP)** — definition, workflow, values, 12 classic practices, TDD, pair programming, continuous integration, and trade-offs.
3. **Scrum** — the Scrum Team, accountabilities, artifacts, commitments, events, a Sprint timeline, a working task board, and a Definition of Done activity.
4. **The 14 principles of XP** — all principles from *Extreme Programming Explained*, second edition, with practical examples.

The presentation teaches the topics through one fictional case study: **MediLab**, a lab-management system. The demo contains **no real patient information**.

## Start

Open `index.html` in your browser. There are **no dependencies, build commands, or npm installs**.

For a convenient local web server (optional):

```bash
python3 -m http.server 8000
```

Visit `http://localhost:8000`.

## Keyboard controls

| Key | Action |
| --- | --- |
| `→`, `Page Down`, `Space` | Next slide (Space activates focused buttons normally) |
| `←`, `Page Up` | Previous slide |
| `Home` / `End` | First / last slide |
| `G` | Slide outline |
| `P` | Presenter notes / detailed explanations |
| `F` | Fullscreen |
| `R` | Reset the interactive demo on the current slide |
| `Esc` | Close the open panel |

On phones and tablets, use the bottom arrow controls or swipe horizontally. Slides with longer content can scroll vertically.

## Deploy on Vercel

1. Import this GitHub repository into your Vercel account.
2. Set **Framework Preset: Other** if Vercel does not detect a framework.
3. Keep **Root Directory: `./`**.
4. Leave the **Build Command** blank and deploy.

Vercel will serve the site's `index.html` directly. No environment variables are needed.

## Project files

```text
index.html    38-slide educational presentation and all speaker notes
styles.css    responsive visual styling, diagrams, slide transitions, print styles
app.js        slide navigation and interactive teaching simulations
vercel.json   static deployment configuration
README.md     setup instructions, sources, and shortcut guide
```

## Pedagogical notes

- The DFDs are **simplified instructional diagrams**, not a complete formal requirements specification. The context diagram is called “Level 0” here; some textbooks number context diagrams differently.
- XP's **12 classic practices** reflect a common earlier teaching formulation. The second edition of XP reorganizes and updates the practices. **Values, principles, and practices are distinct concepts.**
- The **14 XP principles** follow Beck and Andres's second edition.
- Scrum has **three accountabilities**, **three artifacts with commitments**, and **five events** (the Sprint plus the four events inside it), according to the November 2020 Scrum Guide.
- Task boards are a useful visualization but **not a required official Scrum artifact**.
- Interactive demos simulate conceptual behavior. The TDD animation is **not a live test runner**, and the Scrum board **does not save state** across refreshes.

## Further reading and academic sources

- [IBM — Data Flow Diagrams](https://www.ibm.com/think/topics/data-flow-diagram)
- [Lucidchart — DFD notation and diagrams](https://lucid.co/diagram/dfd/tutorial)
- [The Scrum Guide — Ken Schwaber & Jeff Sutherland, 2020](https://scrumguides.org/scrum-guide.html)
- [Agile Alliance — Extreme Programming (XP)](https://agilealliance.org/glossary/xp/)
- [Extreme Programming Alliance — XP practices](https://extremeprogrammingalliance.com/about-extreme-programming-xp/extreme-programming-xp-practices/)
- Kent Beck & Cynthia Andres, *Extreme Programming Explained: Embrace Change*, 2nd ed. [Publisher information and table of contents](https://www.informit.com/store/extreme-programming-explained-embrace-change-9780134051987).

## License

Educational presentation prepared as an original explanatory work. Third-party references retain their respective copyrights. You may customize and present the source code for coursework; check the source licensing before redistributing portions from other publications.
