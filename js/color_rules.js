// ************************************************************************************** //
// Color rules

var combinations = [];
function create_color_rules(){
  combinations = [];
  var temp_conditions, temp_color;
  var green = '#4eb33f', lightblue = '#4fc3f7', blue = '#37b4ec', darkblue = '#0e8ac1';

  temp_conditions = { conflict: false }
  temp_color = { rect_bg: { fill: 'white', opacity: 1 }, circle: { fill: 'white', opacity: 0 }, text: { fill: '#333' } };
  combinations.push({ conditions: temp_conditions, color: temp_color });

  /************************************************/

  temp_conditions = { fixed: true };
  temp_color = { circle: { fill: '#e8e8e8', opacity: 1 }, text: { fill: '#666' } };
  combinations.push({ conditions: temp_conditions, color: temp_color });

  /************************************************/

  if(settings.highlight == false){
    temp_conditions = { highlighted: true, fixed: true };
    temp_color = { rect_bg: { fill: 'white', opacity: 0.6 }, circle: { fill: blue, opacity: 1 }, text: { fill: '#333' } };
    combinations.push({ conditions: temp_conditions, color: temp_color });

    temp_conditions = { highlighted: true, fixed: false };
    temp_color = { rect_bg: { fill: 'white', opacity: 0.6 }, circle: { fill: darkblue, opacity: 1 }, text: { fill: 'white' } };
    combinations.push({ conditions: temp_conditions, color: temp_color });
  } else {
    temp_conditions = { highlighted: true, fixed: true };
    temp_color = { rect_bg: { fill: lightblue, opacity: 0.6 } };
    combinations.push({ conditions: temp_conditions, color: temp_color });

    temp_conditions = { highlighted: true, fixed: true, value: states.highlight_val };
    temp_color = { rect_bg: { fill: lightblue, opacity: 0.6 }, circle: { fill: blue, opacity: 1 }, text: { fill: '#333' } };
    combinations.push({ conditions: temp_conditions, color: temp_color });

    temp_conditions = { highlighted: true, fixed: false };
    temp_color = { rect_bg: { fill: lightblue, opacity: 0.6 } };
    combinations.push({ conditions: temp_conditions, color: temp_color });

    temp_conditions = { highlighted: true, fixed: false, value: states.highlight_val };
    temp_color = { rect_bg: { fill: lightblue, opacity: 0.6 }, circle: { fill: darkblue, opacity: 1 }, text: { fill: 'white' } };
    combinations.push({ conditions: temp_conditions, color: temp_color });
  }

  /************************************************/

  data.cells.forEach(d => { d.only_once = false; })

  if(settings.highlight){
    data.rows.forEach(row => {
      var temp_count = 0, temp_arr = [];
      row.forEach(cell => { if(cell.highlighted == false){ temp_count++; temp_arr.push(cell); } })
      if(temp_count == 1){ temp_arr[0].only_once = true; }
    })

    data.columns.forEach(column => {
      var temp_count = 0, temp_arr = [];
      column.forEach(cell => { if(cell.highlighted == false){ temp_count++; temp_arr.push(cell); } })
      if(temp_count == 1){ temp_arr[0].only_once = true; }
    })

    data.squares.forEach(square => {
      var temp_count = 0, temp_arr = [];
      square.forEach(cell => { if(cell.highlighted == false){ temp_count++; temp_arr.push(cell); } })
      if(temp_count == 1){ temp_arr[0].only_once = true; }
    })

    temp_conditions = { only_once: true };
    temp_color = { rect_bg: { fill: 'orange', opacity: 0.6 } };
    combinations.push({ conditions: temp_conditions, color: temp_color });
  }

  /************************************************/

  if(settings.choices == true){
    temp_conditions = { fixed: false, possible_values_len: 1, value: null };
    temp_color = { rect_bg: { fill: 'yellow', opacity: 0.6 } };
    combinations.push({ conditions: temp_conditions, color: temp_color });
  }

  /************************************************/

  temp_conditions = { conflict: true, fixed: false }
  temp_color = { rect_bg: { fill: 'red', opacity: 0.6 }, circle: { fill: 'white', opacity: 1 }, text: { fill: '#333' } };
  combinations.push({ conditions: temp_conditions, color: temp_color });

  temp_conditions = { conflict: true, fixed: true }
  temp_color = { rect_bg: { fill: 'red', opacity: 0.6 }, circle: { fill: '#e8e8e8e', opacity: 0.9 }, text: { fill: '#666' } };
  combinations.push({ conditions: temp_conditions, color: temp_color });

  /************************************************/

  temp_conditions = { selected: true };
  temp_color = { circle: { fill: green, opacity: 1 }, text: { fill: 'white' } };
  combinations.push({ conditions: temp_conditions, color: temp_color });

}
