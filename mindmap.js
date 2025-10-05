
const researchData = [
  { category: "Human factors & behavior", summary: "Research aiming to design, test, and optimize how humans perform tasks in space (or analog environments), especially under autonomy constraints. Focus includes procedural aids, multimodal feedback, situational awareness, trust in systems, error reduction, task performance under delayed communication, etc." },
  { category: "Human Physiology & health", summary: "Studies of how human psychological, cognitive, and social dynamics respond to spaceflight, isolation, confinement, communication delay, monotony, team cohesion, mental health, etc., and development of countermeasures." },
  { category: "Space biology & microgravity", summary: "Studies on how microgravity and space environments affect biological systems, human physiology, genetic or cellular adaptations, bone and muscle loss, immune changes, radiation effects, etc." },
  { category: "life support & environment", summary: "Engineering and biological-ecological research on closed-loop life support, water and air recycling, waste processing, plant growth systems, filtration, and habitat environmental control." },
  { category: "Training & stimulation technologies", summary: "Investigations into how humans interact with automation, decision support systems, algorithmic aids, and how to allocate tasks between humans and machines, particularly under constraints (delays, limited bandwidth, error states, anomalies)." },
  { category: "Robotics & Interface", summary: "Design and evaluation of robotic systems, interfaces, toolkits, sensors, augmented reality interfaces, teleoperation, robotic assistance, and human–robot collaboration in space settings." }
];

// Mindmap Visualization Setup
const cy = cytoscape({
  container: document.getElementById('cy'),
  elements: [
    { data: { id: 'root', label: 'Past 6 Months Research Focus' } },
    ...researchData.map(item => ({
      data: { id: item.category, label: item.category, summary: item.summary }
    })),
    // edges connecting root to each category node
    ...researchData.map(item => ({
      data: { source: 'root', target: item.category }
    }))
  ],
  
  style: [
    {
      selector: 'node',
      style: {
        /* Background image of each bubble */
        'background-image': function (ele) {
          const label = ele.data('label').toLowerCase();

          if (label.includes('biology')) return 'url(https://cdn.esahubble.org/archives/images/thumb300y/heic1708a.jpg)';
          if (label.includes('robotics')) return 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/330px-FullMoon2010.jpg)';
          if (label.includes('training')) return 'url(https://upload.wikimedia.org/wikipedia/commons/b/b9/Neptune_Voyager2_color_calibrated.png)';
          if (label.includes('life support')) return 'url(https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/2023/09/p/i/a/0/PIA01492-1.jpg?w=2188&h=2185&fit=clip&crop=faces%2Cfocalpoint)';
          if (label.includes('Physiology')) return 'url(https://space-facts.com/wp-content/uploads/mars-v2.jpg)';
          if (label.includes('human factors')) return 'url(https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg)';
          return 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Venus_-_December_23_2016.png/250px-Venus_-_December_23_2016.png)';
        },
        'background-fit': 'cover',
        'background-position-x': '50%',
        'background-position-y': '50%',
        'label': 'data(label)',
        'color': '#fff',
        'text-valign': 'center',
        'text-halign': 'center',
        'font-size': '100px',
        'font-weight': 'bold',
        'width': 800,     //make the fram circular
        'height': 800,
        'padding': '30px',
        'shape': 'ellipse',
        'text-wrap': 'wrap',
        'text-max-width': 160,
        'border-width': 1,
        'border-color': '#b3d9ff',
        'shadow-blur': 20,
        'shadow-color': 'rgba(0,0,0,0.4)',
        'shadow-offset-x': 4,
        'shadow-offset-y': 6,
        'cursor': 'pointer',
        'transition-property': 'background-image, border-width, border-color',
        'transition-duration': '0.5s',
        'text-outline-color': '#000',
        'text-outline-width': 2,
        'text-outline-opacity': 1,
      }
    },

    /* The middle/center-Sun look */
    {
      selector: '#root',
      style: {
        'background-image': 'url(https://images.nationalgeographic.org/image/upload/v1638882786/EducationHub/photos/sun-blasts-a-m66-flare.jpg)',
        'background-fit': 'cover',
        'font-size': '100px',
        'font-weight': 'bold',
        'padding': '50px',
        'shape': 'ellipse',
        'color': '#fff',
        'border-width': 3,
        'border-color': '#99ccff',
        'text-wrap': 'wrap',
        'text-max-width': 180
      }
    },

    {
      selector: 'edge',
      //branch style
      style: {
        'width': 20, // how thick the branches are
        'line-color': 'white',
        'curve-style': 'bezier'
      }
    }
  ],

  layout: {
    name: 'concentric',
    concentric: node => node.id() === 'root' ? 2 : 1,
    levelWidth: () => 1,
    minNodeSpacing: 400 //how long the branches are
  }
});

// Hover effects
cy.on('mouseover', 'node', evt => {
  const node = evt.target;
  node.style('border-width', 4);
});
cy.on('mouseout', 'node', evt => {
  evt.target.style('border-width', 2);
});

// Apply floating animation
function floatNodes() {
  cy.nodes().forEach(node => {
    const pos = node.position();
    const offsetX = (Math.random() - 0.5) * 15;
    const offsetY = (Math.random() - 0.5) * 15;
    node.animate({
      position: { x: pos.x + offsetX, y: pos.y + offsetY },
      duration: 4000,
      easing: 'ease-in-out'
    });
  });
}
setInterval(floatNodes, 4000);


// Popup Functionality
cy.on('tap', 'node', function(evt){
  const node = evt.target;
  const category = node.data('label');
  const summary = node.data('summary');
  
  if (category !== 'Past 6 Months Research Focus' && summary) {
    document.getElementById('popup').classList.remove('hidden');
    document.getElementById('popup-title').innerText = category;
    document.getElementById('popup-summary').innerText = summary;
  }
});

document.getElementById('close').addEventListener('click', () => {
  document.getElementById('popup').classList.add('hidden');
});


// Close popup
document.getElementById('close').addEventListener('click', () => {
  document.getElementById('popup').classList.add('hidden');
});