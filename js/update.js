// ************************************************************************************** //
// Assign selected

function assign_selected_to_cells(){
  data.cells.forEach(d => { d.selected = false; })
  if(states.active_cell != null){
    data.cells.forEach(d => { if(states.active_cell.id == d.id){ d.selected = true; } })
  }
}

// ************************************************************************************** //
// Assign highlighted

function assign_highlighted_to_cells(){
  data.cells.forEach(d => { d.highlighted = false; })
  if(states.highlight_val != null && settings.highlight == true){
    data.cells.forEach(d => {
      if(d.value != null){ d.highlighted = true; }
      if(d.value == states.highlight_val){
        data.cells.forEach(d_ => { if(d_.row == d.row || d_.column == d.column || d_.square == d.square || d_.fixed == true){ d_.highlighted = true; } });
      }
    })
    return
  }

  if(states.highlight_val != null && settings.highlight == false){
    data.cells.forEach(d => { if(d.value == states.highlight_val){ d.highlighted = true; } })
  }
}

// ************************************************************************************** //
// Check possible values for each cell

function check_possible_values(){
  var temp_arr = [];
  data.cells.forEach(d => {
    temp_arr = []; d.possible_values = [];
    if(d.value == null){

      data.cells.forEach(d_ => {
        if(d_.row == d.row || d_.column == d.column || d_.square == d.square && d_.value != null){
          if( temp_arr.indexOf(d_.value) == -1 ){ temp_arr.push(d_.value); }
        }
      })

      d3.range(1,10).forEach(d_ => {
        if(temp_arr.indexOf(d_) == -1){ d.possible_values.push(d_); }
      })
      d.possible_values_len = d.possible_values.length;

    }
  })
}

// ************************************************************************************** //
// Check wrong entries

function check_wrong_entries(){
  data.cells.forEach(d => { d.conflict = false; })
  d3.range(10).forEach((d,i) => { data.rows[i] = []; data.columns[i] = []; data.squares[i] = []; })

  data.cells.forEach(d => {
    data.rows[ d.row ].push(d);
    data.columns[ d.column ].push(d);
    data.squares[ d.square ].push(d);
  })

  data.rows.forEach(arr => {
    var temp_arr = [], conflict_arr = [];
    arr.forEach(d => { if(d.value != null){ temp_arr.push(d.value); } })
    temp_arr.forEach(d => { if(temp_arr.indexOf(d) != temp_arr.lastIndexOf(d)){ conflict_arr.push(d); } })
    conflict_arr.forEach(val => { arr.forEach(d => { if(d.value == val){ d.conflict = true; } }) })
  })

  data.columns.forEach(arr => {
    var temp_arr = [], conflict_arr = [];
    arr.forEach(d => { if(d.value != null){ temp_arr.push(d.value); } })
    temp_arr.forEach(d => { if(temp_arr.indexOf(d) != temp_arr.lastIndexOf(d)){ conflict_arr.push(d); } })
    conflict_arr.forEach(val => { arr.forEach(d => { if(d.value == val){ d.conflict = true; } }) })
  })

  data.squares.forEach(arr => {
    var temp_arr = [], conflict_arr = [];
    arr.forEach(d => { if(d.value != null){ temp_arr.push(d.value); } })
    temp_arr.forEach(d => { if(temp_arr.indexOf(d) != temp_arr.lastIndexOf(d)){ conflict_arr.push(d); } })
    conflict_arr.forEach(val => { arr.forEach(d => { if(d.value == val){ d.conflict = true; } }) })
  })
}

// ************************************************************************************** //
// Update cells Possibilities

function update_cells_possibilities(){
  data.cells.forEach(d => { d.choices.forEach(d_ => { d_.text(null); }) });

  if(settings.choices == true){
    data.cells.forEach(d => {
      if(d.value == null){
        var temp_arr = d.possible_values;
        temp_arr.forEach((d_,i) => {
          d.choices[ 9-temp_arr.length+i ].text(d_);
        })
      }
    })
  }

  if(settings.guess == true){
    data.cells.forEach(d => {
      if(d.value == null){
        var temp_arr = d.guesses;
        temp_arr.forEach((d_,i) => {
          d.choices[ 9-temp_arr.length+i ].text(d_);
        })
      }
    })
  }

}

// ************************************************************************************** //
// Update cells

function update_Cells(){
  data.cells.forEach(d => {
    d.text.text(d.value);

    combinations.forEach(node => {
      var temp = true;
      for(d_ in node.conditions){ if(node.conditions[d_] != d[d_]){ temp = false; } }
      if(temp == true){ for(d_ in node.color){ d[d_].styles(node.color[d_]); } }
    })

  })
}
