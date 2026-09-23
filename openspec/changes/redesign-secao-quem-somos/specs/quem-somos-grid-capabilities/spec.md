## ADDED Requirements

### Requirement: Unified Two-Column Section Structure
The `#quem-somos` section SHALL use a balanced two-column desktop layout consisting of an institutional manifesto on the left and a 2x2 technical capability grid on the right.

#### Scenario: Visual balance on desktop screens
- **WHEN** a user views the `#quem-somos` section on viewport width >= 1024px
- **THEN** the system displays the institutional text and action link on the left column
- **AND** the system displays the 4 technical capability cards arranged in a 2x2 grid on the right column
- **AND** no isolated dark box with unreadable text is rendered

### Requirement: Four Core Capability Cards
The section SHALL display four distinct capability cards representing the primary value pillars of Mult Engenharia.

#### Scenario: Capability content and styling
- **WHEN** a user inspects the capability cards
- **THEN** the four cards display distinct icons, titles, and descriptions for:
  1. Engenharia & P&D
  2. Conformidade & Regulatório
  3. Diagnóstico & Perícia
  4. Hub de Especialistas
- **AND** each card utilizes high-contrast typography, readable body text, and subtle hover micro-interactions

### Requirement: Responsive Grid Behavior
The 2x2 capability grid SHALL adapt smoothly across mobile, tablet, and desktop viewports without horizontal clipping or compressed text.

#### Scenario: Mobile viewport responsiveness
- **WHEN** the section is rendered on mobile screens (< 640px)
- **THEN** the capability cards stack vertically in a single column with clear spacing
- **AND** on tablet/desktop screens (>= 640px), the capability cards organize into a balanced 2x2 grid
