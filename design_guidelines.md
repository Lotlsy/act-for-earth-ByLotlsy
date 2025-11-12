# Design Guidelines: Act for Earth — Climate Action (SDG 13)

## Design Approach
This is an educational, interactive website focused on Climate Action with a nature-inspired, engaging aesthetic. The design prioritizes clarity, user engagement through interactive elements, and environmental themes.

## Color Palette
- **Primary Green**: #2ecc71 (environmental action, growth)
- **Primary Blue**: #3498db (earth, water, sky)
- **Background White**: #f5f5f5 (clean, light)
- Use these colors consistently across all sections for buttons, highlights, and accents

## Typography
- **Primary Font**: Poppins or Roboto (clean, modern, highly readable)
- **Hierarchy**: 
  - Hero/Section Headers: Large, bold weights (600-700)
  - Subheadings: Medium weights (500-600)
  - Body text: Regular weight (400)
  - Maintain clear size differentiation between levels

## Layout System
- **Spacing**: Use Tailwind units of 4, 6, 8, 12, and 16 for consistent rhythm (p-4, p-6, p-8, p-12, p-16, etc.)
- **Container**: Max-width containers (max-w-6xl or max-w-7xl) for content sections
- **Sections**: Full-width sections with generous vertical padding (py-12 to py-20)

## Page Structure & Sections

### 1. Home Section
- **Hero Banner**: Full-width background image of Earth or nature scenes
- Short, compelling intro text about Climate Action with clear value proposition
- Navigation menu prominently displayed (sticky header recommended)
- Call-to-action that draws visitors deeper into content

### 2. Causes of Climate Change Section
- Grid layout for causes (2-column on desktop, single column on mobile)
- Each cause includes icon/image + explanatory text
- **Animation**: Fade-in effect as content enters viewport using CSS or JavaScript

### 3. Effects on Our Planet Section
- Display global impacts: rising temperatures, melting ice, extreme weather
- **Interactive Feature**: Before/after image slider implemented with JavaScript
- Visual storytelling with impactful imagery showing climate effects

### 4. Take Action / How You Can Help Section
- Clear, actionable steps presented as cards or list items
- **Interactive Checklist**: JavaScript-powered clickable checklist where users can check off actions (reduce waste, use clean energy, plant trees)
- Visual feedback when items are checked (color change, checkmark animation)

### 5. Feedback / Pledge Form Section
- Form fields: Name, Email, Message/Pledge
- Submit button with green background (#2ecc71)
- **JavaScript Interaction**: Display "Thank you" alert on form submission
- Clean, spacious form layout with proper input styling

## Component Library

### Navigation
- Sticky header with navigation links to all sections
- Smooth scroll to sections on click
- Active state highlighting for current section

### Buttons
- Primary buttons: Green (#2ecc71) background
- Secondary buttons: Blue (#3498db) background
- White text, rounded corners, padding for comfortable click area
- Buttons on hero images: blurred background overlay for readability

### Cards/Content Blocks
- White or light backgrounds (#f5f5f5)
- Subtle shadows for depth
- Rounded corners for modern feel
- Consistent padding inside cards

### Form Elements
- Input fields with borders, adequate padding
- Clear labels above each field
- Focus states with blue or green accent borders

## Images & Visual Assets

### Hero Section
- **Large Hero Image**: Earth from space, lush forests, or dramatic nature landscape
- Full-width, minimum 60vh height on desktop
- Overlay with semi-transparent gradient if text is placed on top

### Section Images
- **Causes Section**: Icons or small images representing deforestation, factories, greenhouse gases
- **Effects Section**: Before/after comparison images (glaciers, forests, weather patterns)
- **Take Action Section**: Positive imagery of renewable energy, tree planting, recycling

### Image Treatment
- High-quality, impactful photography
- Consistent styling across all images
- Proper aspect ratios maintained

## Animations & Interactions
- **Fade-in animations** for content in Causes section
- **Image slider/comparison** tool in Effects section
- **Interactive checklist** with visual state changes
- **Form submission** alert
- Keep animations subtle and purposeful, enhancing rather than distracting

## Responsive Design
- Mobile-first approach
- Single column layouts on mobile (<768px)
- 2-column grids on tablet/desktop where appropriate
- Readable text sizes across all devices (min 16px for body text)
- Touch-friendly button and interaction sizes on mobile

## Accessibility
- Sufficient color contrast ratios
- Clear focus states for keyboard navigation
- Semantic HTML structure
- Alt text for all meaningful images
- Form labels properly associated with inputs

This design creates an engaging, educational experience that balances information delivery with interactive elements, all while maintaining the environmental theme through color, imagery, and purposeful animations.