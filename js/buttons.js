// ************************************************************************************** //
// Create Buttons

var icon_size = 30;
function createButtons(){
  var temp_l = canvas_size/6;
  var buttons_g = d3.select('#canvas').append('g').attrs({ 'transform': 'translate(' +50+ ',' +(canvas_size+20)+ ')' });

  // Value buttons
  for(var i = 1; i <= 10; i++){
    var temp_y = i <= 5 ? 30 : 90;
    var temp_x = i <= 5 ? i : i-5;

    var temp_g = buttons_g.append('g').attrs({ 'transform': 'translate(' +(temp_x*temp_l)+ ',' +temp_y+ ')' });
    var circle_bg = temp_g.append('circle').attrs({ cx: 0, cy: 0, r: 25 }).styles({ fill: '#EEE', stroke: 'gray' });
    var text = temp_g.append('text').attrs({ x: 0, y: -5, class: 'text' }).styles({ 'font-size': '1.2em' }).text(i);
    var text_small = temp_g.append('text').attrs({ x: 0, y: 12 }).styles({ 'font-size': '0.8em', 'fill': 'gray' }).text(i);
    var circle_fg = temp_g.append('circle').attrs({ cx: 0, cy: 0, r: 25, class: 'circle_fg' }).styles({ 'fill': 'white', 'opacity': 0 });

    var temp_data = { value: i, circle_bg: circle_bg, text: text, text_small: text_small, circle_fg: circle_fg };
    circle_fg.data([ temp_data ]);
    buttons.push(temp_data);
  }

  var lastNode = buttons[ buttons.length-1 ];
  lastNode.value = null; lastNode.text.attrs({ y: 0 }).text('X');
}


// ************************************************************************************** //
// Update Buttons

function updateButtons(){
  var temp_count = d3.range(9).map(d => { return 0 });
  data.cells.forEach(d => { if(d.value != null){ temp_count[d.value-1]++; } })
  temp_count.forEach((d,i) => { buttons[i].text_small.text(9-d); });
  buttons[9].text_small.text(null);

  buttons.forEach(d => {
    if(d.value == states.highlight_val){ d.circle_bg.styles({ 'fill': '#DDD', 'fill-opacity': 1, 'stroke': '#555', 'stroke-width': 2 }) }
    else{ d.circle_bg.styles({ 'fill': '#EEE', 'fill-opacity': 1, 'stroke': 'gray', 'stroke-width': 1 }) };
  })

  if(settings.highlight){
  buttons.forEach(button => {
    button.highlight = false;
    // button.circle_bg.styles({ 'fill': '#EEE', 'stroke': 'gray', 'stroke-width': 1 });

    data.rows.forEach(row => {
      var temp_count = 0, temp_arr = [];
      row.forEach(cell => { if(cell.possible_values.indexOf(button.value) != -1){ temp_count++; } })
      if(temp_count == 1){ button.highlight = true; }
    })

    data.columns.forEach(column => {
      var temp_count = 0, temp_arr = [];
      column.forEach(cell => { if(cell.possible_values.indexOf(button.value) != -1){ temp_count++; } })
      if(temp_count == 1){ button.highlight = true; }
    })

    data.squares.forEach(square => {
      var temp_count = 0, temp_arr = [];
      square.forEach(cell => { if(cell.possible_values.indexOf(button.value) != -1){ temp_count++; } })
      if(temp_count == 1){ button.highlight = true; }
    })

    if(button.highlight == true && button.value != states.highlight_val){ button.circle_bg.styles({ 'fill': 'orange', 'fill-opacity': 0.6, 'stroke': 'gray', 'stroke-width': 1 }); }
    if(button.highlight == true && button.value == states.highlight_val){ button.circle_bg.styles({ 'fill': 'orange', 'fill-opacity': 0.6, 'stroke': 'black', 'stroke-width': 2 }); }
  })
  }

  buttons[9].circle_bg.styles({ 'fill': '#EEE', 'fill-opacity': 1, 'stroke': 'gray', 'stroke-width': 1 });
}

// ************************************************************************************** //
// Create Events Buttons

function create_events_buttons(){

  buttons.forEach(d => {
    d.circle_fg.on('click', function(d){
      if(states.active_cell != null && settings.guess == false){
        states.active_cell.value = d.value == 'X' ? null : d.value;
        states.active_cell = null;
        push_data();
        update();
        return
      }

      if(states.active_cell != null && settings.guess == true){
        if(states.active_cell.guesses.indexOf(d.value) == -1){ states.active_cell.guesses.push(d.value); }
        else{ states.active_cell.guesses.splice(states.active_cell.guesses.indexOf(d.value), 1); }
        if(d.value == 'X'){ states.active_cell.guesses = []; }
        states.active_cell = null;
        update();
        return
      }

      if(states.active_cell == null){
        if(states.highlight_val == null){ states.highlight_val = d.value; }
        else{
          if(states.highlight_val == d.value){ states.highlight_val = null; } else{ states.highlight_val = d.value; }
        }
        update();
      }
    })
  })

  // Key Press events
  d3.select('body').on('keypress', function(){

    if(d3.event.charCode == 26 && d3.event.ctrlKey == true){ pop_data(); }

    if(states.active_cell != null && settings.guess == false){
      if(d3.event.charCode == 48){
        states.active_cell.value = null; states.active_cell = null;
        push_data(); update();
      }
      if(d3.event.charCode >= 49 && d3.event.charCode <= 57){
        states.active_cell.value = parseInt(d3.event.key); states.active_cell = null;
        push_data(); update();
      }
    }

    if(states.active_cell != null && settings.guess == true){
      if(d3.event.charCode == 48){ states.active_cell.guesses = []; }
      if(d3.event.charCode >= 49 && d3.event.charCode <= 57){
        if(states.active_cell.guesses.indexOf(d3.event.key) == -1){ states.active_cell.guesses.push(d3.event.key); }
        else{ states.active_cell.guesses.splice(states.active_cell.guesses.indexOf(d3.event.key), 1); }
      }
      states.active_cell = null;
      update();
      return
    }

  })

}
