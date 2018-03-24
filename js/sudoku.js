// ************************************************************************************** //
// Select a sudoku

var temp_num_list = d3.range(sudoku_archive.length);
function select_sudoku(){
  var temp_num = math.randomInt(temp_num_list.length);
  assignSudoku( sudoku_archive[ temp_num_list[temp_num] ] );
  temp_num_list.splice(temp_num, 1);
  if(temp_num_list.length == 0){ temp_num_list = d3.range(sudoku_archive.length); }
  user_log = []; push_data();
}

// ************************************************************************************** //
// Assign sudoku

function assignSudoku(sudoku){
  for(var i = 0; i < 9; i++){
    for(var j = 0; j < 9; j++){
      var cell = data.cells[i*9 + j];
      cell.value = null; cell.fixed = false; cell.selected = false; cell.highlighted = false;
      if(sudoku[i][j] != 0){ cell.value = sudoku[i][j]; cell.fixed = true; cell.text.attrs({ class: 'fixed_font'}); }
      else{ cell.text.attrs({ class: 'unfixed_font'}); }
    }
  }
  update_Cells();
}

// ************************************************************************************** //
// Create a sudoku

// function createSudoku(){
//
//   sudoku_arr = [];
//   for(var i = 1; i <= 9; i++){
//     for(var j = 1; j <= 9; j++){
//       var temp_x_pos = parseInt((i-1)/3);
//       var temp_y_pos = parseInt((j-1)/3);
//       var temp_square_pos = temp_x_pos*3 + temp_y_pos;
//       var temp_id = (i-1)*9 + j;
//
//       var temp_object = { x: i, y: j, square: temp_square_pos, id: temp_id, value: 0 };
//       sudoku_arr.push(temp_object);
//     }
//   }
//
//   rows = d3.range(10).map(d => { return([]) });
//   columns = d3.range(10).map(d => { return([]) });
//   squares = d3.range(10).map(d => { return([]) });
//
//   var temp_val = null;
//   for(var i = 0; i < sudoku_arr.length; i++){
//     temp_val = math.randomInt(1,10);
//     sudoku_arr[i].value = assignValue(sudoku_arr[i], temp_val);
//   }
//
//   function assignValue(cell, value){
//     if( rows[cell.row].indexOf(value) == -1 && columns[cell.column].indexOf(value) == -1 && squares[cell.square].indexOf(value) == -1 ){
//       rows[cell.row].push(value); columns[cell.column].push(value); squares[cell.square].push(value);
//       return value
//     } else {
//       console.log(value);
//       value++; if(value == 10){ value = 1; }
//       return( assignValue(cell, value) );
//     }
//   }
//
//   assignSudoku(sudoku_arr);
// }
