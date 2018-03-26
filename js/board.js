// ************************************************************************************** //
// Preparing the board

var box_size;
function createBoard(){
  box_size = canvas_size/num_cells;
  d3.select('#sudoku_g').remove();
  var sudoku_g = d3.select('#canvas').append('g').attrs({ id: 'sudoku_g', transform: 'translate(' +50+ ',' +10+ ')' });

  // Creating cells
  for(var i = 0; i < num_cells; i++){
    for(var j = 0; j < num_cells; j++){
      var temp_index = i*num_cells + j;

      var temp_g = sudoku_g.append('g').attrs({ 'transform': 'translate(' +(j*box_size)+ ',' +(i*box_size)+ ')' })

      var temp_ = temp_g.append('rect').attrs({ x: 0, y: 0, width: box_size, height: box_size });
      data.cells[temp_index].rect_bg = temp_;

      var temp_ = temp_g.append('circle').attrs({ cx: (0.5)*box_size, cy: (0.5)*box_size, r: 0.48*box_size });
      data.cells[temp_index].circle = temp_;

      var temp_ = temp_g.append('text').attrs({ x: (0.5)*box_size, y: (0.5)*box_size });
      data.cells[temp_index].text = temp_;

      var temp_x = ((1/(2*sqrt_num_cells)))*box_size;
      var temp_y = ((1/(2*sqrt_num_cells)))*box_size;
      var choices_g = temp_g.append('g').attrs({ 'transform': 'translate(' +temp_x+ ',' +temp_y+ ')' })
      var temp_arr = [];

      for(var z = 0; z < num_cells; z++){
        var temp_x = (z%sqrt_num_cells)*(box_size/sqrt_num_cells);
        var temp_y = parseInt(z/sqrt_num_cells)*(box_size/sqrt_num_cells);
        temp_arr[z] = choices_g.append('text').attrs({ x: temp_x, y: temp_y }).styles({ 'font-size': '0.8em', 'fill': 'gray' });
      }
      data.cells[temp_index].choices = temp_arr;

      var temp_ = temp_g.append('rect').attrs({ x: 0, y: 0, width: box_size, height: box_size, class: 'boxes_fg' }).styles({ 'opacity': 0 });
      data.cells[temp_index].rect_fg = temp_;
    }
  }

  // Data binding
  d3.selectAll('.boxes_fg').data(data.cells);

  // Creating normal lines
  for(var i = 0; i <= num_cells; i += 1){
    sudoku_g.append('line').attrs({ x1: 0, x2: canvas_size, y1: i*box_size, y2: i*box_size, class: 'thin_line' });
    sudoku_g.append('line').attrs({ y1: 0, y2: canvas_size, x1: i*box_size, x2: i*box_size, class: 'thin_line' });
  }

  // Creating bold lines
  for(var i = 0; i <= num_cells; i += sqrt_num_cells){
    sudoku_g.append('line').attrs({ x1: 0, x2: canvas_size, y1: i*box_size, y2: i*box_size, class: 'thick_line' });
    sudoku_g.append('line').attrs({ y1: 0, y2: canvas_size, x1: i*box_size, x2: i*box_size, class: 'thick_line' });
  }

}

// ************************************************************************************** //
// Creating events for cells

function create_events_board(){
  d3.selectAll('.boxes_fg').on('click', function(d){
    if(d.value == null){ click_on_empty_cell(d); return }
    if(d.fixed == true){ click_on_fixed_cell(d); return }
    if(d.value != null && d.fixed == false){ click_on_filled_cell(d); return }
  })
}

// ************************************************************************************** //
// Click Event on an empty cell

function click_on_empty_cell(d){
  if(d.selected == true){ states.active_cell = null; }
  else{ states.active_cell = d; }
  update();
}

// ************************************************************************************** //
// Click Event on a fixed cell

function click_on_fixed_cell(d){
  states.active_cell = null;
  update();
}

// ************************************************************************************** //
// Click Event on a filled cell

function click_on_filled_cell(d){
  if(d.selected == true){ states.active_cell = null; }
  else{ states.active_cell = d; }
  update();
}
