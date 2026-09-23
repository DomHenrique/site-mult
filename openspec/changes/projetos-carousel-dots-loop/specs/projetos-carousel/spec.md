## ADDED Requirements

### Requirement: Horizontal Carousel Rendering
The system SHALL render project cards inside an interactive horizontal carousel viewport with smooth sliding transitions between cases.

#### Scenario: Multiple projects loaded from API
- **WHEN** more than one project is returned by the API or fallback data
- **THEN** the system renders a carousel container containing each project card inside dedicated slide elements
- **THEN** only the current active slide is presented in full focus while transitions animate smoothly

### Requirement: Bottom Controls and Dots Placement
The system SHALL position the carousel navigation controls (previous/next action buttons and indicator dots) directly below the project card container.

#### Scenario: Controls layout inspection
- **WHEN** the projects section is rendered on any viewport size
- **THEN** the navigation controls are centered beneath the project card
- **THEN** the controls do not overlap or occlude the project content, text pillars, or organic image silhouette

### Requirement: Interactive Indicator Dots
The system SHALL display an indicator dot for each project slide, providing visual feedback of the active slide and direct navigation upon user click.

#### Scenario: Active slide indication
- **WHEN** slide `i` is active
- **THEN** the corresponding dot receives the active visual state, smoothly expanding into an elongated pill with active brand styling
- **THEN** other dots remain in a subtle, semi-translucent circular state

#### Scenario: User clicks an indicator dot
- **WHEN** the user clicks on dot `k`
- **THEN** the carousel transitions immediately to slide `k`
- **THEN** the active dot updates to `k` and autoplay timer resets

### Requirement: Smooth Infinite Loop Navigation
The system SHALL support continuous circular navigation (infinite loop) without boundary stops or jarring rewinds.

#### Scenario: Advancing past the last slide
- **WHEN** the user or autoplay triggers next slide while at the last project
- **THEN** the carousel smoothly advances to the first project in a seamless forward loop

#### Scenario: Reversing before the first slide
- **WHEN** the user clicks previous slide while at the first project
- **THEN** the carousel transitions directly to the last project

### Requirement: Autoplay with Contextual Pause
The system SHALL automatically advance slides at a calibrated tempo (7 to 8 seconds) and pause whenever the user interacts with the section.

#### Scenario: Hover pause
- **WHEN** the user moves the mouse cursor over the carousel container or controls
- **THEN** autoplay is paused until the cursor leaves the area

#### Scenario: Touch interaction pause
- **WHEN** a touch event starts on mobile or tablet
- **THEN** autoplay pauses to avoid sudden changes during reading or gesture input

### Requirement: Touch Swipe Navigation
The system SHALL recognize horizontal swipe gestures on touch-enabled devices to advance or rewind slides.

#### Scenario: Swipe left on mobile
- **WHEN** the user swipes left with a displacement exceeding 45 pixels
- **THEN** the carousel navigates to the next slide

#### Scenario: Swipe right on mobile
- **WHEN** the user swipes right with a displacement exceeding 45 pixels
- **THEN** the carousel navigates to the previous slide

### Requirement: Single Project Graceful Handling
The system SHALL detect when only one project card exists and cleanly suppress carousel mechanics.

#### Scenario: Only one project available
- **WHEN** the dataset contains exactly 1 project
- **THEN** navigation buttons and indicator dots are hidden
- **THEN** autoplay is not initialized and the card is displayed statically
