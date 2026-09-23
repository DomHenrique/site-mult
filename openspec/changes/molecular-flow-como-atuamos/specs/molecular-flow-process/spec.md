## ADDED Requirements

### Requirement: Molecular Innovation Chain Visual Structure
The `#como-atuamos` section SHALL present the 5-step methodology as an interconnected molecular chain rather than isolated static boxes.

#### Scenario: Desktop molecular presentation
- **WHEN** the user views the `#como-atuamos` section on desktop screens
- **THEN** the system displays 5 interconnected atomic nodes with molecular bond lines linking each node sequentially
- **AND** the nodes alternate vertically to create a dynamic molecular geometry

### Requirement: Atomic Nodes with Valence Rings
Each of the 5 steps SHALL be represented by an atomic orb featuring a themed icon, step identifier (01-05), and an orbital valence ring.

#### Scenario: Atomic node visual details
- **WHEN** inspecting any of the 5 nodes
- **THEN** the node renders a spherical purple gradient with a centered icon and a step number badge
- **AND** a descriptive glassmorphism card displays the phase name and value deliverable below/around the node

### Requirement: Animated Flow / Electron Pulse
The molecular bond line SHALL include visual indication of forward flow and continuity between the stages.

#### Scenario: Continuous energy flow
- **WHEN** viewing the section in the browser
- **THEN** a glowing pulse/particle animation travels along the molecular bond lines from step 01 (Diagnóstico) to step 05 (Resultados)

### Requirement: Responsive Mobile Molecular Chain
The molecular chain SHALL adapt to mobile viewports as a vertical continuous flow without horizontal clipping.

#### Scenario: Mobile viewport rendering
- **WHEN** the section is rendered on mobile viewports (< 768px)
- **THEN** the nodes and cards stack vertically connected by a central vertical bond line
- **AND** all texts, icons, and step numbers remain clearly legible
