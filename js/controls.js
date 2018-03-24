// ************************************************************************************** //
// Create Controls

function createControls(){
  controls.guess = { x: 0.2*canvas_size, y: 0, path: '../assets/question.svg', path_other: '../assets/question-white.svg', text: 'Guess' };
  controls.highlight = { x: 0.5*canvas_size, y: 0, path: '../assets/pencil.svg', path_other: '../assets/pencil-white.svg', text: 'Highlight' };
  controls.choices = { x: 0.8*canvas_size, y: 0, path: '../assets/choices-empty.png', path_other: '../assets/choices-filled.png', text: 'Possible Values' };

  controls.undo = { x: 0.25*canvas_size, y: 100, path: '../assets/undo-alt.svg', path_other: '../assets/undo-gray.svg', text: 'Undo' };
  controls.reset = { x: 0.5*canvas_size, y: 100, path: '../assets/reset-alt.svg', text: 'Reset' };
  controls.new = { x: 0.75*canvas_size, y: 100, path: '../assets/new-alt.svg', text: 'New' };

  var controls_g = d3.select('#canvas').append('g').attrs({ 'transform': 'translate(' +50+ ',' +(canvas_size+180)+ ')' });
  var temp_g, node;

  for(d in controls){
    node = controls[d];
    temp_g = controls_g.append('g').attrs({ 'transform': 'translate(' +node.x+ ',' +node.y+ ')' });
    node.circle_bg = temp_g.append('circle').attrs({ cx: 0, cy: 0, r: 0.8*icon_size }).styles({ 'fill': 'white', 'stroke': 'gray' });
    node.image = temp_g.append('image').attrs({ x: -0.5*icon_size, y: -0.5*icon_size, width: icon_size, height: icon_size, href: node.path });
    node.circle_fg = temp_g.append('circle').attrs({ cx: 0, cy: 0, r: 0.8*icon_size }).styles({ 'fill': 'white', 'stroke': 'gray', 'opacity': 0 });
    node.text = temp_g.append('text').attrs({ x: 0, y: 1.3*icon_size }).styles({ 'font-size': '1em', 'fill': 'gray' }).text(node.text);
  }
}

// ************************************************************************************** //
// Create controls events

function create_events_controls(){

  controls.guess.circle_fg.on('click', function(){
    settings.guess = !settings.guess;
    settings.choices = false;
    update();
  })

  controls.highlight.circle_fg.on('click', function(){
    settings.highlight = !settings.highlight;
    update();
  })

  controls.choices.circle_fg.on('click', function(){
    settings.choices = !settings.choices;
    settings.guess = false;
    update();
  })

  controls.undo.circle_fg.on('click', function(){ pop_data(); })
  controls.reset.circle_fg.on('click', function(){ reset(); })
  controls.new.circle_fg.on('click', function(){ select_sudoku(); update(); })

}

// ************************************************************************************** //
// Update Controls

function update_controls(){

  if(settings.guess == true){
    controls.guess.circle_bg.styles({ 'fill': '#222', 'stroke': '#222', 'stroke-width': 2 });
    controls.guess.image.attrs({ href: controls.guess.path_other });
  } else {
    controls.guess.circle_bg.styles({ 'fill': 'white', 'stroke': '#222', 'stroke-width': 2 });
    controls.guess.image.attrs({ href: controls.guess.path });
  }

  if(settings.highlight == true){
    controls.highlight.circle_bg.styles({ 'fill': '#222', 'stroke': '#222', 'stroke-width': 2 });
    controls.highlight.image.attrs({ href: controls.highlight.path_other });
  } else {
    controls.highlight.circle_bg.styles({ 'fill': 'white', 'stroke': '#222', 'stroke-width': 2 });
    controls.highlight.image.attrs({ href: controls.highlight.path });
  }

  if(settings.choices == true){
    controls.choices.circle_bg.styles({ 'fill': '#BBB', 'stroke': '#222', 'stroke-width': 2 });
    controls.choices.image.attrs({ href: controls.choices.path_other });
  } else {
    controls.choices.circle_bg.styles({ 'fill': 'white', 'stroke': '#222', 'stroke-width': 2 });
    controls.choices.image.attrs({ href: controls.choices.path });
  }

  if(user_log.length > 1){
    controls.undo.circle_bg.styles({ 'fill': 'white', 'stroke': '#222', 'stroke-width': 2 });
    controls.undo.image.attrs({ href: controls.undo.path });
  } else{
    controls.undo.circle_bg.styles({ 'fill': 'white', 'stroke': 'gray', 'stroke-width': 2 });
    controls.undo.image.attrs({ href: controls.undo.path_other });
  }

}
